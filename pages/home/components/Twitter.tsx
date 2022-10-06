import { Ionicons } from '@expo/vector-icons'
import { upload } from '@Network/api/oss'
import { AuthContext } from '@Utils/context'
import * as ImagePicker from 'expo-image-picker'
import React, { useContext, useMemo, useRef, useState } from 'react'
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
import { Col, Grid } from 'react-native-easy-grid'
import { RootSiblingParent } from 'react-native-root-siblings'
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
    // 已选文件
    const [pickFiles, setPickFiles] = useState<ImagePicker.ImageInfo[]>([])
    // 推文内容
    const [content, setContent] = useState('')
    // 登录信息
    const context = useContext(AuthContext)
    // 组件引用
    const contentRef = useRef<TextInput>(null)
    // 本条推文是否包含媒体内容
    const hasMedia = useRef(false)
    // 媒体内容类型，只能同时存在一种类型
    const mediaType = useRef<ImagePicker.MediaTypeOptions | null>(null)
    // 计算grid的高度
    const gridMaxHeight = useMemo<number>(() => {
        if (pickFiles.length > 0 && pickFiles.length <= 4) {
            return 230
        }
        return 0
    }, [pickFiles])
    // 计算宫格显示的内容
    const renderGird = useMemo(() => {
        if (pickFiles.length === 0) {
            return
        }
        return (
            <Grid
                style={{
                    backgroundColor: colors.sky['400'],
                    maxHeight: gridMaxHeight,
                    borderRadius: 20
                }}
            ></Grid>
        )
    }, [pickFiles])
    // 发推
    const publishFleet = async () => {
        if (!content) {
            if (contentRef.current) {
                contentRef.current.focus()
            }
            return
        }
        await uploadPickFiles()
        send(content)
    }
    // 上传媒体内容
    const uploadPickFiles = async (): Promise<Media[]> => {
        const resultList: Media[] = []
        if (pickFiles.length === 0) {
            return resultList
        }
        for (const img of pickFiles) {
            const data = new FormData()
            data.append('file', {
                uri: img.uri,
                name: img.fileName,
                type: img.type === 'image' ? 'image/png' : 'video/mp4'
            })
            const response = await upload(data)
            if (response.success) {
                resultList.push(...response.data)
            }
        }
        return resultList
    }
    // 弹出图片选择器
    const pickImage = async (type: ImagePicker.MediaTypeOptions) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: type,
            quality: 1,
            orderedSelection: true,
            selectionLimit: 4,
            allowsMultipleSelection: true
        })
        console.log(result)
        if (!result.cancelled && result.selected.length > 0) {
            setPickFiles(result.selected)
            hasMedia.current = true
            mediaType.current = type
        } else if (result.cancelled && pickFiles.length === 0) {
            hasMedia.current = false
        }
    }
    return (
        <RootSiblingParent>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    {/* 顶部 */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={close}
                            hitSlop={{
                                top: 10,
                                bottom: 10,
                                left: 10,
                                right: 10
                            }}
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
                                    ref={contentRef}
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
                        {/* 选择的图片 */}
                        {pickFiles.length > 0 && renderGird}
                        <View style={styles.bottomOps}>
                            <TouchableOpacity>
                                <Ionicons
                                    name='radio-outline'
                                    size={24}
                                    color={colors.sky['500']}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    pickImage(
                                        ImagePicker.MediaTypeOptions.Images
                                    )
                                }
                            >
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
        </RootSiblingParent>
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
