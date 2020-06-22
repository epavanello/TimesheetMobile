import React, { useState, useEffect } from "react";
import { SafeAreaView, TextInput, Text, View, Button } from "react-native";
import { t } from "react-native-tailwindcss";

import { Page, globalProcedure, globalCausali, PropType } from "../shared/models";
import Header from "../components/Header";
import { PropertyLabel } from "../components/propertyLabel";
import {
  getOperatore,
  getUsername,
  getPassword,
  setOperatore,
  setUsername,
  setPassword,
  getProcedureFavorites,
  getCausaliFavorites,
  setCausaliFavorites,
  setProcedureFavorites,
} from "../shared/utilities";
import Icon from "../components/Icon";
import { Label } from "../components/Label";
import { List } from "../components/List";
import { TouchableOpacity } from "react-native-gesture-handler";

type ProfileProps = {
  onPageChange: (page: Page) => void;
};
export default function Profile({ onPageChange }: ProfileProps) {
  const [operatore, setLocalOperatore] = useState("");
  const [username, setLocalUsername] = useState("");
  const [password, setLocalPassword] = useState("");

  const [procedure, setProcedure] = useState<PropType[]>([]);
  const [causali, setCausali] = useState<PropType[]>([]);

  useEffect(() => {
    getProcedureFavorites().then(setProcedure);
    getCausaliFavorites().then(setCausali);
  }, []);

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

    await setCausaliFavorites(causali);
    await setProcedureFavorites(procedure);

    returnToPlan();
  };

  const returnToPlan = () => onPageChange(Page.Plan);

  const toggle = (row: PropType, list: PropType[], set: React.Dispatch<React.SetStateAction<PropType[]>>) => {
    if (list.find((r) => r.id === row.id)) {
      set([...list.filter((r) => r.id !== row.id)]);
    } else {
      set([...list, row]);
    }
  };

  const toggleProcedura = (row: PropType) => toggle(row, procedure, setProcedure);

  const toggleCausali = (row: PropType) => toggle(row, causali, setCausali);

  const render = (row: PropType, list: PropType[], click: any) => (
    <TouchableOpacity style={[t.flex, t.flexRow, t.itemsCenter]} onPress={() => click(row)}>
      <Icon icon={[list.find((r) => r.id == row.id) ? "fas" : "far", "heart"]} style={[t.p2]} />
      <Text>{row.label}</Text>
    </TouchableOpacity>
  );

  const renderProcedure = (row: PropType) => render(row, procedure, toggleProcedura);

  const renderCausali = (row: PropType) => render(row, causali, toggleCausali);

  return (
    <SafeAreaView style={[t.hFull, t.flexGrow0, t.flexCol]}>
      <Header
        left={<Icon icon={["fas", "angle-left"]} style={[t.absolute, t.left0, t.mX2]} onPress={returnToPlan} />}
        right={<Icon icon={["fas", "save"]} style={[t.absolute, t.right0, t.mX2]} onPress={save} />}
      />
      <View style={[t.flex, t.flex1, t.flexCol, t.p4]}>
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

        <View style={[t.flex, t.flexCol, t.flex1]}>
          <View style={[t.flex1]}>
            <View style={[t.wFull, t.mB4, t.flex, t.flexRow, t.itemsCenter]}>
              <Label>Procedure</Label>
            </View>
            <List data={globalProcedure} render={renderProcedure} style={[t.flex, t.flexCol, t.h40, t.overflowHidden]} />
          </View>
          <View style={[t.flex1]}>
            <View style={[t.wFull, t.mB4, t.flex, t.flexRow, t.itemsCenter]}>
              <Label>Causali</Label>
            </View>
            <List data={globalCausali} render={renderCausali} style={[t.flex, t.flexCol, t.h40, t.overflowHidden]} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
