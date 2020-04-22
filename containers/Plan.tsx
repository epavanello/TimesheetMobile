import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Picker,
  Button,
} from "react-native";
import { t } from "react-native-tailwindcss";
import PopOver from "../components/popover";

interface Plan {
  time: string;
  proc: { id: number; label: string };
}

export default function Plan() {
  const [showPopOver, setShowPopOver] = useState(false);
  const [plan, setPlan] = useState<Plan[]>([]);

  useEffect(() => {
    const from = 9,
      to = 18;
    const range: Plan[] = [];
    for (let hour = from; hour < to; hour++) {
      range.push({ time: `${hour}:00`, proc: { id: 0, label: "" } });
      range.push({ time: `${hour}:30`, proc: { id: 0, label: "" } });
    }
    setPlan(range);
  }, []);

  return (
    <SafeAreaView style={[t.hFull, t.flexGrow0, t.flexCol]}>
      <View style={[t.itemsCenter, t.bgBlue100, t.pY2]}>
        <View style={[t.bgBlue200, t.pX3, t.pY1, t.roundedFull]}>
          <Text style={[t.textBlue800, t.fontSemibold]}>Your timesheet</Text>
        </View>
      </View>
      <ScrollView style={[t.flexShrink]}>
        {plan.map((p, i) => (
          <View
            style={[t.flex, t.flexRow, t.wFull, t.borderB, t.borderBlue200]}
            key={i}
          >
            <View
              style={[
                t.w16,
                t.borderR,
                t.borderBlue200,
                t.p2,
                t.flex,
                t.flexRow,
                t.justifyEnd,
              ]}
            >
              <Text>{p.time}</Text>
            </View>
            {!p.proc.id && (
              <>
                <View style={[t.flex1]}></View>
                <View>
                  <Button
                    title={"set"}
                    onPress={() => {
                      setShowPopOver(true);
                    }}
                  />
                </View>
              </>
            )}
          </View>
        ))}
      </ScrollView>
      {showPopOver && (
        <PopOver
          onClose={() => {
            setShowPopOver(false);
          }}
        />
      )}
    </SafeAreaView>
  );
}
