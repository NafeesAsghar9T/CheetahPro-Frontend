import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, ScrollView, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Container, Loader, Provider, Service} from '@App/components';
import colors from '@App/constants/colors';
import {useAppSelector} from '@App/hooks';
import {userHomeServices} from '@App/utilis/APIs';
import {_getToken} from '@App/utilis/notificationHelper';
import {IMainService, IProvider} from '@App/utilis/types';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';

export default function UserHomeScreen() {
  const {user} = useAppSelector(({USER}) => USER);
  const {mainServices} = useAppSelector(({APPSTATE}) => APPSTATE);

  const [popularServices, setPopularServices] = useState<IMainService[]>([]);
  const [recommendedServices, setRecommendedServices] = useState<IProvider[]>(
    [],
  );
  const [loader, setLoader] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _getToken();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  
  useEffect(() => {
    _getToken();
  }, []);

  useEffect(() => {
    _userHomeServices();
  }, []);

  const _userHomeServices = async () => {
    try {
      setLoader(true);
      const res = await userHomeServices();
      setLoader(false);
      if (res && res.status === 'success') {
        setPopularServices(res.popular_services);
        setRecommendedServices(res.recommended_services);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <Container>
      {loader && <Loader loader={loader} />}
      <ScrollView>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome}>Welcome, {user?.first_name}!</Text>
          <Text style={styles.today}>what type of service are you looking for??</Text>
        </View>
        <Pressable
            onPress={() => navigation.navigate('SearchProviders')}
            style={{
            borderWidth: 1,
            borderColor: colors.black,
            width: '92%',
            alignSelf: 'center',
            height: 45,
            borderRadius: 5,
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
            marginBottom: 20,
          }}>
          <Text style={[styles.today, {color: colors.lightGrey}]}>
            Search zip code
          </Text>
          <AntDesign name="search1" size={25} color={colors.black} />
        </Pressable>

        <FlatList
          contentContainerStyle={{
            marginLeft: 5,
          }}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          data={mainServices}
          renderItem={({item}) => (
            <Service
              id={item.id}
              cat
              title={item.title}
              icon={item.icon}
              height={1} // to remove type script error
              width={1} // to remove type script error
            />
          )}
          keyExtractor={(_, index) => `${index}`}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 25,
          }}>
          <Text style={styles.heading}>Popular Services</Text>
          <Text
            onPress={() => navigation.navigate('PopularServices')}
            style={styles.all}>
            See all
          </Text>
        </View>
        <FlatList
          contentContainerStyle={{
            paddingRight: 15,
            height: 150,
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={popularServices}
          renderItem={({item}) => (
            <Service
              isPopular
              id={item.id}
              title={item.title}
              image={item.image}
              height={130}
              width={170}
              bg_color={item.bg_color}
            />
          )}
          keyExtractor={(_, index) => `${index}`}
        />

        <View>
          <Text style={[styles.heading, {marginTop: 15}]}>
            Recommended Services
          </Text>
          <FlatList
            contentContainerStyle={{paddingRight: 15}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={recommendedServices}
            renderItem={({item}) => (
              <Provider
                isHome
                user_id={item.user_id}
                name={item.name}
                about={item.about}
                charges={item.charges}
                rate={item.rate}
                image={item.image}
                main_service={item.main_service}
                order_count={item.order_count}
              />
            )}
            keyExtractor={(_, index) => `provider-${index}`}
          />
        </View>
      </ScrollView>
    </Container>
  );
}
