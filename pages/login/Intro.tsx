// @ts-ignored
import logo from '@Assets/logo.jpg'
import { StackActions, useNavigation } from '@react-navigation/native'
import { colors } from '@Styles/colors'
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
/**
 * 登录页
 */
export const Intro = () => {
    const navigation = useNavigation()
    const toLogin = () => {
        navigation.dispatch(StackActions.push('Login'))
    }
    const toReg = () => {
        navigation.dispatch(StackActions.push('Register'))
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={colors.white}
            />
            {/* header */}
            <View style={styles.header}>
                <Image
                    source={logo}
                    style={styles.logo}
                />
            </View>
            {/* body */}
            <View style={styles.bodyView}>
                <Text style={styles.sloganText}>查看世界正在发生的新鲜事</Text>
                <View>
                    <TouchableOpacity onPress={toReg}>
                        <View style={styles.regBtn}>
                            <Text style={styles.regText}>创建账号</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toLogin}>
                        <View style={styles.loginBtn}>
                            <Text style={styles.loginText}>登录</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'cover'
    },
    header: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyView: {
        flex: 1,
        paddingHorizontal: 25,
        justifyContent: 'space-around',
        flexShrink: 1
    },
    sloganText: {
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    regBtn: {
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black,
        marginTop: 30
    },
    regText: { fontSize: 24, color: colors.white },
    loginBtn: {
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.sky['500'],
        marginTop: 30
    },
    loginText: {
        fontSize: 24,
        color: colors.white
    }
})
