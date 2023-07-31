import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Card, CardProps } from '../../components/Card';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { HeaderForm } from '../../components/HeaderForm';

export function Form() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("Guadar uma nova chave");
  const [keyPix, setKeyPix] = useState("");
  const [bank, setBank] = useState("");

  const [itemKey, setItemKey] = useState<CardProps>();
  const {setItem, getItem} = useAsyncStorage("@pixa:keyspix")
  const route:RouteProp<{params: {id: string}}, 'params'> = useRoute()

  async function handleAdd(){
    const id = uuid.v4();
    const keyData = {
      id,
      name,
      keyPix,
      bank
    }
    try {
      const response = await getItem()
      const previousData = response?JSON.parse(response):[]
      let data;

      if(route.params.id){
        const remove = previousData.filter((item:CardProps)=>item.id == route.params.id)
        const removed = previousData.filter((item:CardProps)=>item.id !== route.params.id)

        remove[0].name = name
        remove[0].keyPix = keyPix
        remove[0].bank = bank
        data = [...removed, remove[0]]
      }else{
        data = [...previousData, keyData]
      }

      await setItem(JSON.stringify(data))
      navigation.goBack();
      Toast.show({
       type:"success",
       text1:"Chave guardada com sucesso!"
      })
    } catch (error) {
      Toast.show({
        type:"error",
        text1:"Não conseguimos guardar a chave, tente novamente!"
       })
    }
  }

  async function getData(){
    const response = await getItem()
    const previousData = response?JSON.parse(response):[]
    const itemKey = previousData.filter((item:CardProps)=>item.id == route.params.id)
    const data = itemKey[0]
    if(data){
      setName(data.name)
      setKeyPix(data.keyPix)
      setBank(data.bank)
      setTitle("Editar Pix de "+data.name)
    }
    setItemKey(data)
  }

  useEffect(()=>{
    getData()
  },[])
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <ScrollView>

          <HeaderForm title={title}/>

          <View style={styles.form}>
            <Input
              label="Nome da pessoa"
              value={name}
              onChangeText={setName}
            />
            <Input
              label="Chave PIX"
              autoCapitalize="none"
              value={keyPix}
              onChangeText={setKeyPix}
            />
            <Input
              label="Banco"
              value={bank}
              onChangeText={setBank}
              //secureTextEntry
            />
          </View>

          <View style={styles.footer}>
            <Button
              title="Guardar"
              onPress={handleAdd}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView >
  );
}