import { PasswordInput } from '@Components/PasswordInput'
import { appRegister } from '@Network/api/account'
import { useNavigation } from '@react-navigation/native'
import { colors } from '@Styles/colors'
// @ts-ignored
import { successToast } from '@Utils/utils'
import { useState } from 'react'
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'

export const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigation = useNavigation()
    const register = () => {
        if (username && password && confirmPassword) {
            if (password !== confirmPassword) {
                successToast('两次密码不一致')
                return
            }
            appRegister({
                account: username,
                password: password,
                confirmPassword: confirmPassword
            })
                .then(res => {
                    if (res.success) {
                        navigation.goBack()
                        successToast('注册成功')
                    }
                })
                .catch(e => e)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={{ flex: 1, padding: 20 }}>
                <Text
                    style={{ fontSize: 30, fontWeight: 'bold', marginTop: 20 }}
                >
                    注册你的账号
                </Text>

                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder='输入你的账号'
                    maxLength={16}
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
                <PasswordInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder='请确认密码'
                />
                <TouchableOpacity onPress={register}>
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
                            注册账号
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
