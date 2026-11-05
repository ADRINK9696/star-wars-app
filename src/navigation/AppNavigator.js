import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import PlanetsScreen from '../screens/PlanetsScreen';
import SpaceshipsScreen from '../screens/SpaceshipsScreen';
import FilmsScreen from '../screens/FilmsScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const headerOptions = {
  headerStyle: { backgroundColor: '#12171F' },
  headerTintColor: '#FFE81F',
  headerTitleStyle: { fontWeight: '700' },
};

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...headerOptions,
        tabBarStyle: {
          backgroundColor: '#12171F',
          borderTopColor: '#2A3340',
        },
        tabBarActiveTintColor: '#FFE81F',
        tabBarInactiveTintColor: '#8B95A7',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={iconFor(route.name)} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Planets" component={PlanetsScreen} />
      <Tab.Screen name="Spaceships" component={SpaceshipsScreen} />
      <Tab.Screen name="Films" component={FilmsScreen} />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        ...headerOptions,
        drawerStyle: {
          backgroundColor: '#12171F',
          width: 280,
        },
        drawerActiveTintColor: '#0B0E14',
        drawerActiveBackgroundColor: '#FFE81F',
        drawerInactiveTintColor: '#F5F7FA',
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -8,
        },
        drawerIcon: ({ color, size }) => (
          <Ionicons name={iconFor(route.name)} size={size} color={color} />
        ),
      })}
    >
      <Drawer.Screen name="Planets" component={PlanetsScreen} />
      <Drawer.Screen name="Spaceships" component={SpaceshipsScreen} />
      <Drawer.Screen name="Films" component={FilmsScreen} />
    </Drawer.Navigator>
  );
}

function iconFor(routeName) {
  switch (routeName) {
    case 'Planets':
      return 'planet';
    case 'Spaceships':
      return 'rocket';
    case 'Films':
      return 'film';
    default:
      return 'ellipse';
  }
}

export default function AppNavigator() {
  if (Platform.OS === 'android') {
    return <DrawerNavigator />;
  }

  return <TabNavigator />;
}
