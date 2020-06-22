import React, { ReactElement } from "react";
import { Text, ScrollView, StyleProp, ViewStyle, View } from "react-native";
import { t } from "react-native-tailwindcss";

type ListProps<T> = { data: T[]; render: (value: T) => ReactElement; style?: StyleProp<ViewStyle> };
export function List<T>({ data, render, style }: ListProps<T>) {
  return (
    <ScrollView style={[style, t.border, t.borderBlue200, t.flex, t.flexCol]}>
      {data.map((row, i) => (
        <View key={i} style={[t.borderB, t.borderBlue200]}>
          {render(row)}
        </View>
      ))}
    </ScrollView>
  );
}
