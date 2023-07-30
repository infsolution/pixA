import React from "react";
import { Text, View, TouchableOpacity, Share } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from "./styles";
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

type key = {
    keyPix:string;
}
export function HeaderDetail({keyPix}: key){
    const {getItem, setItem} = useAsyncStorage("@pixa:userdata")
    const [user, setUser] = useState({id:"", name:""});

    async function getUser(){
        const response = await getItem()
        const data = response?JSON.parse(response):null
        setUser(data) 
      }

      async function handleShare(key: string){
        const result = await Share.share({
            message:"Olá! Estou compartilhando a chave pix "+key
        })
       }
    
      useEffect(function(){
        getUser()
      }, [])

    return(
        <View style={styles.container}>
            <View >
                <Text style={styles.title}>
                    Compartilhar chave.
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