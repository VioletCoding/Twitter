import { AntDesign, Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import useUpdateEffect from 'use-update-effect'
import { colors } from '../../../styles/colors'
import { FleetProps, Media } from './types'
interface Callback {
    /**
     * The fleet props
     */
    item: FleetProps
    /**
     * On press comment button
     */
    onComment: (item: FleetProps) => void
    /**
     * On press retweet button
     */
    onRetweet: (item: FleetProps) => void
    /**
     * On press like / unlike button
     */
    onLike: (item: FleetProps, like: boolean) => void
    /**
     * On press share button
     */
    onShare: (item: FleetProps) => void
    /**
     * On press fleet avatar
     */
    onPressAvatar: (item: FleetProps) => void
    /**
     * On press more button
     */
    onPressMore: (item: FleetProps) => void
}
/**
 * 每个Fleet
 * @param props FleetProps
 */
const { width, height } = Dimensions.get('window')
export const Fleet = (props: Callback) => {
    const [fleet] = useState(props.item)
    const [liked, setLiked] = useState(fleet.liked)
    const [likes, setLikes] = useState(fleet.likes)
    const [mediaList] = useState<Media[]>(
        fleet.attachJson ? JSON.parse(fleet.attachJson) : []
    )
    useUpdateEffect(() => {
        let likeCount = likes
        if (liked) {
            likeCount++
        } else {
            likeCount--
        }
        if (likeCount > 0) {
            setLikes(likeCount)
        } else {
            setLikes(0)
        }
        props.onLike(fleet, liked)
    }, [liked])
    // 每个Fleet底部的操作按钮
    const fleetOperation = (icon: any, count?: number, action?: () => void) => {
        return (
            <TouchableOpacity onPress={action}>
                <View style={styles.opsContainer}>
                    {icon}
                    <Text style={styles.opsText}>{count || ''}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.fleet}>
            {/* 左侧头像 */}
            <TouchableOpacity onPress={() => props.onPressAvatar(fleet)}>
                <Image
                    source={{ uri: fleet.avatar }}
                    style={styles.avatar}
                />
            </TouchableOpacity>
            {/* 右侧Fleet主内容 */}
            <View style={styles.main}>
                {/* 个人信息 */}
                <View style={styles.userInfo}>
                    <View style={styles.header}>
                        <Text
                            style={styles.nickname}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >
                            {fleet.nickname}
                        </Text>
                        <Text
                            style={styles.username}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >
                            {fleet.username}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => props.onPressMore(fleet)}>
                        <Ionicons
                            name='ios-ellipsis-horizontal'
                            size={20}
                            color={colors.slate['300']}
                        />
                    </TouchableOpacity>
                </View>
                {/* 正文 */}
                <View style={styles.contentContainer}>
                    <Text
                        style={styles.content}
                        numberOfLines={10}
                    >
                        {fleet.content}
                    </Text>
                </View>
                {/* 正文媒体 */}
                {mediaList.length > 0 && (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginTop: 5,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            alignSelf: 'flex-start'
                        }}
                    >
                        {mediaList.map((media, index) => (
                            <Image
                                source={{ uri: media.source }}
                                style={{
                                    width:
                                        mediaList.length > 0 ? '49%' : '100%',
                                    height: mediaList.length > 0 ? 100 : '100%',
                                    borderRadius: 5,
                                    marginTop: 5,
                                    marginLeft: index % 2 === 0 ? 0 : 5
                                }}
                                key={media.id}
                                resizeMode='cover'
                            />
                        ))}
                    </View>
                )}
                {/* 点赞、评论、转推等操作 */}
                <View style={styles.ops}>
                    {fleetOperation(
                        <Ionicons
                            name='chatbubble-outline'
                            size={20}
                            color={colors.slate['500']}
                        />,
                        fleet.comments,
                        () => props.onComment(fleet)
                    )}
                    {fleetOperation(
                        <AntDesign
                            name='retweet'
                            size={20}
                            color={colors.slate['500']}
                        />,
                        fleet.retweet,
                        () => props.onRetweet(fleet)
                    )}
                    {fleetOperation(
                        <AntDesign
                            name={liked ? 'heart' : 'hearto'}
                            size={20}
                            color={
                                liked ? colors.red['400'] : colors.slate['400']
                            }
                        />,
                        likes,
                        () => setLiked(!liked)
                    )}
                    {fleetOperation(
                        <Ionicons
                            name='share-outline'
                            size={20}
                            color={colors.slate['500']}
                        />,
                        undefined,
                        () => props.onShare(fleet)
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    opsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    opsText: {
        fontSize: 16,
        marginLeft: 5,
        fontWeight: '400',
        color: colors.slate['400']
    },
    fleet: {
        width: width,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#ffffff'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 1000,
        resizeMode: 'cover'
    },
    main: {
        marginLeft: 10,
        flex: 1,
        flexDirection: 'column'
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 25
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    nickname: {
        fontWeight: 'bold',
        fontSize: 18
    },
    username: {
        marginLeft: 5,
        color: colors.slate['500'],
        fontSize: 16
    },
    contentContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    content: {
        flex: 1,
        flexWrap: 'wrap',
        fontWeight: '600',
        fontSize: 18
    },
    ops: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    }
})
