import { useNavigation } from '@react-navigation/core';
import nanoid from 'nanoid/non-secure';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';
import { APISymptom } from '../../api/types';
import { addUserHealthRecord } from '../../api/user';
import { C12, C13, C6, C8, C9 } from '../../constants/colors';
import { AUTH_TOKEN, USER_ID } from '../../storage/keys';
import { readItem } from '../../storage/storage';
import Button from '../common/Button';
import DateTime from '../common/DateTime';
import WrappedText from '../common/WrappedText';
import { addHealthRecord } from './state/actions';
import { RecordsDispatch, RecordsState } from './state/context';
import { HealthRecord, SeverityLevel } from './state/types';
import Symptom from './Symptom';

const AddHealthRecord = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [levels, setLevels] = useState<SeverityLevel[]>([]);
  const [alert, setAlert] = useState(null);
  const dispatch = useContext(RecordsDispatch);
  const { symptoms } = useContext(RecordsState);
  const [isSeverityDisabled, setSeverityDisabled] = useState(false);
  const [customBtnStyle, setCustomBtnStyle] = useState<ViewStyle>({
    borderRadius: 10,
    width: 200,
    backgroundColor: C13,
    margin: 25
  });
  const onChangeSeverityLevel = (index: number, level: SeverityLevel) => {
    setLevels([...levels.slice(0, index), level, ...levels.slice(index + 1)]);
  };

  const noSymptomsClicked = () => {
    if(!isSeverityDisabled){
      customBtnStyle['backgroundColor'] = C12;
      setLevels(symptoms.map((v: APISymptom, index)=>{ 
        if(index == levels.length-1) return SeverityLevel.No 
        else return SeverityLevel.Unspecified 
      }));
      setSeverityDisabled(true);

    } else{
      customBtnStyle['backgroundColor'] = C13;
      setSeverityDisabled(false);
      setLevels(levels.map(_ => SeverityLevel.Unspecified));
    }
  };

  const renderNoSymptoms = (symptoms: APISymptom[]) => {
    let noSymptoms = symptoms.find(e => e.name=="no-symptoms");
    if(noSymptoms !== undefined && noSymptoms !== null){      
      return <Button key={noSymptoms.name} text={noSymptoms.displayName} onPress={noSymptomsClicked} customBtnStyle={customBtnStyle}/>
    }
  }

  const onAddRecord = async () => {
    if (!isSeverityDisabled && levels.every(l => l === SeverityLevel.Unspecified)) {
      setAlert('Select at least one symptom!');
      return;
    }

    const recSymptoms = levels.map((level, i) => ({
      name: symptoms[i].name,
      level
    }));
    
    const recordDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    );

    const record: HealthRecord = {
      id: nanoid(),
      date: recordDate.getTime(),
      symptoms: recSymptoms,
      type: 'health'
    };

    Promise.all([readItem(AUTH_TOKEN), readItem(USER_ID)])
      .then(([authToken, userId]) => {
        return addUserHealthRecord(authToken, userId, record);
      })
      .then(() => {
        dispatch(addHealthRecord(record));

        setLevels(symptoms.map(_ => SeverityLevel.Unspecified));
        navigation.navigate('RecordList');
      });
  };
  useEffect(() => {
    
    setLevels(symptoms.map(_ => SeverityLevel.Unspecified));
  }, []);
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ padding: 12, alignItems: 'center' }}>
              <WrappedText>Date</WrappedText>
              <DateTime value={date} onChange={setDate} />
            </View>
            <View style={{ padding: 12, alignItems: 'center' }}>
              <WrappedText>Time</WrappedText>
              <DateTime value={time} onChange={setTime} mode="time" />
            </View>
          </View>
          
          {symptoms.map((symptom, index) => {
            if(symptom.name !== "no-symptoms"){
              return (
                <View
                  key={symptom.name}
                  style={{ marginBottom: index === symptoms.length - 1 ? 24 : 0 }}
                >
                  <Symptom
                    name={symptom.displayName}
                    level={levels[index]}
                    onChangeSeverityLevel={level =>
                      onChangeSeverityLevel(index, level)
                    }
                    isSeverityDisabled={isSeverityDisabled}
                  />
                </View>
              );
            }
            
          })}
          {renderNoSymptoms(symptoms)}              
          
        </View>
      </ScrollView>
      {/* <FlatList
        data={symptoms}
        renderItem={({ item, index }) => (

        )}
        keyExtractor={(_, index) => String(index)}
      /> */}
      <Snackbar
        visible={alert}
        onDismiss={() => setAlert(null)}
        duration={3000}
      >
        {alert}
      </Snackbar>
      <Button text="Add" onPress={onAddRecord} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C6
  },
  field: {
    marginHorizontal: 24
  },
  label: {
    color: C9
  },
  input: {
    fontSize: 18,
    borderBottomColor: C8,
    borderBottomWidth: 1,
    paddingBottom: 6
  },
  date: { fontSize: 18 }
});

export default AddHealthRecord;
