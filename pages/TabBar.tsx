import { Ionicons } from '@expo/vector-icons'
import {
    BottomTabNavigationOptions,
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { Image, StyleSheet } from 'react-native'
import logo from '../assets/logo.jpg'
import { colors } from '../styles/colors'
import { HomePage } from './home/HomePage'
import { MailPage } from './mail/MailPage'
import { NotificationPage } from './notifications/NotificationsPage'
import { SearchPage } from './search/SearchPage'
const Tab = createBottomTabNavigator()
export const TabBar = () => {
    const screenOptions: BottomTabNavigationOptions = {
        tabBarShowLabel: false,
        headerStyle: { height: 100 },
        tabBarActiveTintColor: colors.tabBar.active,
        tabBarInactiveTintColor: colors.tabBar.inActive,
        headerTitle: _props => (
            <Image
                source={logo}
                style={styles.logo}
            />
        ),
        headerLeft: _props => (
            <Image
                source={{
                    uri: 'https://portrait.gitee.com/uploads/avatars/user/1775/5326174_monochrome1998_1636865249.png!avatar60'
                }}
                style={styles.avatar}
            />
        ),
        headerRight: _props => (
            <Ionicons
                name='planet-outline'
                size={30}
                color='black'
                style={{ marginRight: 10 }}
            />
        )
    }
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={screenOptions}
        >
            <Tab.Screen
                name='Home'
                component={HomePage}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='Search'
                component={SearchPage}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'search' : 'search-outline'}
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='Notifications'
                component={NotificationPage}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={
                                focused
                                    ? 'notifications-sharp'
                                    : 'notifications-outline'
                            }
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='Mail'
                component={MailPage}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={
                                focused ? 'ios-mail-sharp' : 'ios-mail-outline'
                            }
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 40,
        height: 40
    },
    avatar: {
        width: 40,
        height: 40,
        marginLeft: 10,
        borderRadius: 1000,
        resizeMode: 'cover'
    }
})
