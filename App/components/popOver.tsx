import React, { ReactElement } from "react";
import { View, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { t } from "react-native-tailwindcss";
import Icon from "./Icon";

type PopOverProps = { onClose?: () => void; children: ReactElement; manageKeyboard?: boolean };
export default function PopOver({ onClose, children, manageKeyboard }: PopOverProps) {
  if (manageKeyboard) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={[t.absolute, t.left0, t.right0, t.top0, t.bottom0, t.itemsCenter, t.justifyCenter]}>
          <View style={[t.absolute, t.left0, t.right0, t.top0, t.bottom0, t.bgBlue200, t.opacity75]}></View>
          <View style={[t.p4, t.wFull]}>
            <KeyboardAvoidingView behavior="padding">
              <View style={[t.bgWhite, t.wFull, t.p6, t.roundedLg, t.itemsCenter, t.pT12]}>
                <Icon icon={["fas", "times-circle"]} style={[t.absolute, t.right0, t.top0, t.mR2, t.mT2]} onPress={onClose} />
                {children}
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <View style={[t.absolute, t.left0, t.right0, t.top0, t.bottom0, t.itemsCenter, t.justifyCenter]}>
        <View style={[t.absolute, t.left0, t.right0, t.top0, t.bottom0, t.bgBlue200, t.opacity75]}></View>
        <View style={[t.p4, t.wFull]}>
          <View style={[t.bgWhite, t.wFull, t.p6, t.roundedLg, t.itemsCenter, t.pT12]}>
            <Icon icon={["fas", "times-circle"]} style={[t.absolute, t.right0, t.top0, t.mR2, t.mT2]} onPress={onClose} />
            {children}
          </View>
        </View>
      </View>
    );
  }
}
