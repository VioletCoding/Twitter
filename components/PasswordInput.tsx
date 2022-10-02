import { Ionicons } from '@expo/vector-icons'
import { colors } from '@Styles/colors'
import { useState } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
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
                name={hideText ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color={colors.slate['400']}
                style={{ position: 'absolute', right: 0 }}
                onPress={pressIcon}
                suppressHighlighting={true}
            />
        </View>
    )
}
