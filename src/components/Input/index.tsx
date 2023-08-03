import { Text, TextInput, TextInputProps, View } from 'react-native';

import { styles } from './styles';

type Props = TextInputProps & {
  label: string;
  errorMessage?: string | null ;
}

export function Input({ label, errorMessage = null, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput style={styles.input} {...rest} />

      {errorMessage && <Text style={styles.error}>
        {errorMessage}
      </Text>}  
    </View>
  );
}