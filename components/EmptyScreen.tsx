import { colors } from '@Styles/colors'
import { StyleSheet, Text, View } from 'react-native'

export const EmptyScreen = (text?: string) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.slate['500']
    }
})
