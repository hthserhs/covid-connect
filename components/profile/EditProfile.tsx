import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { FC, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { editProfile } from '../../api/user';
import {
  CoMorbiditiesItemName,
  CovidRiskFactorItemName,
  COVID_RISK_FACTOR_TAG_ITEMS,
  CO_MORBIDITIES_TAG_ITEMS
} from '../../constants/app';
import { C1, C6, C8, C9 } from '../../constants/colors';
import {
  AUTH_TOKEN,
  IS_USER_PROFILE_COMPLETED,
  USER_ID
} from '../../storage/keys';
import { readItem, removeItems, saveItem } from '../../storage/storage';
import { updateAuthToken } from '../../store/actions';
import { AppDispatch } from '../../store/context';
import { UserProfile } from '../../store/types';
import { text } from '../../util/translation';
import Button from '../common/Button';
import Tags from '../common/Tags';
import WrappedText from '../common/WrappedText';
import Personal from './Personal';
import ProfileSection from './ProfileSection';
import Quarantine from './Quarantine';
import { PersonalFormState, QuarantineFormState } from './types';

interface Props {
  userProfile: UserProfile;
}

const EditProfile: FC<Props> = ({ userProfile }) => {
  const [alert, setAlert] = useState(null);
  const dispatch = useContext(AppDispatch);
  const [personalValues, setPersonalValues] = useState(new PersonalFormState());
  const [covidRiskFactors, setCovidRiskFactors] = useState<
    CovidRiskFactorItemName[]
  >([]);
  const [coMorbidities, setCoMorbidities] = useState<CoMorbiditiesItemName[]>(
    []
  );
  const [quarantineValues, setQuarantineValues] = useState(
    new QuarantineFormState()
  );

  const disabled = false;

  useEffect(() => {
    if (userProfile) {
      const {
        firstName,
        lastName,
        gender,
        dob,
        pincode,
        coMorbidities,
        covidRiskFactors,
        quarantineType,
        quarantineStartDate,
        quarantineEndDate
      } = userProfile;

      setPersonalValues({
        firstName: firstName || '',
        lastName: lastName || '',
        gender: gender || '',
        dob: dob > 0 ? new Date(dob) : null,
        pincode: pincode > 0 ? String(pincode) : ''
      });

      setCovidRiskFactors(covidRiskFactors || []);

      setCoMorbidities(coMorbidities || []);

      setQuarantineValues({
        home: quarantineType === 'HOME',
        completed: quarantineEndDate > 0,
        start: quarantineStartDate > 0 ? new Date(quarantineStartDate) : null,
        end: quarantineEndDate > 0 ? new Date(quarantineEndDate) : null
      });
    }
  }, [userProfile]);

  const onSubmit = () => {
    const profile: UserProfile = {
      ...userProfile,
      firstName: personalValues.firstName,
      lastName: personalValues.lastName,
      gender: personalValues.gender,
      dob: personalValues.dob ? personalValues.dob.getTime() : 0,
      pincode: +personalValues.pincode,
      coMorbidities,
      covidRiskFactors,
      quarantineType: quarantineValues.home ? 'HOME' : 'HOSPITAL',
      quarantineStartDate: quarantineValues.start
        ? quarantineValues.start.getTime()
        : 0,
      quarantineEndDate: quarantineValues.end
        ? quarantineValues.end.getTime()
        : 0
    };

    readItem(AUTH_TOKEN).then(authToken => {
      editProfile(authToken, profile)
        .then(async () => {
          await Promise.all([saveItem(IS_USER_PROFILE_COMPLETED, true)]);
        })
        .then(() => {
          setAlert('Profile updated!');
        })
        .catch(() => {
          setAlert('Failed to save details!');
        });
    });
  };

  const onLogout = () => {
    removeItems([AUTH_TOKEN, IS_USER_PROFILE_COMPLETED, USER_ID]);
    dispatch(updateAuthToken(null));
  };

  const toggleHistoryItem = (name: CovidRiskFactorItemName) => {
    const index = covidRiskFactors.indexOf(name);
    if (index >= 0) {
      setCovidRiskFactors([
        ...covidRiskFactors.slice(0, index),
        ...covidRiskFactors.slice(index + 1)
      ]);
    } else {
      setCovidRiskFactors([...covidRiskFactors, name]);
    }
  };

  const toggleCoMorbitiesItem = (name: CoMorbiditiesItemName) => {
    const index = coMorbidities.indexOf(name);
    if (index >= 0) {
      setCoMorbidities([
        ...coMorbidities.slice(0, index),
        ...coMorbidities.slice(index + 1)
      ]);
    } else {
      setCoMorbidities([...coMorbidities, name]);
    }
  };

  return (
    <View style={styles.rootContainer}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <MaterialCommunityIcons name="account" size={72} color={C9} />
        </View>
        <View style={styles.container}>
          <ProfileSection title="Personal">
            <Personal
              values={personalValues}
              onChangeValues={setPersonalValues}
            />
          </ProfileSection>
          <ProfileSection title="COVID-19 Risk Factors">
            <Tags
              items={COVID_RISK_FACTOR_TAG_ITEMS}
              selected={covidRiskFactors}
              onToggle={toggleHistoryItem}
            />
          </ProfileSection>
          <ProfileSection title="Pre-existing Conditions">
            <Tags
              items={CO_MORBIDITIES_TAG_ITEMS}
              selected={coMorbidities}
              onToggle={toggleCoMorbitiesItem}
            />
          </ProfileSection>
          <ProfileSection title="Quarantine Status">
            <Quarantine
              state={quarantineValues}
              onChange={setQuarantineValues}
            />
          </ProfileSection>
          <TouchableHighlight
            style={{ alignItems: 'center', marginTop: 24, marginBottom: 24 }}
            onPress={onLogout}
          >
            <WrappedText
              style={{
                color: C1
              }}
            >
              Logout
            </WrappedText>
          </TouchableHighlight>
        </View>
        <Snackbar
          visible={alert !== null}
          onDismiss={() => setAlert(null)}
          duration={3000}
        >
          {alert}
        </Snackbar>
      </ScrollView>
      <Button
        text={text('save_profile')}
        onPress={onSubmit}
        disabled={disabled}
      />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: C6
  },
  imageContainer: {
    marginTop: 24,
    alignItems: 'center'
  },
  container: {
    paddingHorizontal: 24
  },
  field: {
    marginTop: 24
  },
  input: {
    fontSize: 18,
    borderBottomColor: C8,
    borderBottomWidth: 1,
    paddingBottom: 6
  },
  label: {
    color: C9
  },
  date: { fontSize: 18 }
});
