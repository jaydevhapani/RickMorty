import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../assests/colors';
import Loader from '../components/Loader';
import ErrorBox from '../components/ErrorBox';
import {MemorizedTheCharacters} from '../components/MemorizedTheCharacters';
import {fontPixel, pixelSizeVertical} from '../constant';
import navigationService from '../navigationController/navigationService';
import {useCharacterQuery} from '../tankQuaryApiService/query';

interface _DashBoardProps {
  navigation: any;
}

export default function DashBoard(props: _DashBoardProps) {
  //we can increase the currentPage
  const [currentPage, setCurrentPage] = useState<number>(1);

  //navigation set on Top Level First
  useEffect(() => {
    navigationService.setTopLevelNavigator(props.navigation);
  }, []);

  //using TankStack query  we can represent the pagination anf fetchApi. it will working with cache module
  const {isError, isLoading, data, isFetching, fetchNextPage} =
    useCharacterQuery(currentPage);
    
  //OnFirstLoading
  if (isLoading) {
    return <Loader />;
  }

  //isError == true
  if (isError) {
    return (
      <ErrorBox
        errorText={
          'Something went wrong please try again! or check your network'
        }
        onPress={() => setCurrentPage(1)}
      />
    );
  }

  //Handle pagination logic: load next page when reaching the end
  const handleLoadMore = () => {
    if (data && data.pages[0].info.count > currentPage) {
      setCurrentPage(currentPage + 1);
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar
        backgroundColor={colors.DashBoardBackGround}
        barStyle={'light-content'}
      />
      <View style={styles.Container}>
        {/* HeaderName of The Screen */}
        <Text style={styles.HeaderName}>The Rick and Morty Lists</Text>
        <FlatList
          // Fetch Result from page and remove duplicate data FlapMap is reduce the back process
          data={data?.pages
            .flatMap(page => page.results)
            .filter((item, index, self) =>
              self.findIndex((sItem: any) => item.id == sItem.id) === index,
            )}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          style={{alignSelf: 'center'}}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5} // Load next page when 50% of list is visible
          renderItem={({item, index}) => (
            <MemorizedTheCharacters values={item} />
          )}
          ListFooterComponent={() => {
            return (
              isFetching && (
                <View style={{alignSelf: 'center', margin: 10}}>
                  <ActivityIndicator size={'large'} color={colors.White} />
                </View>
              )
            );
          }}
        />
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
});
