import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { ActivityType, PlanType } from "./manageActivity";
import moment from "moment";
import { getDayPlan, getLastUniquesActivities } from "../shared/utilities";
import { TouchableOpacity } from "react-native-gesture-handler";
import { t } from "react-native-tailwindcss";

type HistoryActivitiesProps = { onSelect: (activity: ActivityType) => void };
export const HistoryActivities = ({ onSelect }: HistoryActivitiesProps) => {
  const [lastActivities, setLastActivities] = useState<ActivityType[]>([]);

  useEffect(() => {
    getLastUniquesActivities().then(setLastActivities);
  }, []);

  return (
    <ScrollView style={[t.flex, t.flexCol, t.wFull]}>
      {lastActivities.map((a, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => {
            onSelect(a);
          }}
          style={[t.flex, t.flexRow, t.wFull, t.borderB, t.borderBlue200]}
        >
          <View style={[t.p2, t.flex1, t.flex, t.flexRow]}>
            <View style={[t.flex1, t.flex, t.flexCol, t.justifyBetween, t.itemsStart]}>
              <Text style={[t.textXs, t.fontSemibold]}>{a.procedura.label}</Text>
              <Text style={[t.textXs, t.italic]}>{a.causale.label}</Text>
            </View>
            <View style={[t.flex1, t.flex, t.flexCol, t.justifyBetween, t.itemsStart]}>
              <View style={[t.flex, t.flexCol, t.itemsBaseline]}>
                <Text style={[t.textXs, t.fontSemibold]}>Ticket: </Text>
                <Text style={[t.textXs]}>{a.ticket || ""}</Text>
              </View>
              <View style={[t.flex, t.flexCol, t.itemsBaseline]}>
                <Text style={[t.textXs, t.fontSemibold]}>Info: </Text>
                <Text style={[t.textXs]}>{a.info}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
