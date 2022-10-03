import AsyncStorage from "@react-native-async-storage/async-storage"
export const AuthToken = "AuthToken"


export const save = async (key: string, data: any): Promise<void> => {
    try {
        return await AsyncStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
        console.error(e)
        return Promise.reject('Error while saving data')
    }
}

export const read = async (key: string): Promise<any> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
        console.error(e)
        return Promise.reject('Could not parse json data')
    }
}

export const remove = async (key: string): Promise<void> => {
    try {
        return await AsyncStorage.removeItem(key)
    } catch (e) {
        console.error(e)
    }
}

export const isSignIn = async (): Promise<boolean> => {
    const result = await read(AuthToken)
    return result?.access_token != null
}

export const setAuthToken = (data: any): Promise<void> => {
    return save(AuthToken, data)
}

export const getAuthToken = async () => {
    return await read(AuthToken)
}