import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import { styles } from './styles';
import { useEffect, useState } from 'react';

export function HeaderHome() {
  const navigation = useNavigation();
  const {getItem, setItem} = useAsyncStorage("@pixa:userdata")
  const [user, setUser] = useState({id:"", name:""});

  function handleAdd() {
    navigation.navigate("Form", {});
  }

  async function getUser(){
    const response = await getItem()
    const data = response?JSON.parse(response):null
    setUser(data) 
  }

  useEffect(function(){
    getUser()
  }, [])

  return (
    <View style={styles.container}>

      <View style={styles.user}>
        <Text style={styles.title}>
          Olá, {user && user.name}
        </Text>
        <Text style={styles.subtitle}>
          Guarde todas suas chaves aqui.
        </Text>
      </View>


      <TouchableOpacity
        onPress={handleAdd}
        style={styles.button}
      >
        <MaterialIcons
          name="add"
          size={22}
          color="#FFF"
        />
      </TouchableOpacity>
    </View>
  );
}