import React, { useCallback, useState } from 'react'
import {
    FlatList, SafeAreaView,
    StyleSheet, View
} from 'react-native'
import { colors } from '../../styles/colors'
import { Fleet } from './components/Fleet'
export const HomePage = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [fleetList, setFleetList] = useState<any[]>([
        {
            id: 1,
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
        return <View style={{ width: '100%', height: 0.7, backgroundColor: colors.slate['300'] }} />
    }

    const renderFleet = (fleetProps: any) => {
        const { item } = fleetProps
        return <Fleet {...item} />
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }, [refreshing])

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
})