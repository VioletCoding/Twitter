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
export const Twitter = ({ close }: { close: () => void }) => {
    const [content, setContent] = useState('')
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* 顶部 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={close}>
                    <Text style={styles.cancel}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.twitterBtn}>
                        <Text style={styles.twitterBtnText}>发推</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* 正文 */}
            <View style={{ flex: 1, backgroundColor: colors.gray['100'] }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View
                        style={{ flex: 1, backgroundColor: colors.sky['300'] }}
                    >
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
                    <View
                        style={{ flex: 5, backgroundColor: colors.gray['200'] }}
                    >
                        <TextInput
                            value={content}
                            onChangeText={setContent}
                            textAlign='left'
                            placeholder='有什么新鲜事？'
                            autoFocus={true}
                            placeholderTextColor={colors.slate['400']}
                            textAlignVertical='top'
                            multiline={true}
                            style={{ flex: 1 }}
                        />
                    </View>
                </View>

                <View style={{ height: 60, borderWidth: 1 }}></View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        borderWidth: 1,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
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
