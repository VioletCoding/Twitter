import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from '../../assets/logo.jpg'
import { colors } from '../../styles/colors'

/**
 * 登录页
 */
export const LoginPage = () => {
    const toLogin = () => {}
    const toReg = () => {}
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                    style={{ width: 50, height: 50 }}
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
