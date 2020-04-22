import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { t } from "react-native-tailwindcss";
import MyButton from "../components/myButton";
import ManageTicket, { ActivityType } from "./manageActivity";

interface Plan {
  time: string;
  activity?: ActivityType;
}

export default function Plan() {
  const [plan, setPlan] = useState<Plan[]>([]);
  const [timeEdit, setTimeEdit] = useState("");

  useEffect(() => {
    const from = 9,
      to = 18;
    const range: Plan[] = [];
    for (let hour = from; hour < to; hour++) {
      range.push({ time: `${hour}:00` });
      range.push({ time: `${hour}:30` });
    }
    setPlan(range);
  }, []);

  const updateActivity = (timeEdit: string, activity: ActivityType) => {
    let newPlan = [...plan];
    let currentActivity = newPlan.find((p) => p.time === timeEdit);
    if (currentActivity) {
      currentActivity.activity = activity;
    }
    setPlan(newPlan);
  };

  return (
    <SafeAreaView style={[t.hFull, t.flexGrow0, t.flexCol]}>
      <View style={[t.itemsCenter, t.bgBlue100, t.pY2]}>
        <View style={[t.bgBlue200, t.pX3, t.pY1, t.roundedFull]}>
          <Text style={[t.textBlue800, t.fontSemibold]}>Your timesheet</Text>
        </View>
      </View>
      <ScrollView style={[t.flexShrink]}>
        {plan.map((p, i) => (
          <View style={[t.flex, t.flexRow, t.wFull, t.borderB, t.borderBlue200]} key={i}>
            <View style={[t.w16, t.borderR, t.borderBlue200, t.p2, t.flex, t.flexRow, t.justifyEnd]}>
              <Text>{p.time}</Text>
            </View>
            <View style={[t.flex1]}>{p.activity && <Text>{p.activity.procedura.label}</Text>}</View>
            <View style={[t.flex1]}>{p.activity && <Text>{p.activity.causale.label}</Text>}</View>
            <View>
              <MyButton
                onPress={() => {
                  setTimeEdit(p.time);
                }}
              >
                Set
              </MyButton>
            </View>
          </View>
        ))}
      </ScrollView>
      {!!timeEdit && (
        <ManageTicket
          onClose={() => {
            setTimeEdit("");
          }}
          onSave={(activity) => {
            updateActivity(timeEdit, activity);
            setTimeEdit("");
          }}
        />
      )}
    </SafeAreaView>
  );
}
