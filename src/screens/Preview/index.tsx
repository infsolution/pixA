import { useCallback, useState, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';


import { styles } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
export function Preview(){

    const {getItem, setItem} = useAsyncStorage("@pixa:userdata")
    const navigation = useNavigation();
    const [name, setName] = useState("");

    async function getUser(){
        const response = await getItem()
        const data = response?JSON.parse(response):null
        if(data){
            navigation.navigate("Home");
        }
    }

    async function addUser() {
        const id = uuid.v4();
        const data = {
        id,
        name
        }
        try {
            await setItem(JSON.stringify(data))
            Toast.show({
                type:"success",
                text1:"Nome adicionado com sucesso!"
            })
            navigation.navigate("Home");
        } catch (error) {
            Toast.show({
                type:"error",
                text1:"Não conseguimos decorar seu nome, por favor tente novamente!"
               })
        }
    }

    useEffect(function(){
        getUser()
    },[]);

    return(
        <View style={styles.content}>
             <View style={styles.form}>
             <Input
              label="Nome"
              onChangeText={setName}
            />
             </View>
             <View style={styles.footer}>
            <Button
              title="Salvar"
              onPress={addUser}
            />
          </View>
        </View>
        
    )
}