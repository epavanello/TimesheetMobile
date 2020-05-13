import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, TextInput, View, AsyncStorage } from "react-native";
import { t } from "react-native-tailwindcss";

import { Page } from "../shared/models";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { PropertyLabel } from "../components/propertyLabel";
import { getOperatore, getUsername, getPassword, setOperatore, setUsername, setPassword } from "../shared/utilities";

type ProfileProps = {
  onPageChange: (page: Page) => void;
};
export default function Profile({ onPageChange }: ProfileProps) {
  const [operatore, setLocalOperatore] = useState("");
  const [username, setLocalUsername] = useState("");
  const [password, setLocalPassword] = useState("");

  useEffect(() => {
    (async () => {
      setLocalOperatore((await getOperatore()) || "");
      setLocalUsername((await getUsername()) || "");
      setLocalPassword((await getPassword()) || "");
    })();
  }, []);

  const save = async () => {
    await setOperatore(operatore);
    await setUsername(username);
    await setPassword(password);
    returnToPlan();
  };

  const returnToPlan = () => onPageChange(Page.Plan);

  return (
    <SafeAreaView style={[t.hFull, t.flexGrow0, t.flexCol]}>
      <Header
        left={
          <TouchableOpacity style={[t.p2, t.mX2, t.absolute, t.left0]} onPress={returnToPlan}>
            <FontAwesomeIcon style={[t.textBlue800]} icon={["fas", "angle-left"]} />
          </TouchableOpacity>
        }
        right={
          <TouchableOpacity style={[t.p2, t.mX2, t.absolute, t.right0]} onPress={save}>
            <FontAwesomeIcon style={[t.textBlue800]} icon={["fas", "save"]} />
          </TouchableOpacity>
        }
      />
      <View style={[t.flex, t.flexCol, t.p4]}>
        <PropertyLabel label="Operatore">
          <TextInput
            style={[t.borderB, t.borderGray300, t.flex1, t.textGray800, t.textSm, t.pY1, t.pX1]}
            value={operatore}
            onChangeText={(val) => setLocalOperatore(val)}
            keyboardType="numeric"
          />
        </PropertyLabel>
        <PropertyLabel label="Username">
          <TextInput
            style={[t.borderB, t.borderGray300, t.flex1, t.textGray800, t.textSm, t.pY1, t.pX1]}
            value={username}
            onChangeText={(val) => setLocalUsername(val)}
          />
        </PropertyLabel>
        <PropertyLabel label="Password">
          <TextInput
            style={[t.borderB, t.borderGray300, t.flex1, t.textGray800, t.textSm, t.pY1, t.pX1]}
            value={password}
            onChangeText={(val) => setLocalPassword(val)}
            secureTextEntry
          />
        </PropertyLabel>
      </View>
    </SafeAreaView>
  );
}
