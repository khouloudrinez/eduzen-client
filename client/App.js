// App.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ScreenA from "./screens/ScreenA";
import ScreenB from "./screens/ScreenB";
import ScreenE from "./screens/ScreenE";
import Agenda from "./screens/Agenda";
import Add from "./screens/Add";
import ChatBot from "./screens/ChatBot";
import HeartScreen from "./screens/HeartScreen";
import PremiumScreen from "./screens/PremiumScreen";
import Detail from "./screens/AddFormu";
import CardDetails from './screens/CardDetails';
import MyProfile from "./screens/MyProfile";
import EditProfile from "./screens/EditProfile";
import { UserProvider } from './screens/UserContext'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ScreenA">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ScreenA"
            component={ScreenA}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ScreenB"
            component={ScreenB}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="ScreenE"
            component={ScreenE}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Agenda"
            component={Agenda}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Add"
            component={Add}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="ChatBot"
            component={ChatBot}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Bien-étre"
            component={HeartScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="PremiumScreen"
            component={PremiumScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Detail"
            component={Detail}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="CardDetails"
            component={CardDetails}
          />
          <Stack.Screen
            name="MyProfile"
            component={MyProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
