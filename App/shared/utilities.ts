import { AsyncStorage } from "react-native";

export const twoDigit = (n: number) => (n > 9 ? "" + n : "0" + n);

export const getTime = (index: number, start: number, stepCents: number, breakStart: number, breakEnd: number) => {
  const time = start * 100 + index * stepCents;
  let hours = Math.floor(time / 100);
  if (hours >= breakStart) {
    hours += breakEnd - breakStart;
  }
  const minutes = ((time % 100) / 100) * 60;
  return `${twoDigit(hours)}:${twoDigit(minutes)}`;
};

export const getHours = (index: number, stepCents: number, start = 0) => {
  const time = start * 100 + index * stepCents;
  return Math.floor(time / 100);
};

export const getMinutes = (index: number, stepCents: number, start = 0) => {
  const time = start * 100 + index * stepCents;
  return ((time % 100) / 100) * 60;
};

export const getOperatore = async () => await AsyncStorage.getItem("operatore");
export const setOperatore = async (operatore: string) => await AsyncStorage.setItem("operatore", operatore);

export const getUsername = async () => await AsyncStorage.getItem("username");
export const setUsername = async (username: string) => await AsyncStorage.setItem("username", username);

export const getPassword = async () => await AsyncStorage.getItem("password");
export const setPassword = async (password: string) => await AsyncStorage.setItem("password", password);
