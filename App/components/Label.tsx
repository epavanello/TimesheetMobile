import React from "react";
import { Text } from "react-native";
import { t } from "react-native-tailwindcss";

type LabelProps = { children: string };
export function Label({ children }: LabelProps) {
  return <Text style={[t.textGray800, t.textLg, t.fontMedium, t.mR2]}>{children}</Text>;
}
