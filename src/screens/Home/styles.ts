import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F3F5',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3D434D'
  },
  listHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  listCount: {
    color: '#888D97',
    fontSize: 13
  },
  list: {
    flex: 1,
    width: '100%'
  },
  listContent: {
    padding: 24,
    paddingBottom: 150
  },
  footer: {
    width: '100%',
    padding: 24,
    marginBottom: getBottomSpace()
  },
  description:{
    marginTop:5,
    marginBottom:5,
    fontSize: 14,
    color: '#3D434D',
    fontWeight: 'bold'
  },
  containerInput:{
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 24
  },
  input:{
    height: 56,
    width: '100%',
    borderColor: '#E3E3E3',
    borderWidth: 1,
    paddingLeft: 22,
    borderRadius: 25,
    backgroundColor: '#fff'
  }
});
