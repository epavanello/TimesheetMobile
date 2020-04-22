import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, ScrollView, Picker, Button, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { t } from "react-native-tailwindcss";

type MyButtonProps = { onPress?: () => void; children: string, disabled?: boolean };
export default function MyButton({ onPress, children, disabled }: MyButtonProps) {
  return (
    <TouchableOpacity disabled={disabled} style={[disabled ? t.bgBlue300 : t.bgBlue600, t.mL2, t.pY2, t.pX4, t.rounded]} onPress={onPress}>
      <Text style={[t.textWhite, t.fontMedium]}>{children}</Text>
    </TouchableOpacity>
  );
}
