import EncryptedStorage from 'react-native-encrypted-storage';

export enum ENCRYPTED_KEYS {
  USER_SESSION = 'USER_SESSION',
}

export async function saveData(key: keyof typeof ENCRYPTED_KEYS, data: any) {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(data));
    return true;
    // Congrats! You've just stored your first value!
  } catch (error) {
    return false;
  }
}

export async function getData(key: keyof typeof ENCRYPTED_KEYS) {
  try {
    const data = await EncryptedStorage.getItem(key);
    return data;
  } catch (error) {
    // There was an error on the native side
  }
}

export async function removeEncryptKey(key: keyof typeof ENCRYPTED_KEYS) {
  try {
    const data = await EncryptedStorage.removeItem(key);
    return data;
  } catch (error) {
    // There was an error on the native side
  }
}
