import { PasswordInput } from '@Components/PasswordInput'
import { passwordLogin } from '@Network/api/account'
import { StackActions, useNavigation } from '@react-navigation/native'
import { setAuthToken } from '@Storage/index'
import { colors } from '@Styles/colors'
import { errorToast, successToast } from '@Utils/utils'
import React, { useState } from 'react'
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
export const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()
    const login = () => {
        passwordLogin({ username, password })
            .then(async res => {
                if (!res.error_code && res.access_token) {
                    await setAuthToken(res)
                    navigation.dispatch(StackActions.replace('TabBar'))
                    successToast('欢迎回来')
                } else {
                    errorToast(res.error_description)
                }
            })
            .catch(e => e)
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={{ flex: 1, padding: 20 }}>
                <Text
                    style={{ fontSize: 30, fontWeight: 'bold', marginTop: 20 }}
                >
                    使用账号登录
                </Text>

                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder='输入你的账号'
                    maxLength={45}
                    autoComplete='email'
                    autoFocus={true}
                    blurOnSubmit={false}
                    clearButtonMode='always'
                    keyboardType='email-address'
                    textContentType='username'
                    style={{
                        height: 60,
                        borderBottomWidth: 1,
                        borderColor: colors.gray['300'],
                        marginTop: 20
                    }}
                />

                <PasswordInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder='输入你的密码'
                />
                <TouchableOpacity onPress={login}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.black,
                            height: 60,
                            borderRadius: 30,
                            marginTop: 50
                        }}
                    >
                        <Text style={{ color: colors.white, fontSize: 26 }}>
                            登录
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View
                        hitSlop={{ top: 0, bottom: 20, left: 20, right: 20 }}
                        style={{
                            height: 30,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20
                        }}
                    >
                        <Text>忘记密码？</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
