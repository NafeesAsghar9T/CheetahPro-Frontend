import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Card, Container} from '@App/components';
import colors from '@App/constants/colors';
import {useNavigation} from '@react-navigation/native';

export default function HelpCenterScreen() {
  const navigation = useNavigation();
  return (
    <Container>
      <View style={styles.content}>
        <Card>
          <Text
            onPress={() =>
              navigation.navigate('HelpCenterDetails', {
                question: 'Why Choose Cheetah Pro service?',
              })
            }
            style={styles.text}>
            Why Choose Cheetah Pro service?
          </Text>
        </Card>
        <Card>
          <Text
            onPress={() =>
              navigation.navigate('HelpCenterDetails', {
                question: 'Why Placing order is essential and beneficial?',
              })
            }
            style={styles.text}>
            Why Placing order is essential and beneficial?
          </Text>
        </Card>
        <Card>
          <Text
            onPress={() =>
              navigation.navigate('HelpCenterDetails', {
                question:
                  'How dissatisfied will you be if we shut down our service?',
              })
            }
            style={styles.text}>
            How dissatisfied will you be if we shut down our service?
          </Text>
        </Card>
        <Card>
          <Text
            onPress={() =>
              navigation.navigate('HelpCenterDetails', {
                question: `Are you willing to enthusiastically recommend us to a prospect today? If not, where must you see change this wheek?`,
              })
            }
            style={styles.text}>
            Are you willing to enthusiastically recommend us to a prospect
            today? If not, where must you see change this wheek?
          </Text>
        </Card>
        <Card>
          <Text
            onPress={() =>
              navigation.navigate('HelpCenterDetails', {
                question: `Are you willing to enthusiastically recommend us to a prospect today? If not, where must you see change this wheek?`,
              })
            }
            style={styles.text}>
            Are you willing to enthusiastically recommend us to a prospect
            today? If not, where must you see change this wheek?
          </Text>
        </Card>
        <Card>
          <Text
            onPress={() =>
              navigation.navigate('HelpCenterDetails', {
                question: `What part of the service makes you happy?`,
              })
            }
            style={styles.text}>
            What part of the service makes you happy?
          </Text>
        </Card>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    marginVertical: 30,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    padding: 5,
    fontFamily: 'Segoe UI',
  },
});
