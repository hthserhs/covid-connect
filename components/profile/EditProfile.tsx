import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import { editProfile, getProfile } from '../../api/user';
import {
  CoMorbiditiesItemName,
  CovidRiskFactorItemName,
  COVID_RISK_FACTOR_TAG_ITEMS,
  CO_MORBIDITIES_TAG_ITEMS
} from '../../constants/app';
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
import Personal from './Personal';
import ProfileSection from './ProfileSection';
import { PersonalFormValues } from './types';

const EditProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>(null);
  const [alert, setAlert] = useState(null);
  const dispatch = useContext(AppDispatch);

  const [personalValues, setPersonalValues] = useState(
    new PersonalFormValues()
  );

  const disabled = false;

  useEffect(() => {
    if (userProfile) {
      setPersonalValues({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        gender: userProfile.gender || '',
        dob: userProfile.dob > 0 ? new Date(userProfile.dob) : null,
        pincode: userProfile.pincode > 0 ? String(userProfile.pincode) : ''
      });

      setCoMorbidities(userProfile.coMorbidities || []);
      setCovidRiskFactors(userProfile.covidRiskFactors || []);
    }
  }, [userProfile]);

  useEffect(() => {
    Promise.all([readItem(AUTH_TOKEN), readItem(USER_ID)]).then(
      ([authToken, userId]) => {
        getProfile(authToken, userId).then(setUserProfile);
      }
    );
  }, []);

  const onSubmit = () => {
    const profile = {
      ...userProfile,
      firstName: personalValues.firstName,
      lastName: personalValues.lastName,
      gender: personalValues.gender,
      dob: personalValues.dob.getTime(),
      pincode: +personalValues.pincode,
      coMorbidities,
      covidHistory: covidRiskFactors
    };

    readItem(AUTH_TOKEN).then(authToken => {
      editProfile(authToken, profile)
        .then(async () => {
          await Promise.all([saveItem(IS_USER_PROFILE_COMPLETED, true)]);
          setUserProfile(profile);
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

  const [covidRiskFactors, setCovidRiskFactors] = useState<
    CovidRiskFactorItemName[]
  >([]);

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

  const [coMorbidities, setCoMorbidities] = useState<CoMorbiditiesItemName[]>(
    []
  );

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
          <MaterialCommunityIcons name="account" size={72} color="#979797" />
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
          <View style={styles.buttonContainer}>
            <Button
              text={text('save_profile')}
              onPress={onSubmit}
              disabled={disabled}
            />
          </View>
          <TouchableHighlight
            style={{ alignItems: 'center', marginTop: 24, marginBottom: 24 }}
            onPress={onLogout}
          >
            <Text
              style={{
                color: '#00AEEF'
              }}
            >
              Logout
            </Text>
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
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#fff'
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
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 6
  },
  label: {
    color: '#979797'
  },
  buttonContainer: {
    marginTop: 36
  },
  date: { fontSize: 18 }
});
