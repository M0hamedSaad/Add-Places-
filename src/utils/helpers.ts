import {getData} from './encrypt-storage';

export const getUserEmail = async () => {
  const user = (await getData('USER_SESSION')) as string;
  const {email} = JSON.parse(user);
  return email.replace(/\./gi, '');
};
