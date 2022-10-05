import { Ionicons } from '@expo/vector-icons'
import { AuthContext } from '@Utils/context'
import { errorToast } from '@Utils/utils'
import React, { useContext, useState } from 'react'
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import { colors } from '../../../styles/colors'
import { Media } from './types'
interface Callback {
    close: () => void
    send: (content: string, mediaList?: Media[]) => void
}
/**
 * 发推面板
 */
export const Twitter = ({ close, send }: Callback) => {
    const [content, setContent] = useState('')
    const context = useContext(AuthContext)
    const publishFleet = () => {
        if (!content) {
            errorToast('请输入推文')
            return
        }
        send(content)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
                {/* 顶部 */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={close}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Text style={styles.cancel}>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={publishFleet}>
                        <View style={styles.twitterBtn}>
                            <Text style={styles.twitterBtnText}>发推</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* 正文 */}
                <View style={styles.mainBody}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <Image
                                source={{
                                    uri: context?.avatar
                                }}
                                style={styles.avatar}
                            />
                        </View>
                        <View style={styles.contentView}>
                            <TextInput
                                value={content}
                                onChangeText={setContent}
                                textAlign='left'
                                placeholder='有什么新鲜事？'
                                autoFocus={true}
                                placeholderTextColor={colors.slate['400']}
                                textAlignVertical='top'
                                multiline={true}
                                style={styles.contentInput}
                            />
                        </View>
                    </View>
                    <View style={styles.bottomOps}>
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
            </KeyboardAvoidingView>
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
        height: 35,
        backgroundColor: colors.sky['500'],
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    twitterBtnText: {
        color: colors.white,
        fontSize: 20
    },
    mainBody: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 10
    },
    avatar: { width: 60, height: 60, borderRadius: 1000, resizeMode: 'cover' },
    bottomOps: {
        height: 60,
        borderTopWidth: 1,
        borderColor: colors.gray['200'],
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    contentView: {
        flex: 5,
        marginTop: 10,
        marginLeft: 10
    },
    contentInput: { flex: 1, fontSize: 20, fontWeight: 'bold' }
})
