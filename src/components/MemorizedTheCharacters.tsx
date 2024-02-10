import {
  Image,
  ImageURISource,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '../constant';
import colors from '../assests/colors';
import navigationService from '../navigationController/navigationService';
import screenName from '../navigationController/screenName';
import {useFetchCharacterData} from '../tankQuaryApiService/query';

interface _ItemData {
  values: {
    created: string;
    episode: any[];
    gender: string;
    id: number;
    image: string;
    location: any;
    name: string;
    origin: any;
    species: string;
    status: string;
    type: string;
    url: string;
  };
}

export const MemorizedTheCharacters = React.memo((item: _ItemData) => {
  //using Tank Mutation query  we can represent the pagination anf fetchApi. it will working with cache module
  const fetchResidents = useFetchCharacterData();
  
  const [Residents, setResidents] = useState({
    nameOfDimension: 'Not Found',
    residents: 0,
  });

  //GetLastNumberOrUrl
  useEffect(() => {
    if (item.values.location.url) {
      const url: string = item.values.location.url; // Replace with your dynamic URL
      const match = url.match(/\/(\d+)$/);
      if (match) {
        const lastNumbers: number = parseInt(match[1], 10);
        fetchResidents.mutate(lastNumbers);
      } else {
        console.error('Unable to extract last numbers from the URL');
      }
    }
  }, []);

  //setAllTheResidents
  useMemo(() => {
    if (fetchResidents.data) {
      setResidents(prev => ({
        ...prev,
        nameOfDimension: fetchResidents.data.dimension,
        residents: fetchResidents.data.residents.length,
      }));
    }
  }, [fetchResidents.data]);

  return (
    <Pressable
      style={styles.Box}
      onPress={() =>
        navigationService.navigate(screenName.CharacterDetails, {
          data: {
            ...item.values,
            nameOfDimension: Residents.nameOfDimension,
            residents: Residents.residents,
          },
        })
      }>
      <View style={styles.ImageRenderView}>
        <Image
          style={styles.ImageRenderView}
          resizeMode="cover"
          source={{uri: item.values.image}}
        />
      </View>
      <View
        style={{
          marginVertical: pixelSizeVertical(10),
          paddingHorizontal: pixelSizeHorizontal(6),
        }}>
        <View style={styles.CharacterNameView}>
          <Text style={styles.Header}>Name:</Text>
          <Text style={styles.CharacterName} numberOfLines={2}>
            {item.values.name}
          </Text>
        </View>
        <View style={styles.CharacterNameView}>
          <Text style={styles.Header}>Gender:</Text>
          <Text style={styles.CharacterName} numberOfLines={2}>
            {item.values.gender}
          </Text>
        </View>

        <View style={[styles.DeadLiveView]}>
          <Text style={styles.Header}>Status:</Text>
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                styles.liveAndDeadIcon,
                item.values.status == 'Dead' && {
                  backgroundColor: colors.Red,
                },
                item.values.status == 'Alive' && {
                  backgroundColor: colors.Green,
                },
                item.values.status == 'unknown' && {
                  backgroundColor: colors.Gray,
                },
              ]}
            />
            <Text style={styles.CharacterAliveStatus}>
              {item.values.status}-{item.values.species}
            </Text>
          </View>
        </View>
        <View style={styles.CharacterNameView}>
          <Text style={styles.Header}>Location:</Text>
          <Text style={styles.CharacterName} numberOfLines={2}>
            {item.values.location.name}
          </Text>
        </View>
        <View style={styles.CharacterNameView}>
          <Text style={styles.Header}>Origin:</Text>
          <Text style={styles.CharacterName} numberOfLines={2}>
            {item.values.origin.name}
          </Text>
        </View>
        <View style={styles.CharacterNameView}>
          <Text style={styles.Header}>Dimension:</Text>
          <Text style={styles.CharacterName} numberOfLines={2}>
            {Residents.nameOfDimension}
          </Text>
        </View>
        <View style={styles.CharacterNameView}>
          <Text style={styles.Header}>Residents:</Text>
          <Text style={styles.CharacterName} numberOfLines={2}>
            {Residents.residents}
          </Text>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  Box: {
    // height: heightPixel(100),
    width: widthPixel(170),
    borderRadius: heightPixel(20),
    backgroundColor: colors.CardBackGround,
    marginHorizontal: pixelSizeHorizontal(4),
    marginVertical: pixelSizeVertical(4),
  },
  ImageRenderView: {
    height: heightPixel(140),
    borderTopLeftRadius: heightPixel(20),
    borderTopRightRadius: heightPixel(20),
    width: widthPixel(170),
  },
  CharacterName: {
    fontSize: fontPixel(12),
    color: colors.White,
    width: widthPixel(106),
  },
  CharacterNameView: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: widthPixel(98),
    alignSelf: 'flex-start',
  },
  Header: {
    fontSize: fontPixel(12),
    color: colors.Gray1,
    marginRight: pixelSizeHorizontal(4),
    alignSelf: 'flex-start',
    width: widthPixel(60),
  },
});
