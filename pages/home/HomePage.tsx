import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useCallback, useState } from 'react'
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { colors } from '../../styles/colors'
export const HomePage = ({ props }) => {
    const [refreshing, setRefreshing] = useState(false)
    const [fleetList, setFleetList] = useState([
        {
            id: 1,
            nickname: 'Amazon Web Services',
            username: '@awscloud',
            avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            content:
                'AWS Power businesses in Singapore, to reach more audiences, gain more opportunities for growth, and offer more security. Do more with AWS.',
            likes: 202,
            comments: 9,
            reFleet: 21,
            mediaList: [
                {
                    id: 1,
                    type: 'image',
                    source: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                }
            ]
        },
        {
            id: 2,
            nickname: 'Momo Kawaii',
            username: '@kawaii',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            content:
                'Miss me?',
            likes: 10,
            comments: 66,
            reFleet: 77
        },
        {
            id: 3,
            nickname: '神之勇域',
            username: '@yyds',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            content:
                '我好羡慕勇哥啊',
            likes: 888,
            comments: 999,
            reFleet: 30
        }
    ])

    const separator = () => {
        return (<View style={{ width: '100%', height: 0.7, backgroundColor: colors.slate['300'] }}></View>)
    }

    const fleetOperation = (icon, count) => {
        return (
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                {icon}
                <Text
                    style={{
                        fontSize: 16,
                        marginLeft: 5,
                        fontWeight: '400',
                        color: colors.slate['400']
                    }}
                >
                    {count && count}
                </Text>
            </View>
        )
    }

    const renderFleet = ({ item }) => {
        return (
            <View style={styles.fleet}>
                {/* 左侧头像 */}
                <TouchableOpacity>
                    <Image
                        source={{ uri: item.avatar }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            resizeMode: 'cover'
                        }}
                    />
                </TouchableOpacity>
                {/* 右侧Fleet主内容 */}
                <View
                    style={{
                        display: 'flex',
                        marginLeft: 10,
                        flexGrow: 1
                    }}
                >
                    {/* 个人信息 */}
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: 25
                        }}
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                                {item.nickname}
                            </Text>
                            <Text
                                style={{
                                    marginLeft: 5,
                                    color: colors.slate['500'],
                                    fontSize: 16
                                }}
                            >
                                {item.username}
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Ionicons
                                name="ios-ellipsis-horizontal"
                                size={20}
                                color={colors.slate['300']}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* 正文 */}
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={{ flexWrap: true, flex: 1, fontWeight: '600' }} numberOfLines={10}>
                            {item.content}
                        </Text>
                    </View>
                    {/* 正文媒体 */}
                    {item.mediaList &&
                        item.mediaList.map(media => (
                            // TODO 需要判断媒体类型
                            <Image
                                source={{ uri: media.source }}
                                style={{
                                    width: '100%',
                                    height: 200,
                                    resizeMode: 'cover',
                                    borderRadius: 15,
                                    marginTop: 10
                                }}
                                key={media.id}
                            />
                        ))}
                    {/* 点赞、评论、转推等操作 */}
                    <View
                        style={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 10
                        }}
                    >
                        {fleetOperation(
                            <Ionicons
                                name="chatbubble-outline"
                                size={24}
                                color={colors.slate['500']}
                            />,
                            item.comments
                        )}
                        {fleetOperation(
                            <AntDesign
                                name="retweet"
                                size={24}
                                color={colors.slate['500']}
                            />,
                            item.reFleet
                        )}
                        {fleetOperation(
                            <AntDesign
                                name="hearto"
                                size={24}
                                color={colors.slate['500']}
                            />,
                            item.likes
                        )}
                        {fleetOperation(
                            <Ionicons
                                name="share-outline"
                                size={24}
                                color={colors.slate['500']}
                            />
                        )}
                    </View>
                </View>
            </View>
        )
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    })

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={fleetList}
                keyExtractor={item => item.id}
                renderItem={renderFleet}
                initialNumToRender={10}
                ItemSeparatorComponent={separator}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex'
    },
    body: {
        flex: 1
    },
    fleet: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        padding: 10,
        backgroundColor: '#ffffff'
    }
})