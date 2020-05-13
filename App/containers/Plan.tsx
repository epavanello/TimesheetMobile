import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, AsyncStorage } from "react-native";
import { t } from "react-native-tailwindcss";
import { PlanType } from "./manageActivity";
import moment from "moment";
import PlanDay from "./PlanDay";
import sendPlan from "../logic/sendPlan";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Page } from "../shared/models";
import Header from "../components/Header";

type PlanProps = {
  onPageChange: (page: Page) => void;
};
export default function Plan({ onPageChange }: PlanProps) {
  const [day, setDay] = useState(new Date());
  const [currentPlan, setCurrentPlan] = useState<PlanType[]>([]);
  const stepCents = 50;

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
    <SafeAreaView style={[t.hFull, t.flexGrow0, t.flexCol]}>
      <Header
        left={
          <TouchableOpacity
            style={[t.p2, t.mX2, t.absolute, t.left0]}
            onPress={() => {
              onPageChange(Page.Profile);
            }}
          >
            <FontAwesomeIcon style={[t.textBlue800]} icon={["fas", "user"]} />
          </TouchableOpacity>
        }
        right={
          <TouchableOpacity
            style={[t.p2, t.mX2, t.absolute, t.right0]}
            onPress={() => {
              sendPlan(currentPlan, day, stepCents);
            }}
          >
            <FontAwesomeIcon style={[t.textBlue800]} icon={["fas", "upload"]} />
          </TouchableOpacity>
        }
      />
      <View style={[t.flex, t.flexRow, t.justifyCenter, t.itemsCenter, t.borderT, t.borderBlue200, t.bgBlue100, t.pY2]}>
        <TouchableOpacity
          style={[t.p2]}
          onPress={() => {
            changeDay(moment(day).add(-1, "day").toDate(), currentPlan);
          }}
        >
          <FontAwesomeIcon style={[t.textBlue800]} icon={["fas", "arrow-left"]} />
        </TouchableOpacity>
        <Text style={[t.textBlue800, t.fontSemibold, t.mX2]}>{moment(day).format("LL")}</Text>
        <TouchableOpacity
          style={[t.p2]}
          onPress={() => {
            changeDay(moment(day).add(1, "day").toDate(), currentPlan);
          }}
        >
          <FontAwesomeIcon style={[t.textBlue800]} icon={["fas", "arrow-right"]} />
        </TouchableOpacity>
      </View>
      <PlanDay start={9} end={18} breakStart={13} breakEnd={14} stepCents={stepCents} dayPlan={currentPlan} />
    </SafeAreaView>
  );
}
