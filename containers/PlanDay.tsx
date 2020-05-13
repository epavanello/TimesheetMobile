import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { t } from "react-native-tailwindcss";
import ManageTicket, { ActivityType, PlanType } from "./manageActivity";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import sendPlan from "../components/logic/sendPlan";
import { getTime, getHours, getMinutes } from "../components/logic/utilities";

type PlanDayProps = {
  dayPlan: PlanType[];
  start: number;
  end: number;
  breakStart: number;
  breakEnd: number;
  stepCents: number;
  day: Date;
  onChangeDay: (day: Date, plan: PlanType[]) => void;
};
export default function PlanDay({ dayPlan, start, end, breakStart, breakEnd, stepCents, day, onChangeDay }: PlanDayProps) {
  const [plan, setPlan] = useState<PlanType[]>([]);
  const [planToEdit, setPlanToEdit] = useState<PlanType>();

  useEffect(() => {
    const fixedPlan = [];
    let cursor = start * 100;
    let index = 0;
    while (cursor < end * 100 - (breakEnd - breakStart) * 100) {
      const foundPlan = dayPlan.find((p) => p.index == index) || {
        index,
      };
      fixedPlan.push(foundPlan);
      cursor += stepCents;
      index++;
    }
    setPlan(fixedPlan);
  }, [dayPlan]);

  const updateActivity = (indexToEdit: number, activity: ActivityType) => {
    let newPlan = [...plan];
    let currentActivity = newPlan.find((p) => p.index === indexToEdit);
    if (currentActivity) {
      currentActivity.activity = activity;
    }
    setPlan(newPlan);
  };

  const isBreak = (index: number) => {
    return getHours(index + 1, stepCents, start) == breakStart && getMinutes(index + 1, stepCents, start) == 0;
  };

  const fixIndex = (index: number) => {
    if (getHours(index + 1, stepCents, start) >= breakStart) {
      console.log(`fix ${index} > ${index + Math.round(((breakEnd - breakStart) * 100) / stepCents)}`);
      return index + Math.round(((breakEnd - breakStart) * 100) / stepCents);
    }
    return index;
  };

  const isCurrentStep = (index: number) => {
    const from = moment({ hour: getHours(fixIndex(index), stepCents, start), minute: getMinutes(fixIndex(index), stepCents, start) });
    const to = moment({ hour: getHours(fixIndex(index) + 1, stepCents, start), minute: getMinutes(fixIndex(index) + 1, stepCents, start) });
    const now = moment(Date.now());
    const result = moment({ hour: now.get("hour"), minute: now.get("minute") }).isBetween(from, to, "minutes");

    console.log(`fixIndex(index): ${fixIndex(index)}, Hours: ${getHours(fixIndex(index), stepCents, start)}`);

    return result;
  };

  return (
    <SafeAreaView style={[t.hFull, t.flexGrow0, t.flexCol]}>
      <View style={[t.flex, t.flexRow, t.justifyCenter, t.itemsCenter, t.bgBlue100, t.pY2]}>
        <View style={[t.bgBlue200, t.pX3, t.pY1, t.roundedFull]}>
          <Text style={[t.textBlue800, t.fontSemibold]}>Your timesheet</Text>
        </View>
        <TouchableOpacity
          style={[t.p2, t.absolute, t.right0]}
          onPress={() => {
            sendPlan(plan, day, stepCents);
          }}
        >
          <FontAwesomeIcon style={[t.textBlue800]} icon={["fas", "upload"]} />
        </TouchableOpacity>
      </View>
      <View style={[t.flex, t.flexRow, t.justifyCenter, t.itemsCenter, t.borderT, t.borderBlue200, t.bgBlue100, t.pY2]}>
        <TouchableOpacity
          style={[t.p2]}
          onPress={() => {
            onChangeDay(moment(day).add(-1, "day").toDate(), plan);
          }}
        >
          <FontAwesomeIcon style={[t.textBlue800]} icon={["fas", "arrow-left"]} />
        </TouchableOpacity>
        <Text style={[t.textBlue800, t.fontSemibold, t.mX2]}>{moment(day).format("LL")}</Text>
        <TouchableOpacity
          style={[t.p2]}
          onPress={() => {
            onChangeDay(moment(day).add(1, "day").toDate(), plan);
          }}
        >
          <FontAwesomeIcon style={[t.textBlue800]} icon={["fas", "arrow-right"]} />
        </TouchableOpacity>
      </View>
      <ScrollView style={[t.flexShrink]}>
        {plan.map((p, i) => (
          <View
            key={i}
            style={[
              t.borderB,
              t.borderBlue200,
              isBreak(p.index) ? t.borderB2 : {},
              i == 0 ? { ...t.borderT, ...t.borderBlue200 } : {},
              isCurrentStep(p.index) ? t.bgBlue100 : {},
            ]}
          >
            <TouchableOpacity style={[t.flex, t.flexRow, t.wFull]} onPress={() => setPlanToEdit(p)}>
              <View style={[t.w16, t.borderR, t.borderBlue200, t.p2, t.flex, t.flexRow, t.justifyEnd]}>
                <Text>{getTime(p.index, start, stepCents, breakStart, breakEnd)}</Text>
              </View>
              {p.activity ? (
                <>
                  <View style={[t.flex1, t.pL2, t.flex, t.flexCol, t.justifyCenter, t.itemsStart]}>
                    <Text style={[t.textXs]}>{p.activity.procedura.label}</Text>
                    <Text style={[t.textXs]}>{p.activity.causale.label}</Text>
                  </View>
                  <View style={[t.flex1, t.pR2, t.flex, t.flexCol, t.justifyCenter, t.itemsStart]}>
                    <View style={[t.flex, t.flexRow, t.itemsBaseline]}>
                      <Text style={[t.textXs, t.fontSemibold]}>Ticket: </Text>
                      <Text style={[t.textXs]}>{p.activity.ticket || ""}</Text>
                    </View>
                    <View style={[t.flex, t.flexRow, t.itemsBaseline]}>
                      <Text style={[t.textXs, t.fontSemibold]}>Info: </Text>
                      <Text style={[t.textXs]}>{p.activity.info}</Text>
                    </View>
                  </View>
                </>
              ) : (
                <View style={[t.flex1]}></View>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {!!planToEdit && (
        <ManageTicket
          selectedPlan={planToEdit}
          onClose={() => {
            setPlanToEdit(undefined);
          }}
          onSave={(newActivity) => {
            updateActivity(planToEdit.index, newActivity);
            setPlanToEdit(undefined);
          }}
        />
      )}
    </SafeAreaView>
  );
}
