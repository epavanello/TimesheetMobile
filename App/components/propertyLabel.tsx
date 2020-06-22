import React, { ReactElement } from "react";
import { View, Text } from "react-native";
import { t } from "react-native-tailwindcss";
import { Label } from "./Label";

type PropertyLabelProps = { label: string; children: ReactElement };
export function PropertyLabel({ label, children }: PropertyLabelProps) {
  return (
    <View style={[t.wFull, t.mB4, t.flex, t.flexRow, t.itemsCenter]}>
      <Label>{label + ":"}</Label>
      {children}
    </View>
  );
}
