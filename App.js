import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//pages
import Login from './Screens/LoginScreen'
import Start from './Screens/GettingStartedScreen'
import Signup from './Screens/SignupScreen'
import SentEmail from './Screens/sentEmail'
import Dashboard from './Screens/Dashboard'
import TimeSetter from './Screens/timeSetter'
import ProfileUser from './Screens/ProfileUser'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="SentEmail" component={SentEmail} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="TimeSetter" component={TimeSetter} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileUser" component={ProfileUser} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
