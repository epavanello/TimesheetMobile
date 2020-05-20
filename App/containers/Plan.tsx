import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, Alert } from "react-native";
import { t } from "react-native-tailwindcss";
import { PlanType } from "./manageActivity";
import moment from "moment";
import PlanDay from "./PlanDay";
import sendPlan from "../logic/sendPlan";
import { Page } from "../shared/models";
import Header from "../components/Header";
import Icon from "../components/Icon";
import { getHours, getMinutes, twoDigit, getDayPlan, setDayPlan } from "../shared/utilities";

import { HistoryActivities } from "./historyActivities";
import PopOver from "../components/popOver";

type PlanProps = {
  onPageChange: (page: Page) => void;
};
export default function Plan({ onPageChange }: PlanProps) {
  const [day, setDay] = useState(new Date());
  const [currentPlan, setCurrentPlan] = useState<PlanType[]>([]);
  const stepCents = 50;

  const savePlan = async (day: Date, plan: PlanType[]) => {
    await setDayPlan(day, plan);
  };

  const changeDay = async (newDay: Date) => {
    setDay(newDay);
  };

  useEffect(() => {
    getDayPlan(day).then(setCurrentPlan);
  }, [day]);

  const sendCurrentPlan = async () => {
    const hoursOffset = await sendPlan(currentPlan, day, stepCents);
    Alert.alert(
      "Caricamento",
      `Caricate ${twoDigit(getHours(hoursOffset, stepCents))}:${twoDigit(getMinutes(hoursOffset, stepCents))} ore`,
      [{ text: "OK" }],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={[t.flex, t.hFull, t.flexGrow0, t.flexCol]}>
      <Header
        left={
          <Icon
            icon={["fas", "user"]}
            style={[t.absolute, t.left0, t.mX2]}
            onPress={() => {
              onPageChange(Page.Profile);
            }}
          />
        }
        right={<Icon icon={["fas", "upload"]} style={[t.absolute, t.right0, t.mX2]} onPress={sendCurrentPlan} />}
      />
      <View style={[t.flex, t.flexRow, t.justifyCenter, t.itemsCenter, t.borderT, t.borderBlue200, t.bgBlue100, t.pY2]}>
        <Icon
          icon={["fas", "arrow-left"]}
          onPress={() => {
            changeDay(moment(day).add(-1, "day").toDate());
          }}
        />
        <Text style={[t.textBlue800, t.fontSemibold, t.mX2]}>{moment(day).format("ddd D MMMM YYYY")}</Text>
        <Icon
          icon={["fas", "arrow-right"]}
          onPress={() => {
            changeDay(moment(day).add(1, "day").toDate());
          }}
        />
      </View>
      <PlanDay
        start={9}
        end={18}
        breakStart={13}
        breakEnd={14}
        stepCents={stepCents}
        dayPlan={currentPlan}
        updatePlan={(plan) => {
          savePlan(day, plan);
        }}
      />
    </SafeAreaView>
  );
}
