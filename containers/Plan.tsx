import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, AsyncStorage } from "react-native";
import { t } from "react-native-tailwindcss";
import ManageTicket, { ActivityType, PlanType } from "./manageActivity";
import moment from "moment";
import PlanDay from "./PlanDay";

export default function Plan() {
  const [day, setDay] = useState(new Date());
  const [currentPlan, setCurrentPlan] = useState<PlanType[]>([]);

  const changeDay = async (newDay: Date, plan: PlanType[]) => {
    await AsyncStorage.setItem(moment(day).format("YYYY-MM-DD"), JSON.stringify(plan));
    setDay(newDay);
  };

  useEffect(() => {
    (async () => {
      let jsonValue;
      try {
        jsonValue = await AsyncStorage.getItem(moment(day).format("YYYY-MM-DD"));
      } catch {}
      if (jsonValue != null) {
        setCurrentPlan(JSON.parse(jsonValue));
      } else {
        setCurrentPlan([]);
      }
    })();
  }, [day]);

  return (
    <PlanDay start={9} end={18} breakStart={13} breakEnd={14} stepCents={50} dayPlan={currentPlan} day={day} onChangeDay={changeDay} />
  );
}
