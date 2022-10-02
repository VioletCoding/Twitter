import Toast from "react-native-root-toast"

export const ShowTost = (message: string) => {
    Toast.show(message, {
        animation: true,
        position: Toast.positions.CENTER,
        duration: Toast.durations.SHORT,
        shadow: true,
        hideOnPress: true
    })
}