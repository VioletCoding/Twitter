import { Ionicons } from '@expo/vector-icons'
import { colors } from '@Styles/colors'
import { useState } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
export const PasswordInput = (props: TextInputProps) => {
    const [showText, setShowText] = useState(false)
    const pressIcon = () => {
        setShowText(!showText)
    }
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
                value={props.value}
                onChangeText={props.onChangeText}
                secureTextEntry={showText}
                style={{
                    flex: 1,
                    height: 60,
                    borderBottomWidth: 1,
                    borderColor: colors.gray['300'],
                    position: 'relative'
                }}
                {...props}
            />
            <Ionicons
                name={showText ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color={colors.slate['400']}
                style={{ position: 'absolute', right: 0 }}
                onPress={pressIcon}
            />
        </View>
    )
}
