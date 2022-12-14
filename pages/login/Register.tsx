import { PasswordInput } from '@Components/PasswordInput'
import { appRegister } from '@Network/api/account'
import { useNavigation } from '@react-navigation/native'
import { colors } from '@Styles/colors'
import { errorToast, successToast } from '@Utils/utils'
import { useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
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
            if (username.length > 45) {
                errorToast('账号最大45位数')
                return
            }
            if (password.length < 8 && password.length > 45) {
                errorToast('密码应处于8-25位之间')
                return
            }
            if (password !== confirmPassword) {
                errorToast('两次密码不一致')
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
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.title}>注册你的账号</Text>
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
                    style={styles.account}
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
                    <View style={styles.regBtn}>
                        <Text style={styles.regText}>注册账号</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    main: { flex: 1, padding: 20 },
    title: { fontSize: 30, fontWeight: 'bold', marginTop: 20 },
    account: {
        height: 60,
        borderBottomWidth: 1,
        borderColor: colors.gray['300'],
        marginTop: 20
    },
    regBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black,
        height: 60,
        borderRadius: 30,
        marginTop: 50
    },
    regText: { color: colors.white, fontSize: 26 }
})
