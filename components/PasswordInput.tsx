import { Ionicons } from '@expo/vector-icons'
import { colors } from '@Styles/colors'
import { useState } from 'react'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
/**
 * 密码输入框，添加了眼睛图标，用于密码明文和密文切换
 * @param props Same as TextInputProps
 * @returns Component
 */
export const PasswordInput = (props: TextInputProps) => {
    const [hideText, setHideText] = useState(true)
    const pressIcon = () => {
        setHideText(!hideText)
    }
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
                value={props.value}
                onChangeText={props.onChangeText}
                secureTextEntry={hideText}
                style={styles.textInput}
                {...props}
            />
            <Ionicons
                name={hideText ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color={colors.slate['400']}
                style={styles.eye}
                onPress={pressIcon}
                suppressHighlighting={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        height: 60,
        borderBottomWidth: 1,
        borderColor: colors.gray['300'],
        position: 'relative'
    },
    eye: {
        position: 'absolute',
        right: 0
    }
})
