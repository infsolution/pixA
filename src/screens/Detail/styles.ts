import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#F2F3F5',

    },
    content:{
        marginTop: 36,
        alignItems: 'flex-start',
        marginLeft:26
    },
    title:{
        marginTop: 16,
        marginLeft:22,
        fontSize:18,
        fontWeight:'800'
    },
    text:{
        color: '#000000',
        marginTop:5,
        fontSize:20
    },
    btnGroup:{
        flex:1,
        flexDirection:'row',
        justifyContent:"space-around",
        marginTop:10
    },
    btnEdit:{
        backgroundColor: '#1967FB',
        height:56,
        width: '40%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        
    },
    btnDelete:{
        backgroundColor: '#F2F3F5',
        borderColor:'#f3180a',
        borderWidth:1,
        borderRadius:20,
        height:56,
        width: '40%',
        alignItems:'center',
        justifyContent:'center'
    }


})