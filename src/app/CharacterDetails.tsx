import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../assests/colors';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '../constant';
import images from '../assests/images';
import navigationService from '../navigationController/navigationService';

interface _CharacterDetails {
  route?: {params?: {data: any}};
}

export default function CharacterDetails(props: _CharacterDetails) {
  const [characterDetails, setcharacterDetails] = useState(
    props.route?.params?.data,
  );

  return (
    <SafeAreaView style={styles.Container}>
      <Pressable onPress={() => navigationService.goBack()}>
        <Image source={images.back} style={styles.BackImage} />
      </Pressable>
      <View
        style={[
          styles.Container,
          {
            paddingHorizontal: pixelSizeHorizontal(10),
            paddingVertical: pixelSizeVertical(10),
          },
        ]}>
        <View style={styles.ImageView}>
          <Image
            style={styles.ImageView}
            source={{uri: characterDetails.image}}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.DetailsView}>
          <View style={styles.CharacterNameView}>
            <Text style={styles.Header}>Name:</Text>
            <Text style={styles.CharacterName} numberOfLines={2}>
              {characterDetails.name}
            </Text>
          </View>
          <View style={styles.CharacterNameView}>
            <Text style={styles.Header}>Gender:</Text>
            <Text style={styles.CharacterName} numberOfLines={2}>
              {characterDetails.gender}
            </Text>
          </View>
          <View style={[styles.DeadLiveView]}>
            <Text style={styles.Header}>Status:</Text>
            <View style={{flexDirection: 'row'}}>
              <View
                style={[
                  styles.liveAndDeadIcon,
                  characterDetails.status == 'Dead' && {
                    backgroundColor: colors.Red,
                  },
                  characterDetails.status == 'Alive' && {
                    backgroundColor: colors.Green,
                  },
                  characterDetails.status == 'unknown' && {
                    backgroundColor: colors.Gray,
                  },
                ]}
              />
              <Text style={styles.CharacterAliveStatus}>
                {characterDetails.status}-{characterDetails.species}
              </Text>
            </View>
          </View>
          <View style={styles.CharacterNameView}>
            <Text style={styles.Header}>Location:</Text>
            <Text style={styles.CharacterName} numberOfLines={2}>
              {characterDetails.location.name}
            </Text>
          </View>
          <View style={styles.CharacterNameView}>
            <Text style={styles.Header}>Origin:</Text>
            <Text style={styles.CharacterName} numberOfLines={2}>
              {characterDetails.origin.name}
            </Text>
          </View>
          <View style={styles.CharacterNameView}>
            <Text style={styles.Header}>Dimension:</Text>
            <Text style={styles.CharacterName} numberOfLines={2}>
              {characterDetails.nameOfDimension}
            </Text>
          </View>
          <View style={styles.CharacterNameView}>
            <Text style={styles.Header}>Residents:</Text>
            <Text style={styles.CharacterName} numberOfLines={2}>
              {characterDetails.residents}
            </Text>
          </View>
          <View style={styles.CharacterNameView}>
            <Text style={styles.Header}>Type:</Text>
            <Text style={styles.CharacterName} numberOfLines={2}>
              {characterDetails.origin.type
                ? characterDetails.origin.type
                : 'Not Available'}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.DashBoardBackGround,
  },
  HeaderName: {
    fontSize: fontPixel(24),
    alignSelf: 'center',
    color: colors.White,
    marginVertical: pixelSizeVertical(20),
  },
  ImageView: {
    height: heightPixel(300),
    borderRadius: heightPixel(20),
  },
  DetailsView: {
    paddingVertical: pixelSizeVertical(10),
    paddingHorizontal: pixelSizeHorizontal(10),
    backgroundColor: colors.CardBackGround,
    marginTop: pixelSizeVertical(10),
    borderRadius: heightPixel(10),
  },
  CharacterName: {
    fontSize: fontPixel(12),
    color: colors.White,
  },
  CharacterNameView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Header: {
    fontSize: fontPixel(12),
    color: colors.Gray1,
    marginRight: pixelSizeHorizontal(4),
    alignSelf: 'flex-start',
    width: widthPixel(64),
  },
  DeadLiveView: {
    flexDirection: 'row',
  },
  liveAndDeadIcon: {
    height: heightPixel(10),
    width: heightPixel(10),
    borderRadius: heightPixel(20),
    marginRight: pixelSizeVertical(2),
    marginTop: pixelSizeVertical(3.5),
  },
  CharacterAliveStatus: {
    fontSize: fontPixel(12),
    color: colors.White,
    width: widthPixel(106),
    alignSelf: 'flex-start',
  },
  BackImage: {
    height: heightPixel(26),
    width: heightPixel(26),
    marginLeft: pixelSizeHorizontal(10),
    tintColor: colors.White,
  },
});
