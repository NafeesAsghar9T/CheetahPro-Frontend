import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import StarRating from 'react-native-star-rating';

import {
  Button,
  Container,
  Loader,
  NeomorphismElement,
  NeomorphBox,
} from '@App/components';
import colors from '@App/constants/colors';
import fonts from '@App/constants/fonts';
import {Form, offset} from '@App/utilis';
import {addReview} from '@App/utilis/APIs';
import globalStyles from '@App/utilis/globalStyles';
import {RootStackParamList} from '@App/utilis/types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import styles from './styles';

type RatingRouteProp = RouteProp<RootStackParamList, 'Rating'>;

export default function RatingScreen() {
  const route = useRoute<RatingRouteProp>();
  const {provider,bookingId, main_service_name} = route.params;

  console.log("prociderrrr",bookingId)

  const [starCount, setStarCount] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [feedbackErr, setFeedbackErr] = useState(false);
  const [loader, setLoader] = useState(false);


  const navigation = useNavigation();
  const {width} = useWindowDimensions();

  const onStarRatingPress = (rating: number) => {
    setStarCount(rating);
  };

  const _addReview = async () => {
    if (_validate()) {
      try {
        setLoader(true);
        const data = new FormData();
        data.append('rate', starCount);
        data.append('remark', feedback);
        data.append('rate_to', provider.id);
        data.append('booking_id',bookingId);
        // data.append('rate_to', order.provider_id);
        // data.append('order_id', order.id);
        // data.append('sub_service_id', '');
        const res = await addReview(data);
        setLoader(false);
        if (res && res.status === 'success') {
          navigation.navigate('UserHome');
        }
      } catch (error) {
        setLoader(false);
      }
    }
  };

  const _validate = () => {
    if (!feedback.trim()) {
      setFeedbackErr(true);
      return false;
    }
    return true;
  };

  return (
    <Container>
      {loader && <Loader loader={loader} />}
      <Form
        style={{flex: 1}}
        behavior="padding"
        keyboardVerticalOffset={offset.hundred}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.providerContainer}>
            {provider.image ?<Image
              style={styles.img}
              source={{uri:provider.image}}
            />: <Image
              style={styles.img}
              source={require('@App/images/provider.jpg')}
            />}
            <Text style={styles.name}>{provider.name}</Text>
            <Text style={styles.text}>{main_service_name}</Text>
          </View>
          <View style={styles.starsContainer}>
            <Text style={styles.heading}>Job Completed</Text>
            <Text
              style={[
                styles.heading,
                {fontFamily: fonts.Regular, fontSize: 16},
              ]}>
              Rating
            </Text>
            <View style={styles.stars}>
              <StarRating
                starSize={25}
                disabled={false}
                maxStars={5}
                rating={starCount}
                selectedStar={rating => onStarRatingPress(rating)}
                fullStarColor={colors.accent}
              />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <NeomorphBox
              style={{
                width: width / 1.1,
                height: 150,
                borderColor: feedbackErr ? colors.red : colors.white,
                borderWidth: feedbackErr ? 1 : 0,
              }}>
              <TextInput
                placeholder="Comment here..."
                placeholderTextColor={colors.grey}
                style={styles.textInput}
                value={feedback}
                onChangeText={text => {
                  setFeedback(text);
                  feedbackErr && setFeedbackErr(false);
                }}
                multiline
                numberOfLines={10}
                selectionColor={colors.black}
              />
            </NeomorphBox>
          </View>
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={_addReview} />
          </View>
        </ScrollView>
      </Form>
    </Container>
  );
}
