import React, { ReactElement } from "react";
import { View, Text } from "react-native";
import { t } from "react-native-tailwindcss";

type PropertyLabelProps = { label: string; children: ReactElement };
export function PropertyLabel({ label, children }: PropertyLabelProps) {
  return (
    <View style={[t.wFull, t.mB4, t.flex, t.flexRow, t.itemsBaseline]}>
      <Text style={[t.textGray800, t.textLg, t.fontMedium, t.mR2]}>{label}:</Text>
      {children}
    </View>
  );
}
