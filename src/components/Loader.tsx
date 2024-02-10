import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../assests/colors'

export default function Loader() {
  return (
    <View style={styles.Container}>
      <ActivityIndicator size={'large'} color={colors.Black}/>
    </View>
  )
}

const styles = StyleSheet.create({
    Container : {
     flex : 1,
     backgroundColor : colors.BlackMirror,
     alignItems  :'center',
     justifyContent  :'center'
    }
})