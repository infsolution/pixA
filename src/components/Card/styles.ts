import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 130,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E3E3E3',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 8,
    borderRadius: 20
  },
  content: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    lineHeight: 18,
    color: '#888D97',
  },
  pix: {
    color: '#1967FB',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5
  },
  bank: {
    color: '#888D97',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    height: 80,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#E3E3E3',
  }
});
