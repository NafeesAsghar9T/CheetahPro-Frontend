import database from '@react-native-firebase/database';

export const senderMsg = async (
  msgValue: string,
  currentUserId: string,
  guestUserId: string,
  date: number,
) => {
  try {
    return await database()
      .ref('messeges/' + currentUserId)
      .child(guestUserId)
      .push({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          date,
        },
      });
  } catch (error) {
    return error;
  }
};

export const recieverMsg = async (
  msgValue: string,
  currentUserId: string,
  guestUserId: string,
  date: number,
) => {
  try {
    return await database()
      .ref('messeges/' + guestUserId)
      .child(currentUserId)
      .push({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          date,
        },
      });
  } catch (error) {
    return error;
  }
};
