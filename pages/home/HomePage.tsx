import { Ionicons } from '@expo/vector-icons'
import React, { useCallback, useState } from 'react'
import {
    FlatList,
    Modal,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'
import Toast from 'react-native-root-toast'
import { colors } from '../../styles/colors'
import { Fleet } from './components/Fleet'
import { Twitter } from './components/Twitter'
import { FleetProps } from './components/types'
export const HomePage = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [showTwitter, setShotTwitter] = useState(false)
    const [fleetList, setFleetList] = useState<FleetProps[]>([
        {
            id: '1',
            nickname: 'Amazon Web Services',
            username: '@awscloud',
            avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            content:
                'AWS Power businesses in Singapore, to reach more audiences, gain more opportunities for growth, and offer more security. Do more with AWS.',
            likes: 202,
            comments: 9,
            retweet: 21,
            mediaList: [
                {
                    id: '1',
                    type: 'image',
                    source: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                }
            ]
        },
        {
            id: '2',
            nickname: 'Momo Kawaii',
            username: '@kawaii',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            content: 'Miss me?',
            likes: 10,
            comments: 66,
            retweet: 77
        },
        {
            id: '3',
            nickname: '神之勇域',
            username: '@yyds',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            content: '我好羡慕勇哥啊',
            likes: 888,
            comments: 999,
            retweet: 30
        }
    ])

    const separator = () => {
        return <View style={styles.separator} />
    }

    const renderFleet = (fleetProps: any) => {
        return <Fleet {...fleetProps} />
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }, [refreshing])

    const sendFleet = () => {
        setShotTwitter(false)
        setTimeout(() => {
            Toast.show('发送成功', {
                position: Toast.positions.CENTER,
                animation: true
            })
        }, 1500)
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
                    setShotTwitter(true)
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
                visible={showTwitter}
                animationType='slide'
            >
                <Twitter
                    close={() => {
                        setShotTwitter(false)
                    }}
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
