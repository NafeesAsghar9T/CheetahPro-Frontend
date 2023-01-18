import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Container } from '@App/components';
import colors from '@App/constants/colors';
import fonts from '@App/constants/fonts';

export default function AboutUsScreen() {
  return (
    <Container style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
        {/* <Text style={styles.question}>Why Cheetah Pro</Text> */}
        <View style={styles.card}>
          <Text style={styles.text}>
            For the past 10 years, we have helped businesses create their professional presence and achieve their goals. Our process is designed to empower local businesses get hired and help locals hire the most trusted professionals in their neighborhood.{"\n"}{'\n'}

            Find your next Pro and let us take care of the rest.
            {"\n"}{"\n"}
            These service providers  aka “Cheetah Pros” contribute to your health, your family, and your local community. The people you trust to service your driving, personal shopping, pet and yard needs.{"\n"}{"\n"}

            We give the Cheetah Pros the tools you need to start, run, and grow your own business, clearing the path to pursue a business that fits their lifestyle.{"\n"}{"\n"}

            A single, relentless question put us on the path that led to building Cheetah....{"\n"}{"\n"}

            What can we do to help more people gain greater control, autonomy, and flexibility over the way they work{"\n"}{"\n"}

            When we set out to find an answer, we didn’t know we’d eventually be taking on the gig economy and marketplace community. But that’s where the question led - directly to the thousands of independent contractors who felt underpaid, exploited, and taken for granted by on-demand service apps. We realized that the only thing standing between these workers and the ability to start their own personal businesses and  companies was access to the right technology. So we built it for them.{"\n"}{"\n"}

            Now instead of a relentless question, we have a clear mission: To make small business ownership available to anyone who wants it. We’re proud to build the tools that empower anyone to start, run, and grow their own local, service-based business. Several small businesses already use Cheetah to serve their communities, providing a higher caliber of service to clients and keeping local dollars in local economies. And every single one of those small business owners has greater control, autonomy, and flexibility over the way they work today.{"\n"}{"\n"}           
            We are excited to change the community one Cheetah at a time.
          </Text>
        </View>
        {/* <Image
          resizeMode="contain"
          style={styles.img}
          source={require('@App/images/logo.png')}
        /> */}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  question: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fonts.Medium,
    marginTop: 30,
    marginBottom: 10,
  },
  card: {
    marginHorizontal: 2,
  },
  text: {
    color: colors.black,
    fontSize: 15,
  marginTop:15,
    fontFamily: fonts.Regular,
  },
  img: {
    width: '100%',
    height: 280,
    marginTop: 50,
  },
});
