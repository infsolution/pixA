import React, {useState} from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import { styles } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { HeaderForm } from '../../components/HeaderForm';

export function Form() {
  const [name, setName] = useState("");
  const [keyPix, setKeyPix] = useState("");
  const [bank, setBank] = useState("");

  const {setItem, getItem} = useAsyncStorage("@pixa:keyspix")

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

      const data = [...previousData, keyData]

      await setItem(JSON.stringify(data))
      Toast.show({
       type:"success",
       text1:"Chaave guardada com sucesso!"
      })
    } catch (error) {
      Toast.show({
        type:"error",
        text1:"Não conseguimos guardar a chave, tente novamente!"
       })
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <ScrollView>

          <HeaderForm />

          <View style={styles.form}>
            <Input
              label="Nome"
              onChangeText={setName}
            />
            <Input
              label="Chave PIX"
              autoCapitalize="none"
              onChangeText={setKeyPix}
            />
            <Input
              label="Banco"
              onChangeText={setBank}
              //secureTextEntry
            />
          </View>

          <View style={styles.footer}>
            <Button
              title="Salvar"
              onPress={handleAdd}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView >
  );
}