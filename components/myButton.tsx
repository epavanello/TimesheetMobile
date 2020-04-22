import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, ScrollView, Picker, Button, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { t } from "react-native-tailwindcss";

type MyButtonProps = { onPress?: () => void; children: string };
export default function MyButton({ onPress, children }: MyButtonProps) {
  return (
    <TouchableOpacity style={[t.bgIndigo600, t.mL2, t.pY2, t.pX4, t.rounded]} onPress={onPress}>
      <Text style={[t.textWhite, t.fontMedium]}>{children}</Text>
    </TouchableOpacity>
  );
}
