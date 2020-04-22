import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { t } from "react-native-tailwindcss";
import MyButton from "../components/myButton";
import ManageTicket, { ActivityType, PlanType } from "./manageActivity";


export default function Plan() {
  const [plan, setPlan] = useState<PlanType[]>([]);
  const [planToEdit, setPlanToEdit] = useState<PlanType>();

  useEffect(() => {
    const from = 9,
      to = 18;
    const range: PlanType[] = [];
    for (let hour = from; hour < to; hour++) {
      range.push({
        time: `${hour}:00`,
        activity: {
          procedura: { id: "1", label: "Euresys cross" },
          causale: { id: "1", label: "Sviluppo" },
          ticket: 23445,
          info: "SAL PRESENZE",
        },
      });
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
            {p.activity ? (
              <>
                <View style={[t.flex1, t.pL2, t.flex, t.flexCol, t.justifyCenter, t.itemsStart]}>
                  <Text style={[t.textXs]}>{p.activity.procedura.label}</Text>
                  <Text style={[t.textXs]}>{p.activity.causale.label}</Text>
                </View>
                <View style={[t.flex1, t.pR2, t.flex, t.flexCol, t.justifyCenter, t.itemsStart]}>
                  <Text style={[t.textXs]}>{p.activity.ticket || ""}</Text>
                  <Text style={[t.textXs]}>{p.activity.info}</Text>
                </View>
              </>
            ) : (
              <View style={[t.flex1]}></View>
            )}
            <View>
              <MyButton
                onPress={() => {
                  setPlanToEdit(p);
                }}
              >
                Set
              </MyButton>
            </View>
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
            updateActivity(planToEdit.time, newActivity);
            setPlanToEdit(undefined);
          }}
        />
      )}
    </SafeAreaView>
  );
}
