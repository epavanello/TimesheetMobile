import React from "react";
import { TouchableOpacity, ViewStyle, RegisteredStyle, GestureResponderEvent, StyleProp } from "react-native";
import { t } from "react-native-tailwindcss";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

type CustomIconProp = {
  icon: [IconPrefix, IconName];
  style?: StyleProp<TouchableOpacity>;
  onPress?: (event: GestureResponderEvent) => void;
};
export default function Icon({ icon, style, onPress }: CustomIconProp) {
  return (
    <TouchableOpacity style={[t.p2, style ? style : {}]} onPress={onPress}>
      <FontAwesomeIcon style={[t.textBlue800]} icon={icon} />
    </TouchableOpacity>
  );
}
