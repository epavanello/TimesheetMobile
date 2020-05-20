import { AsyncStorage } from "react-native";
import moment from "moment";
import { PlanType, ActivityType } from "../containers/manageActivity";

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

export const getDayPlan = async (day: Date): Promise<PlanType[]> => {
  let jsonValue;
  try {
    jsonValue = await AsyncStorage.getItem(moment(day).format("YYYY-MM-DD"));
  } catch {}
  if (jsonValue != null) {
    return JSON.parse(jsonValue);
  } else {
    return [];
  }
};

let lastActivitiesCache: ActivityType[] = [];

export const getLastUniquesActivities = async () => {
  if (lastActivitiesCache.length > 0) return lastActivitiesCache;
  const from = moment();
  const to = moment(from).subtract(60, "days");
  const promises: Promise<PlanType[]>[] = [];

  for (let dayCursor = from; dayCursor.isSameOrAfter(to); dayCursor.subtract(1, "day")) {
    promises.push(getDayPlan(dayCursor.toDate()));
  }

  const plans = await Promise.all(promises);
  const activities = plans
    .flat()
    // Remove empty activities
    .filter((p) => !!p.activity)
    .map((p) => p.activity) as ActivityType[];

  lastActivitiesCache = activities.reduce((uniqueActivites: ActivityType[], current) => {
    if (
      !uniqueActivites.some((x) => {
        return (
          x.procedura.id == current.procedura.id &&
          x.causale.id == current.causale.id &&
          x.ticket == current.ticket &&
          x.info == current.info
        );
      })
    ) {
      uniqueActivites.push(current);
    }
    return uniqueActivites;
  }, []);
  return lastActivitiesCache;
};

export const setDayPlan = async (day: Date, plan: PlanType[]) => {
  lastActivitiesCache = [];
  await AsyncStorage.setItem(moment(day).format("YYYY-MM-DD"), JSON.stringify(plan));
};
