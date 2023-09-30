import React, {useState, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { styles } from './styles';
import { KeyboardAvoidingView, Platform, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { DetailNavigationProps } from '../../@types/navigation';
import { HeaderDetail } from '../../components/HeaderDetail';
import { Card, CardProps } from '../../components/Card';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export function Detail(){
    const [data, setData] = useState<CardProps[]>([]);
    const [itemKey, setItemKey] = useState<CardProps>({id: '', name: '', keyPix:'', bank:''});
    const {getItem, setItem} = useAsyncStorage("@pixa:keyspix")
    const route:RouteProp<{params: {id: string}}, 'params'> = useRoute()
    const navigation = useNavigation();

    async function  getData() {
        const response = await getItem()
        const previousData = response?JSON.parse(response):[]
        setData(previousData)
        const itemKey = previousData.filter((item:CardProps)=>item.id == route.params.id)
        setItemKey(itemKey[0])
    }

    function handleEdit(id?:string){
        navigation.navigate('Form', {id:id});
    }
    async function handleDelete(id?:string) {
        Alert.alert('Opa!',  'Apagar a chave não tem volta...',[
            {text: "Melhor não.",
            onPress: () => null,
            style: "cancel"},
            {text: "Pode apagar!", onPress: () =>deleteKey(id)}
        ])
      }

      async function deleteKey(id?:string) {
        const response = await getItem()
        const previousData = response?JSON.parse(response):[]
        const data = previousData.filter((item:CardProps)=>item.id !== id)
        setItem(JSON.stringify(data))
        Toast.show({
            type:"success",
            text1:"Chave excluída com sucesso!"
           })
        navigation.goBack()
      }

    useFocusEffect(useCallback(()=>{
        getData()
      },[]))


    return(
        <View style={styles.container}>
            <HeaderDetail keyPix={itemKey?.keyPix} name={itemKey?.name}/>
            <Text style={styles.title}>Chave de {itemKey?.name} no {itemKey?.bank}</Text>
            <View style={styles.content}>
                <Text style={styles.text}>Nome: {itemKey?.name}</Text>
                <Text style={styles.text}>PIX: {itemKey?.keyPix}</Text>
                <Text style={styles.text}>Banco: {itemKey?.bank}</Text>

            </View>
            <View style={styles.btnGroup}>
                <TouchableOpacity  
                style={styles.btnEdit}
                onPress={()=>handleEdit(itemKey?.id)}
                >
                    <Text style={{color:'#FFF'}}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.btnDelete}
                onPress={()=>handleDelete(itemKey?.id)}
                >
                    <Text style={{color:'#f3180a'}}>Excluir</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}