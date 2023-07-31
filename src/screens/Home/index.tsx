import { useCallback, useState, useEffect } from 'react';
import { FlatList, Text, View, TextInput } from 'react-native';

import { Card, CardProps } from '../../components/Card';
import { HeaderHome } from '../../components/HeaderHome';
import { useFocusEffect } from '@react-navigation/native';

import { styles } from './styles';
import { Button } from '../../components/Button';
import Toast from 'react-native-toast-message';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/Input';

export function Home() {
  const [data, setData] = useState<CardProps[]>([]);
  const [term, setTerm] = useState("");
  const {getItem, setItem} = useAsyncStorage("@pixa:keyspix")
  const navigation = useNavigation();
  async function handleFeth () {
    const response = await getItem() 
    const data = response?JSON.parse(response):[]
    setData(data)
  }

  async function handleRemove(id:string) {
    const response = await getItem()
    const previousData = response?JSON.parse(response):[]
    const data = previousData.filter((item:CardProps)=>item.id !== id)
    setItem(JSON.stringify(data))
    setData(data)
  }

  async function search(term:string){
    const response = await getItem()
    const previousData = response?JSON.parse(response):[]
    const data = previousData.filter((item:CardProps)=>filter(item, term))
    setData(data)
  }

  function filter(item:CardProps, term:string){
    return item.id == term || item.name == term
  }

  function handleShow(item: CardProps){
    navigation.navigate('Detail', {id:item.id});
  }

  async function handleCopy(keyPix:string) {

    await Clipboard.setStringAsync(keyPix);
    Toast.show({
      type:"success",
      text1:"Chave copiada com sucesso!"
     })
  }


  useFocusEffect(useCallback(()=>{
    handleFeth()
  },[]))

  return (
    <View style={styles.container}>
      <HeaderHome />
      <View style={styles.containerInput}>
        <TextInput 
        style={styles.input} 
        placeholder='Procura uma chave especial?'
        onChange={()=>search(term)}
        />
      </View>

      
      <View style={styles.listHeader}>
        <Text style={styles.title}>
          Chaves guardadas
        </Text>
        <Text style={styles.listCount}>
          {`${data.length} ao total`}
        </Text>
      </View>
      <View >
        <Text style={styles.description}>
          Toque na chave para editar ou excluir
        </Text>
      </View>
     

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) =>
          <Card
            data={item}
            onPress={() => handleCopy(item.keyPix)}
            show = {()=>handleShow(item)}
          />
        }
      />

  
    </View>
  );
}