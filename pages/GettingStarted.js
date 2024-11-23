import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import Slides from '../components/SlidesComponent'
import React from 'react'

export default function GettingStarted({navigation}) {

  return (
    <View>
        <Slides />
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btntxt}>Get Started</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        backgroundColor: '#6C87F6',
        width: 300,
        height: 50,
        borderRadius: 15,
        marginHorizontal: 50,
    },
    btntxt: {
        fontSize: 20,
        color: 'white',
    }
})
