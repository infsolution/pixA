import React from "react";
import { Text, View, TouchableOpacity, Share } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from "./styles";
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

type key = {
    keyPix:string;
    name: string;
}
export function HeaderDetail({keyPix, name}: key){
    const {getItem, setItem} = useAsyncStorage("@pixa:userdata")
    const [user, setUser] = useState({id:"", name:""});
    const navigation = useNavigation();

    async function getUser(){
        const response = await getItem()
        const data = response?JSON.parse(response):null
        setUser(data) 
      }

      async function handleShare(key: string){
        const result = await Share.share({
            message:"Olá! Estou compartilhando a chave pix "+key+" de "+name+"\n\n Se vocẽ também quiser compartilhar chaves PIX facilmente, baixe o app pixA e seja feliz."
        })
       }
    
      useEffect(function(){
        getUser()
      }, [])

    return(
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <MaterialIcons
                name="chevron-left"
                size={32}
                color="#FFF"
                />
        </TouchableOpacity>
            <View >
                <Text style={styles.title}>
                    Compartilhar
                </Text>
                
            </View>
            <TouchableOpacity
                onPress={()=>handleShare(keyPix)}
                >
                    <MaterialIcons
                    name="share"
                    size={22}
                    color="#FFF"
                    />
                </TouchableOpacity>
        </View>
    )
}