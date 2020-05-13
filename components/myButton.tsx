import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { t } from "react-native-tailwindcss";

type MyButtonProps = { onPress?: () => void; children: string; disabled?: boolean; clean?: boolean };
export default function MyButton({ onPress, children, disabled, clean }: MyButtonProps) {
  const getBoxStyles = () => {
    const styles = [t.mL2, t.pY2, t.pX4, t.rounded];
    if (!clean) {
      styles.push(disabled ? t.bgBlue300 : t.bgBlue600);
      styles.push(t.rounded);
    }
    return styles;
  };

  const getTextStyles = () => {
    const styles = [t.fontMedium];
    if (clean) {
      styles.push(disabled ? t.textBlue300 : t.textBlue600);
    } else {
      styles.push(t.textWhite);
    }
    return styles;
  };

  return (
    <TouchableOpacity disabled={disabled} style={getBoxStyles()} onPress={onPress}>
      <Text style={getTextStyles()}>{children}</Text>
    </TouchableOpacity>
  );
}
