import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import colors from '../assests/colors';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '../constant';
import { Callback } from '@react-native-async-storage/async-storage/lib/typescript/types';

//Interface
interface Props {
  errorText: string;
  onPress: Callback
}

export default function ErrorBox(props: Props) {
  return (
    <View style={styles.Container}>
      <Text style={styles.errorTextStyle}>{props.errorText}</Text>
      <Pressable style={styles.ButtonBox} onPress={() => props.onPress()}>
        <Text>ReFetch</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.White,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorTextStyle: {
    fontSize: fontPixel(12),
    textAlign  :'center',
    width : widthPixel(300),
    color: colors.Black,
    letterSpacing: 0.4,
  },
  ButtonBox: {
    height: heightPixel(40),
    width: widthPixel(100),
    borderRadius: heightPixel(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.BlackMirror,
    marginTop: pixelSizeVertical(10),
  },
});
