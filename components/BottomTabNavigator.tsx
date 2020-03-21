import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Alerts from './Alerts';
import TabBarIcon from './common/TabBarIcon';
import Profile from './profile/Profile';
import Records from './records/Records';

const INITIAL_ROUTE_NAME = 'Records';
const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation, route }) => {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <Navigator
      tabBarOptions={{
        showLabel: false
      }}
    >
      <Screen
        name="Records"
        component={Records}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-folder" />
          )
        }}
      />
      <Screen
        name="Alerts"
        component={Alerts}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-alert" />
          )
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-person" />
          )
        }}
      />
    </Navigator>
  );
};

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Records':
      return 'My Records';
    case 'Alerts':
      return 'Alerts';
    case 'Profile':
      return 'Profile';
  }
}

export default BottomTabNavigator;
