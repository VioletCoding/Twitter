import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import { colors } from '../../../styles/colors'
export const Twitter = ({
    close,
    send
}: {
    close: () => void
    send: () => void
}) => {
    const [content, setContent] = useState('')
    const publishFleet = () => {
        send()
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* 顶部 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={close}>
                    <Text style={styles.cancel}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={publishFleet}>
                    <View style={styles.twitterBtn}>
                        <Text style={styles.twitterBtnText}>发推</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* 正文 */}
            <View
                style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    paddingHorizontal: 10
                }}
            >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, marginTop: 10 }}>
                        <Image
                            source={{
                                uri: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                            }}
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 1000,
                                resizeMode: 'cover'
                            }}
                        />
                    </View>
                    <View style={{ flex: 5, marginTop: 10, marginLeft: 10 }}>
                        <TextInput
                            value={content}
                            onChangeText={setContent}
                            textAlign='left'
                            placeholder='有什么新鲜事？'
                            autoFocus={true}
                            placeholderTextColor={colors.slate['400']}
                            textAlignVertical='top'
                            multiline={true}
                            style={{
                                flex: 1,
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        height: 60,
                        borderTopWidth: 1,
                        borderColor: colors.gray['200'],
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 10
                    }}
                >
                    <TouchableOpacity>
                        <Ionicons
                            name='radio-outline'
                            size={24}
                            color={colors.sky['500']}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons
                            name='image-outline'
                            size={24}
                            color={colors.sky['500']}
                            style={{ marginLeft: 30 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons
                            name='location-outline'
                            size={24}
                            color={colors.sky['500']}
                            style={{ marginLeft: 30 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    cancel: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    twitterBtn: {
        width: 70,
        height: 40,
        backgroundColor: colors.sky['500'],
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    twitterBtnText: {
        color: colors.white,
        fontSize: 20
    }
})
