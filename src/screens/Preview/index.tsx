import { useCallback, useState, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import { Image } from 'expo-image';


import { styles } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import * as SplashScreen from 'expo-splash-screen';

//SplashScreen.preventAutoHideAsync();

export function Preview(){

    const {getItem, setItem} = useAsyncStorage("@pixa:userdata")
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [loaded, setLoaded] = useState(false)

    async function getUser(){
        try {
            const response = await getItem()
            const data = response?JSON.parse(response):null
            if(data){
                navigation.navigate("Home");
            }else{
                setLoaded(true);
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function addUser() {
        const id = uuid.v4();
        const data = {
        id,
        name
        }
        try {
            if(name == ''){
                Toast.show({
                    type:"error",
                    text1:"Não entendi seu nome, por favor diga novamente!"
                   })    
            }else{
                await setItem(JSON.stringify(data))
                Toast.show({
                    type:"success",
                    text1:"Nome adicionado com sucesso!"
                })
                navigation.navigate("Home");
            }
        } catch (error) {
            Toast.show({
                type:"error",
                text1:"Não conseguimos decorar seu nome, por favor tente novamente!"
               })
        }
    }

    useEffect(function(){
        setTimeout(()=>getUser(), 5000)
    },[]);

    return(
        <View style={styles.container}>
             {loaded && <View style={styles.content}>
                <View style={styles.form}>
                    <Input 
                    label= "Qual seu nome?"
                    onChangeText={setName}
                    />
                </View>
                <View style={styles.footer}>
                    <Button
                    title="Lembrar"
                    onPress={addUser}
                    />
                </View>
            </View>}
            {!loaded &&

            <Image 
                style={styles.image}
                source="https://picsum.photos/seed/696/3000/2000"
                placeholder={"imageb"}
                contentFit="cover"
                transition={1000}
            />

            }
        </View>
        
    )
}