import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { styles } from './styles';
import { KeyboardAvoidingView, Platform, ScrollView, View, Text } from 'react-native';
import { DetailNavigationProps } from '../../@types/navigation';
import { HeaderDetail } from '../../components/HeaderDetail';
export function Detail(){
    const route:RouteProp<{params: {id: string}}, 'params'> = useRoute()

    return(
        <View style={styles.container}>
            <HeaderDetail keyPix={route.params.id}/>
            <Text>{}</Text>

        </View>
    )
}