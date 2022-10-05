import { EmptyScreen } from '@Components/EmptyScreen'
import { Ionicons } from '@expo/vector-icons'
import { addFleet, fleetPage, likeOrNot } from '@Network/api/fleet'
import { colors } from '@Styles/colors'
import { errorToast } from '@Utils/utils'
import { useEffect, useRef, useState } from 'react'
import {
    FlatList,
    Modal,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'
import { Fleet } from './components/Fleet'
import { Twitter } from './components/Twitter'
import { FleetProps, Media } from './components/types'
export const HomePage = () => {
    // 下拉刷新状态
    const refreshing = useRef(false)
    // 发推Modal显隐
    const showModal = useRef(false)
    const reached = useRef(true)
    // 推文列表
    const [fleetList, setFleetList] = useState<FleetProps[]>([])
    // 分页参数
    const [current, setCurrent] = useState(1)
    const size = 10
    useEffect(() => {
        console.log('======useEffect======')
        loadFleet(current)
        reached.current = true
    }, [current])
    // 加载Fleet
    const loadFleet = async (current: number) => {
        console.log('Start load fleets...')
        await fleetPage({
            size: size,
            current: current,
            descs: 'create_time'
        })
            .then(res => {
                if (res.data.current === 1) {
                    setFleetList(res.data.records)
                } else {
                    setFleetList(fleetList.concat(res.data.records))
                }
            })
            .catch(() => {
                errorToast('加载推文列表失败')
            })
        refreshing.current = false
    }
    // 下拉刷新Fleet
    const onRefresh = () => {
        setCurrent(1)
    }
    // 发推
    const sendFleet = (content: string, mediaList?: Media[]) => {
        addFleet({ content, mediaList })
            .then(_res => {
                showModal.current = false
                setCurrent(1)
            })
            .catch(e => errorToast(e.message || '推文发送失败'))
    }
    // 到达设定的视图位置时加载下一页
    const onEndReached = ({ distanceFromEnd }: { distanceFromEnd: number }) => {
        console.log('onEndReached: ', distanceFromEnd)
        if (distanceFromEnd < 0 || reached.current) {
            // 避免第一次进页面时，直接到达了底部，会触发两次useEffect
            return
        }
        setCurrent(current + 1)
    }
    // 每个Fleet的分隔线
    const separator = () => <View style={styles.separator} />
    // 渲染每个Fleet
    const renderFleet = (fleetProps: any) => (
        <Fleet
            item={fleetProps}
            onLike={(item, like) => {
                likeOrNot(item.id, like)
                    .then(() => {})
                    .catch(() => {})
                item.liked = true
            }}
            onComment={item => {}}
            onPressAvatar={item => {}}
            onPressFleet={item => {}}
            onPressMore={item => {}}
            onShare={item => {}}
            onRetweet={item => {}}
        />
    )

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={fleetList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => renderFleet(item)}
                initialNumToRender={size}
                ItemSeparatorComponent={separator}
                refreshing={refreshing.current}
                onRefresh={onRefresh}
                onEndReachedThreshold={0.3}
                onEndReached={onEndReached}
                ListEmptyComponent={() => EmptyScreen('这里什么都还没有')}
                onMomentumScrollBegin={() => (reached.current = false)}
                removeClippedSubviews={true}
            />
            <TouchableOpacity onPress={() => (showModal.current = true)}>
                <View style={styles.floatActionButton}>
                    <Ionicons
                        name='add-sharp'
                        size={30}
                        color={colors.white}
                    />
                </View>
            </TouchableOpacity>
            <Modal
                visible={showModal.current}
                animationType='slide'
            >
                <Twitter
                    close={() => (showModal.current = true)}
                    send={sendFleet}
                />
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    separator: {
        width: '100%',
        height: 0.7,
        backgroundColor: colors.slate['300']
    },
    floatActionButton: {
        width: 60,
        height: 60,
        backgroundColor: colors.sky['500'],
        position: 'absolute',
        bottom: 50,
        right: 10,
        borderRadius: 1000,
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
})
