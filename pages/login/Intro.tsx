import logo from '@Assets/logo.jpg'
import { useNavigation } from '@react-navigation/native'
import { colors } from '@Styles/colors'
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

/**
 * 登录页
 */
export const Intro = () => {
    const navigation = useNavigation()
    const toLogin = () => {
        // @ts-ignore
        navigation.navigate('Login')
    }
    const toReg = () => {
        // @ts-ignore
        navigation.navigate('Register')
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={colors.white}
            />
            {/* header */}
            <View
                style={{
                    height: 60,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Image
                    source={logo}
                    style={{ width: 40, height: 40 }}
                />
            </View>
            {/* body */}
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 25,
                    justifyContent: 'space-around',
                    flexShrink: 1
                }}
            >
                <Text
                    style={{
                        fontSize: 34,
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}
                >
                    查看世界正在发生的新鲜事
                </Text>

                <View>
                    <TouchableOpacity onPress={toReg}>
                        <View
                            style={{
                                height: 60,
                                borderRadius: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: colors.black,
                                marginTop: 30
                            }}
                        >
                            <Text style={{ fontSize: 24, color: colors.white }}>
                                创建账号
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toLogin}>
                        <View
                            style={{
                                height: 60,
                                borderRadius: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: colors.sky['500'],
                                marginTop: 30
                            }}
                        >
                            <Text style={{ fontSize: 24, color: colors.white }}>
                                登录
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
