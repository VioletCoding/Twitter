import logo from '@Assets/logo.jpg'
import { Intro } from '@Pages/login/Intro'
import { LoginPage } from '@Pages/login/Login'
import { Register } from '@Pages/login/Register'
import { TabBar } from '@Pages/TabBar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { colors } from '@Styles/colors'
import { Image } from 'react-native'
import { RootSiblingParent } from 'react-native-root-siblings'
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
                        headerBackTitle: '取消',
                        headerTintColor: colors.black,
                        statusBarTranslucent: true
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
                        options={{ headerShadowVisible: false }}
                    />
                    <Stack.Screen
                        name='Register'
                        component={Register}
                        options={{ headerShadowVisible: false }}
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
