import React, { useState, useEffect, ReactElement } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { t } from "react-native-tailwindcss";

type HeaderProps = {
  left?: ReactElement;
  right?: ReactElement;
};
export default function Header({ left, right }: HeaderProps) {
  return (
    <View style={[t.flex, t.flexRow, t.justifyCenter, t.itemsCenter, t.bgBlue100, t.pY2]}>
      {left}
      <View style={[t.bgBlue200, t.pX3, t.pY1, t.roundedFull]}>
        <Text style={[t.textBlue800, t.fontSemibold]}>Your timesheet</Text>
      </View>
      {right}
    </View>
  );
}
