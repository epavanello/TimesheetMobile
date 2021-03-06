import React, { useState, useEffect, useRef } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { t } from "react-native-tailwindcss";
import ManageTicket, { ActivityType, PlanType } from "./manageActivity";
import moment from "moment";
import { getTime, getHours, getMinutes } from "../shared/utilities";

import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  State,
  PinchGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";

type PlanDayProps = {
  dayPlan: PlanType[];
  day: Date;
  start: number;
  end: number;
  breakStart: number;
  breakEnd: number;
  stepCents: number;
  updatePlan: (plan: PlanType[]) => void;
};
export default function PlanDay({ dayPlan, day, start, end, breakStart, breakEnd, stepCents, updatePlan }: PlanDayProps) {
  const [plan, setPlan] = useState<PlanType[]>([]);
  const [planToEdit, setPlanToEdit] = useState<PlanType>();

  const [rowHeight, setRowHeight] = useState(45);

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

  const updateActivity = (indexToEdit: number, activity?: ActivityType) => {
    let newPlan = [...plan];
    let currentActivity = newPlan.find((p) => p.index === indexToEdit);
    if (currentActivity) {
      currentActivity.activity = activity;
    }
    setPlan(newPlan);
    updatePlan(newPlan);
  };

  const isBreak = (index: number) => {
    return getHours(index + 1, stepCents, start) == breakStart && getMinutes(index + 1, stepCents, start) == 0;
  };

  const fixIndex = (index: number) => {
    if (getHours(index + 1, stepCents, start) > breakStart) {
      return index + Math.round(((breakEnd - breakStart) * 100) / stepCents);
    }
    return index;
  };

  const isCurrentStep = (index: number) => {
    const now = moment(Date.now());
    if (!moment(day).isSame(now, "day")) {
      return false;
    }
    const from = moment({ hour: getHours(fixIndex(index), stepCents, start), minute: getMinutes(fixIndex(index), stepCents, start) });
    const to = moment({ hour: getHours(fixIndex(index) + 1, stepCents, start), minute: getMinutes(fixIndex(index) + 1, stepCents, start) });
    const result = moment({ hour: now.get("hour"), minute: now.get("minute") }).isBetween(from, to, "minutes");
    return result;
  };

  const rowHeightBegin = useRef(0);

  const onPinch = (props: PinchGestureHandlerGestureEvent) => {
    const newHeight = Math.max(30, Math.min(80, rowHeightBegin.current * props.nativeEvent.scale));
    setRowHeight(newHeight);
  };

  const onPinchStateChange = (props: PinchGestureHandlerStateChangeEvent) => {
    if (props.nativeEvent.state == State.BEGAN) {
      rowHeightBegin.current = rowHeight;
    }
  };
  return (
    <>
      <PinchGestureHandler onGestureEvent={onPinch} onHandlerStateChange={onPinchStateChange}>
        <ScrollView style={[t.flexShrink]}>
          {plan.map((p, i) => (
            <View
              key={i}
              style={[t.borderB, t.borderBlue200, isBreak(p.index) ? t.borderB2 : {}, i == 0 ? { ...t.borderT, ...t.borderBlue200 } : {}]}
            >
              <TouchableOpacity
                style={[
                  t.flex,
                  t.flexRow,
                  t.wFull,
                  { height: rowHeight },
                  p.activity?.disabled ? t.bgGray200 : t.bgWhite,
                  isCurrentStep(p.index) ? t.bgBlue100 : {},
                ]}
                onPress={() => setPlanToEdit(p)}
              >
                <View style={[t.w16, t.borderR, t.borderBlue200, t.p2, t.flex, t.flexRow, t.justifyEnd]}>
                  <Text>{getTime(p.index, start, stepCents, breakStart, breakEnd)}</Text>
                </View>
                {p.activity ? (
                  <View style={[t.p2, t.flex1, t.flex, t.flexRow]}>
                    {rowHeight > 50 && (
                      <View style={[t.flex1, t.flex, t.flexCol, t.justifyBetween, t.itemsStart]}>
                        <Text style={[t.textXs, t.fontSemibold]}>{p.activity.procedura.label}</Text>
                        <Text style={[t.textXs, t.italic]}>{p.activity.causale.label}</Text>
                      </View>
                    )}
                    <View style={[t.flex1, t.flex, t.flexCol, t.justifyBetween, t.itemsStart]}>
                      {rowHeight > 75 && (
                        <View style={[t.flex, t.flexCol, t.itemsBaseline]}>
                          <Text style={[t.textXs, t.fontSemibold]}>Ticket: </Text>
                          <Text style={[t.textXs]}>{p.activity.ticket || ""}</Text>
                        </View>
                      )}
                      <View style={[t.flex, t.flexCol, t.itemsBaseline]}>
                        {rowHeight > 40 && <Text style={[t.textXs, t.fontSemibold]}>Info: </Text>}
                        <Text style={[t.textXs]}>{p.activity.info}</Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={[t.flex1]}></View>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </PinchGestureHandler>
      {!!planToEdit && (
        <ManageTicket
          selectedPlan={planToEdit}
          onClose={() => {
            setPlanToEdit(undefined);
          }}
          onChange={(newActivity) => {
            updateActivity(planToEdit.index, newActivity);
            setPlanToEdit(undefined);
          }}
        />
      )}
    </>
  );
}
