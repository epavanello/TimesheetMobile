import React, { ReactElement } from "react";
import { View, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { t } from "react-native-tailwindcss";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

type PopOverProps = { onClose?: () => void; children: ReactElement };
export default function PopOver({ onClose, children }: PopOverProps) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={[t.absolute, t.left0, t.right0, t.top0, t.bottom0, t.itemsCenter, t.justifyCenter]}>
        <View style={[t.absolute, t.left0, t.right0, t.top0, t.bottom0, t.bgBlue200, t.opacity75]}></View>
        <View style={[t.p4, t.wFull]}>
          <KeyboardAvoidingView behavior="height">
            <View style={[t.bgWhite, t.wFull, t.p6, t.roundedLg, t.itemsCenter, t.pT12]}>
              <TouchableOpacity style={[t.absolute, t.right0, t.top0, t.mR4, t.mT4]} onPress={onClose}>
                <FontAwesomeIcon icon={["fas", "times-circle"]} size={20} />
              </TouchableOpacity>
              {children}
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
