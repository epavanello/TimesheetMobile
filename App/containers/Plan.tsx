import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, Alert, TouchableOpacity } from "react-native";
import { t } from "react-native-tailwindcss";
import { PlanType } from "./manageActivity";
import moment from "moment";
import PlanDay from "./PlanDay";
import sendPlan from "../logic/sendPlan";
import { Page } from "../shared/models";
import Header from "../components/Header";
import Icon from "../components/Icon";
import { getHours, getMinutes, twoDigit, getDayPlan, setDayPlan, setLastSyncDay, checkSyncOk } from "../shared/utilities";

import { Calendar, DateObject } from "react-native-calendars";
import PopOver from "../components/popOver";

type PlanProps = {
  onPageChange: (page: Page) => void;
};
export default function Plan({ onPageChange }: PlanProps) {
  const [day, setDay] = useState(new Date());
  const [currentPlan, setCurrentPlan] = useState<PlanType[]>([]);
  const [markedDates, setMarkedDates] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [syncDone, setSyncDone] = useState(false);
  const stepCents = 50;

  const updatePlan = async (day: Date, plan: PlanType[]) => {
    await setDayPlan(day, plan);
    checkSyncOk(day).then(setSyncDone);
    setCurrentPlan(plan);
  };

  const changeDay = async (newDay: Date) => {
    setDay(newDay);
  };

  useEffect(() => {
    getDayPlan(day).then(setCurrentPlan);
    checkSyncOk(day).then(setSyncDone);
    updateMarkedDates(day);
  }, [day]);

  const sendCurrentPlan = async () => {
    const hoursOffset = await sendPlan(currentPlan, day, stepCents);
    await setLastSyncDay(day);
    setSyncDone(true);
    updateMarkedDates(day);
    Alert.alert(
      "Caricamento",
      `Caricate ${twoDigit(getHours(hoursOffset, stepCents))}:${twoDigit(getMinutes(hoursOffset, stepCents))} ore`,
      [{ text: "OK" }],
      { cancelable: false }
    );
  };

  const updateMarkedDates = async (month: Date) => {
    let obj: { [key: string]: {} } = {};

    obj[moment(day).format("yyyy-MM-DD")] = { selected: true };

    const from = moment(month).startOf("month");
    const to = moment(month).endOf("month");
    for (let currentDay = moment(from); currentDay.isSameOrBefore(to); currentDay.add(1, "day")) {
      const key = currentDay.format("yyyy-MM-DD");
      let dayObj: { [key: string]: {} } = obj[key] || {};
      if ((await getDayPlan(currentDay.toDate())).length > 0) {
        dayObj["marked"] = true;
        if (await checkSyncOk(currentDay.toDate())) {
          dayObj["dotColor"] = "green";
        } else {
          dayObj["dotColor"] = "red";
        }
      }
      obj[key] = dayObj;
    }
    setMarkedDates(obj);
  };

  const onCalendarMonthChange = (date: DateObject) => {
    const newDay = new Date(date.timestamp);
    setDay(newDay);
    updateMarkedDates(newDay);
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
        right={
          syncDone ? (
            <Icon icon={["fas", "check-circle"]} style={[t.absolute, t.right0, t.mX2]} />
          ) : (
            <Icon icon={["fas", "upload"]} style={[t.absolute, t.right0, t.mX2]} onPress={sendCurrentPlan} />
          )
        }
      />
      <View style={[t.flex, t.flexRow, t.justifyCenter, t.itemsCenter, t.borderT, t.borderBlue200, t.bgBlue100, t.pY2]}>
        <Icon
          icon={["fas", "arrow-left"]}
          onPress={() => {
            changeDay(moment(day).add(-1, "day").toDate());
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setShowCalendar(true);
          }}
        >
          <Text style={[t.textBlue800, t.fontSemibold, t.mX2]}>{moment(day).format("ddd D MMMM YYYY")}</Text>
        </TouchableOpacity>
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
          updatePlan(day, plan);
        }}
      />
      {showCalendar && (
        <PopOver
          onClose={() => {
            setShowCalendar(false);
          }}
        >
          <Calendar
            current={day}
            markedDates={markedDates}
            onMonthChange={onCalendarMonthChange}
            onDayPress={(e) => {
              setDay(new Date(e.timestamp));
              setShowCalendar(false);
            }}
          />
        </PopOver>
      )}
    </SafeAreaView>
  );
}
