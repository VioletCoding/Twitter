import { colors } from "@Styles/colors"
import Toast, { ToastOptions } from "react-native-root-toast"

const _option: ToastOptions = {
    animation: true,
    keyboardAvoiding: true,
    position: Toast.positions.TOP,
    duration: Toast.durations.LONG,
    shadow: true,
    hideOnPress: true,
    backgroundColor: colors.sky['50'],
    textColor: colors.black,
    shadowColor: colors.gray['200'],
    opacity: 1,
    textStyle: {
        color: colors.black,
        fontSize: 18,
        fontWeight: 'bold'
    },
    containerStyle: {
        height: 60,
        width: '80%',
        backgroundColor: '#ebf5fc',
        borderWidth: 1,
        borderColor: colors.red['400'],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        borderRadius: 10
    }
}

export const successToast = (message: string, option: ToastOptions = _option) => {
    // @ts-ignored
    option.containerStyle.borderColor = colors.sky['300']
    Toast.show(message, option)
}

export const errorToast = (message: string, option: ToastOptions = _option) => {
    // @ts-ignored
    option.containerStyle.borderColor = colors.red['400']
    Toast.show(message, option)
}