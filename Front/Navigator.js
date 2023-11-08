import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import FormPerfil from './screens/FormPerfil'
import Perfil from './screens/Perfil'

const Stack = createNativeStackNavigator()

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
        <Stack.Screen options={{ headerShown: false }} name="FormPerfil" component={FormPerfil} />
        <Stack.Screen options={{ headerShown: false }} name="Perfil" component={Perfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}