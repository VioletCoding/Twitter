import { Ionicons } from '@expo/vector-icons'
import { addFleet, fleetPage } from '@Network/api/fleet'
import { colors } from '@Styles/colors'
import { errorToast, successToast } from '@Utils/utils'
import React, { useCallback, useEffect, useState } from 'react'
import {
    FlatList,
    Modal,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'
import { PageQuery } from 'types'
import { Fleet } from './components/Fleet'
import { Twitter } from './components/Twitter'
import { FleetProps, Media } from './components/types'
export const HomePage = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [query, setQuery] = useState<PageQuery>({
        size: 10,
        current: 1
    })
    const [fleetList, setFleetList] = useState<FleetProps[]>([])

    useEffect(() => {
        loadFleet()
    }, [query])

    const loadFleet = () => {
        fleetPage(query)
            .then(res => {
                setFleetList(res.data.records)
            })
            .catch(() => errorToast('加载推文列表失败'))
    }

    const separator = () => {
        return <View style={styles.separator} />
    }

    const renderFleet = (fleetProps: any) => {
        return <Fleet {...fleetProps} />
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        loadFleet()
        setRefreshing(false)
    }, [refreshing])

    const sendFleet = (content: string, mediaList?: Media[]) => {
        addFleet({ content: content, mediaList: mediaList })
            .then(res => {
                if (res.success) {
                    successToast('已发送推文')
                } else {
                    errorToast(res.msg || '推文发送失败')
                }
                setShowModal(false)
                loadFleet()
            })
            .catch(e => {
                errorToast(e.message || '推文发送失败')
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={fleetList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => renderFleet(item)}
                initialNumToRender={10}
                ItemSeparatorComponent={separator}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
            <TouchableOpacity
                onPress={() => {
                    setShowModal(true)
                }}
            >
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
        bottom: 10,
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
