import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootSiblingParent } from 'react-native-root-siblings'
import { LoginPage } from './pages/login/LoginPage'
import { TabBar } from './pages/TabBar'
const Stack = createNativeStackNavigator()
export default function App() {
    return (
        <RootSiblingParent>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='LoginPage'>
                    <Stack.Screen
                        name='Login'
                        component={LoginPage}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='TabBar'
                        component={TabBar}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </RootSiblingParent>
    )
}
