import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootSiblingParent } from 'react-native-root-siblings'
import { Intro } from './pages/login/Intro'
import { TabBar } from './pages/TabBar'
import { LoginPage } from './pages/login/Login'
import { Register } from './pages/login/Register'
import { Image } from 'react-native'
import logo from './assets/logo.jpg'

const Stack = createNativeStackNavigator()
export default function App() {
    return (
        <RootSiblingParent>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='Intro'
                    screenOptions={{
                        headerTitle: _props => (
                            <Image
                                source={logo}
                                style={{ width: 40, height: 40 }}
                            />
                        ),
                        headerBackTitle: '取消'
                    }}
                >
                    <Stack.Screen
                        name='Intro'
                        component={Intro}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Login'
                        component={LoginPage}
                    />
                    <Stack.Screen
                        name='TabBar'
                        component={TabBar}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Register'
                        component={Register}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </RootSiblingParent>
    )
}
