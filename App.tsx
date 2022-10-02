import { Ionicons } from '@expo/vector-icons'
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Image, StyleSheet } from 'react-native'
import logo from './assets/logo.jpg'
import { HomePage } from './pages/home/HomePage'
import { MailPage } from './pages/mail/MailPage'
import { NotificationPage } from './pages/notifications/NotificationsPage'
import { SearchPage } from './pages/search/SearchPage'
import { colors } from './styles/colors'
const Tab = createBottomTabNavigator()
export default function App() {

  const screenOptions: BottomTabNavigationOptions = {
    tabBarShowLabel: false,
    headerStyle: { height: 100 },
    tabBarActiveTintColor: colors.tabBar.active,
    tabBarInactiveTintColor: colors.tabBar.inActive,
    headerTitle: (_props) => <Image source={logo} style={styles.logo} />,
    headerLeft: (_props) => <Image source={{ uri: 'https://portrait.gitee.com/uploads/avatars/user/1775/5326174_monochrome1998_1636865249.png!avatar60' }}
      style={styles.avatar}
    />,
    headerRight: (_props) => <Ionicons name="planet-outline" size={30} color="black" style={{ marginRight: 10 }} />
  }

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home' screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={HomePage} options={{
          tabBarIcon: ({ focused, color, size }) => <Ionicons
            name={focused ? "home" : "home-outline"}
            size={size}
            color={color} />
        }} />
        <Tab.Screen name="Search" component={SearchPage} options={{
          tabBarIcon: ({ focused, color, size }) => <Ionicons
            name={focused ? "search" : "search-outline"}
            size={size}
            color={color} />
        }} />
        <Tab.Screen name="Notifications" component={NotificationPage} options={{
          tabBarIcon: ({ focused, color, size }) => <Ionicons
            name={focused ? "notifications-sharp" : "notifications-outline"}
            size={size}
            color={color} />
        }} />
        <Tab.Screen name="Mail" component={MailPage} options={{
          tabBarIcon: ({ focused, color, size }) => <Ionicons
            name={focused ? "ios-mail-sharp" : "ios-mail-outline"}
            size={size}
            color={color} />
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    marginLeft: 10,
    borderRadius: 1000,
    resizeMode: 'cover'
  },
})