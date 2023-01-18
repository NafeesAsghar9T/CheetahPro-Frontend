import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';

import {Container, Loader, Transaction} from '@App/components';
import Colors from '@App/constants/colors';
import {useAppSelector} from '@App/hooks';
import profileImage from '@App/images/profile.png';
import {
  bankAccountsList,
  checkAccountBalance,
  withdrawAccountBalance,
} from '@App/utilis/APIs';
import {useNavigation} from '@react-navigation/core';

import styles from './styles';
import {isIOS} from '@App/utilis/platform';
import {Form} from '@App/utilis';

interface CardElementProps {
  item: {
    id?: null | number;
    account_holder_name?: string;
    last4?: string;
  };
  onSelectCard: () => void;
  onCardSelected: () => void;
  id: null | number;
}

const CardElement = (props: CardElementProps) => {
  return (
    <View style={styles.box}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View>
          {props.item.id == props.id ? (
            <Fontisto
              onPress={() => {
                props.onSelectCard();
              }}
              name="radio-btn-active"
              color={Colors.white}
              size={30}
            />
          ) : (
            <Fontisto
              onPress={() => {
                props.onCardSelected();
              }}
              name="radio-btn-passive"
              color={Colors.white}
              size={30}
            />
          )}
        </View>
        <View style={{marginLeft: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {props.item.account_holder_name ? (
              <Text style={styles.titleimg}>
                {props.item.account_holder_name}
              </Text>
            ) : (
              <Text style={styles.titleimg}>STRIPE TEST ACCOUNT HOLDER</Text>
            )}
          </View>
          <View>
            <Text style={[styles.num,{color:'white'}]}>xxxx xxxxx xxxxx {props.item.last4}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function MyWallet() {
  const {user} = useAppSelector(({USER}) => USER);

  const [currentBalance, setCurrentBalance] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);
  const [transactionList, setTransactionList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [amount, setAmount] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');
  const [showCards, setShowCards] = useState(false);
  const [accounts, setAccounts] = useState<CardElementProps[]>([]);
  const [account, setAccount] = useState<null | number>(null);

  const navigation = useNavigation();

  useEffect(() => {
    _checkAccountBalance();
    _bankAccountsList();
  }, []);

  const _withdrawAccountBalance = async () => {
    if (_validate()) {
      try {
        setModalVisible(false);
        setTimeout(() => {
          setLoader(true);
        }, 500);

        const data = new FormData();
        data.append('amount', parseInt(amount) * 100);
        data.append('bank_id', account);
        console.log("dataaa",data)
        const res = await withdrawAccountBalance(data);
        console.log("repsoncmcnmc{{{{{{{{{{",res)
        setLoader(false);
        if (res && res.status === 'success') {
          setError('');
          setModalVisible(false);
          setAmount('');
          _checkAccountBalance();
        }
      } catch (error) {
        setLoader(false);
        setModalVisible(false);
      }
    }
  };

  const _checkAccountBalance = async () => {
    try {
      setLoader(true);
      const res = await checkAccountBalance();
      setLoader(false);
      if (res && res.status === 'success') {
        // console.log("retttt{{{{{{{",res.balance.available[0].amount)
        setCurrentBalance(res.balance.available[0].amount);
        setPendingBalance(res.balance.pending[0].amount);
        setTransactionList(res.transaction_list);
      }
    } catch (error) {
      
      setLoader(false);
    }
  };

  const _bankAccountsList = async () => {
    try {
      const res = await bankAccountsList();
      if (res && res.status === 'success') {
        console.log("resop{{{{{{{{",res.Account.data)
        setAccounts(res.Account.data);
      }
    } catch (error) {}
  };

  const _validate = () => {
    if (!amount.trim()) {
      setError('Please enter a valid amount');
      return false;
    } else if (parseInt(amount) > currentBalance) {
      setError('Amount must be less than available balance');
      return false;
    } else if (parseInt(amount) < 1) {
      setError('Amount must be no less than £1.00');
      return false;
    }
    return true;
  };

  return (
    <Container>
      {loader && <Loader loader={loader} />}

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileImg}>
            <Image
              source={
                user?.image
                  ? {uri: user?.image}
                  : user?.image
                  ? {uri: user?.image}
                  : profileImage
              }
              style={styles.img}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Segoe UI Semibold',
              color: Colors.black,
            }}>
            {user?.first_name + ' ' + user?.last_name}
          </Text>
        </View>
        <View style={[styles.creditCard,{backgroundColor:Colors.primary}]}>
          <View style={styles.cardContent}>
            <View style={styles.balanceContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Foundation name="pound" size={27} color={Colors.white} />
                <Text style={styles.balance}>{pendingBalance / 100}</Text>
              </View>

              <Text style={styles.text}>Pending Balance</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.balanceContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Foundation name="pound" size={27} color={Colors.white} />
                  <Text style={styles.balance}>{currentBalance / 100}</Text>
                </View>

                <Text style={styles.text}>Current Balance</Text>
              </View>

              <Pressable
                onPress={() => {
                  setShowCards(true)
                }}
                // onPress={() => setModalVisible(true)}
                disabled={!currentBalance}
                style={styles.activeBtn}>
                <Text
                  style={{
                    ...styles.btnText,
                    ...{color: !currentBalance ? Colors.grey : Colors.black},
                  }}>
                  Withdraw
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.bottomSheet,{backgroundColor:Colors.primary}]}>
        <View style={styles.lineContainer}>
          <View style={styles.line} />
        </View>
        <View style={styles.headingContainer}>
          <Text style={{...styles.text, ...{color: Colors.white}}}>
            Last Transaction
          </Text>
          <Text
            onPress={() => navigation.navigate('TransactionHistory')}
            style={[styles.btnText,{color:'white'}]}>
            See all
          </Text>
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {transactionList?.map((item, index) => (
            <Transaction key={`transcationlist-${index}`} item={item} />
          ))}
        </ScrollView>
      </View>

      <Modal
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        style={{
          flex: 1,
          margin: 0,
        }}>
        <Form style={{flex: 1}} behavior="padding">
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            activeOpacity={1}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Pressable
              onPress={() => {}}
              style={{
                width: '90%',
                height: 200,
                backgroundColor: Colors.white,
                borderRadius: 5,
              }}>
              <View style={{alignItems: 'center', marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Segoe UI',
                    color: Colors.black,
                  }}>
                  Withdraw Money
                </Text>
              </View>
              <TextInput
                style={{
                  borderWidth: 1,
                  margin: 10,
                  paddingVertical: 0,
                  height: 40,
                  paddingHorizontal: 5,
                  color: Colors.black,
                  fontFamily: 'Segoe UI',
                  fontSize: 16,
                  borderRadius: 3,
                  borderColor: Colors.drakGrey,
                }}
                placeholder="Enter amount for withdraw.."
                placeholderTextColor={Colors.grey}
                value={amount}
                onChangeText={text => setAmount(text)}
                keyboardType={isIOS ? 'numbers-and-punctuation' : 'number-pad'}
              />
              {error ? (
                <Text
                  style={{
                    color: 'red',
                    textAlign: 'center',
                    fontFamily: 'Segoe UI',
                  }}>
                  {error}
                </Text>
              ) : null}
              <Pressable
                onPress={_withdrawAccountBalance}
                style={{
                  margin: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.primary,
                  height: 40,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 16,
                    fontFamily: 'Segoe UI',
                  }}>
                  Done
                </Text>
              </Pressable>
            </Pressable>
          </TouchableOpacity>
        </Form>
      </Modal>

      <Modal
        style={{margin: 0}}
        isVisible={showCards}
        onBackdropPress={() => setShowCards(false)}
        onBackButtonPress={() => setShowCards(false)}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: Colors.primary,
          }}>
          <Pressable
            onPress={() => setShowCards(false)}
            style={{
              alignSelf: 'flex-end',
              marginRight: 15,
              marginTop: 10,
              marginBottom: 20,
            }}>
            <Entypo name="circle-with-cross" size={30} color={Colors.white} />
          </Pressable>

          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <ScrollView>
              {accounts.map((item, index) => (
                <CardElement
                  key={`cardelement-${index}`}
                  id={account}
                  item={item}
                  onSelectCard={() => setAccount(null)}
                  onCardSelected={() => setAccount(item.id)}
                />
              ))}
            </ScrollView>
          </View>
          <Pressable
            onPress={() => {
              if (account) {
                setShowCards(false);
                setTimeout(() => {
                  setModalVisible(true);
                }, 500);
              }
            }}
            style={{
              margin: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.white,
              height: 40,
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 16,
                fontFamily: 'Segoe UI',
              }}>
              Done
            </Text>
          </Pressable>
        </SafeAreaView>
      </Modal>
    </Container>
  );
}
