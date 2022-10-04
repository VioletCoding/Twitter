import { Ionicons } from '@expo/vector-icons'
import { addFleet, fleetPage } from '@Network/api/fleet'
import { colors } from '@Styles/colors'
import { errorToast } from '@Utils/utils'
import { useEffect, useRef, useState } from 'react'
import {
    FlatList,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { Fleet } from './components/Fleet'
import { Twitter } from './components/Twitter'
import { FleetProps, Media } from './components/types'
export const HomePage = () => {
    // 下拉刷新状态
    const [refreshing, setRefreshing] = useState(false)
    // 发推Modal显隐
    const [showModal, setShowModal] = useState(false)
    // 推文列表
    const [fleetList, setFleetList] = useState<FleetProps[]>([])
    // 分页参数
    const [current, setCurrent] = useState(1)
    const [size, setSize] = useState(10)
    // 是否有下一页
    const hasNext = useRef(true)
    useEffect(() => {
        console.log('============useEffect============')
        loadFleet()
    }, [current])
    // 加载Fleet
    const loadFleet = async () => {
        if (!hasNext.current) {
            setRefreshing(false)
            return
        }
        console.log('Start load fleets...')
        fleetPage({
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
                if (res.data.pages === res.data.current) {
                    hasNext.current = false
                } else {
                    hasNext.current = true
                }
                setRefreshing(false)
            })
            .catch(() => {
                errorToast('加载推文列表失败')
                setRefreshing(false)
            })
    }
    // 下拉刷新Fleet
    const onRefresh = () => {
        hasNext.current = true
        setRefreshing(true)
        setCurrent(1)
    }
    // 发推
    const sendFleet = (content: string, mediaList?: Media[]) => {
        addFleet({ content: content, mediaList: mediaList })
            .then(_res => {
                setShowModal(false)
                hasNext.current = true
                setCurrent(1)
            })
            .catch(e => errorToast(e.message || '推文发送失败'))
    }
    // 到达设定的视图位置时加载下一页
    const onEndReached = (info: { distanceFromEnd: number }) => {
        console.log('onEndReached: ', info.distanceFromEnd)
        if (info.distanceFromEnd < 0) {
            // 避免第一次进页面时，直接到达了底部，会触发两次useEffect
            return
        }
        setCurrent(current + 1)
    }
    // 每个Fleet的分隔线
    const separator = () => <View style={styles.separator} />
    // 渲染每个Fleet
    const renderFleet = (fleetProps: any) => <Fleet {...fleetProps} />
    // 空屏
    const emptyScreen = () => {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    marginTop: 50
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: colors.slate['500']
                    }}
                >
                    这里什么都还没有
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={fleetList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => renderFleet(item)}
                initialNumToRender={size}
                ItemSeparatorComponent={separator}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onEndReachedThreshold={0.2}
                onEndReached={onEndReached}
                ListEmptyComponent={emptyScreen}
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
