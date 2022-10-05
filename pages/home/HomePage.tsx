import { EmptyScreen } from '@Components/EmptyScreen'
import { Ionicons } from '@expo/vector-icons'
import { addFleet, fleetPage, likeOrNot } from '@Network/api/fleet'
import { colors } from '@Styles/colors'
import { errorToast } from '@Utils/utils'
import { useRef, useState } from 'react'
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
    const [showModal, setShowModal] = useState(false)
    const reached = useRef(true)
    // 推文列表
    const [fleetList, setFleetList] = useState<FleetProps[]>([])
    // 分页参数
    const current = useRef(1)
    const size = useRef(10)
    const initd = useRef(false)
    // 加载Fleet
    const loadFleet = async () => {
        console.log('Start load fleets...')
        await fleetPage({
            size: size.current,
            current: current.current,
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
    if (!initd.current) {
        loadFleet()
        initd.current = true
    }
    // 下拉刷新Fleet
    const onRefresh = () => {
        current.current = 1
        loadFleet()
    }
    // 发推
    const sendFleet = (content: string, mediaList?: Media[]) => {
        addFleet({ content, mediaList })
            .then(_res => {
                setShowModal(false)
                current.current = 1
                loadFleet()
            })
            .catch(e => errorToast(e.message || '推文发送失败'))
    }
    // 到达设定的视图位置时加载下一页
    const onEndReached = ({ distanceFromEnd }: { distanceFromEnd: number }) => {
        console.log('onEndReached: ', distanceFromEnd)
        if (distanceFromEnd < 0 || reached.current) {
            return
        }
        current.current++
        loadFleet()
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
                initialNumToRender={size.current}
                ItemSeparatorComponent={separator}
                refreshing={refreshing.current}
                onRefresh={onRefresh}
                onEndReachedThreshold={0.3}
                onEndReached={onEndReached}
                ListEmptyComponent={() => EmptyScreen('这里什么都还没有')}
                onMomentumScrollBegin={() => (reached.current = false)}
                removeClippedSubviews={true}
            />
            <TouchableOpacity onPress={() => setShowModal(true)}>
                <View style={styles.floatActionButton}>
                    <Ionicons
                        name='add-sharp'
                        size={30}
                        color={colors.white}
                    />
                </View>
            </TouchableOpacity>
            <Modal
                visible={showModal}
                animationType='slide'
            >
                <Twitter
                    close={() => setShowModal(false)}
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
