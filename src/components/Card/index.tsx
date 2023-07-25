import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';

export type CardProps = {
  id: string;
  name: string;
  keyPix: string;
  bank: string;
}
type Props = {
  data: CardProps;
  onPress: () => void;
}

export function Card({ data, onPress }: Props) {
  /*const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  function togglePasswordIsVisible() {
    setPasswordIsVisible(prevState => !prevState);
  }*/

  return (
    <View style={styles.container}>
      

      <View style={styles.content}>
        <View>
          <Text style={styles.title}>
            {data.name}
          </Text>
          <Text style={styles.title}>
            {data.keyPix}
          </Text>
          <Text style={styles.title}>
            {data.bank}
          </Text>

          
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <MaterialIcons
          name="delete"
          size={22}
          color="#888D97"
        />
      </TouchableOpacity>
    </View>
  );
}