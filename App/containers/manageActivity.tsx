import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Picker, TouchableOpacity } from "react-native";
import { t } from "react-native-tailwindcss";
import PopOver from "../components/popOver";
import { PropertyLabel } from "../components/propertyLabel";
import MyButton from "../components/myButton";
import { HistoryActivities } from "./historyActivities";
import Icon from "../components/Icon";
import { getProcedureFavorites, getCausaliFavorites } from "../shared/utilities";
import { globalProcedure, globalCausali, PropType, emptyProp } from "../shared/models";

enum PropListType {
  NONE,
  PROCEDURA,
  CAUSALE,
}

type PropertyProps = { children: string; value: PropType; onModify: () => void };
function Property({ children: label, value, onModify }: PropertyProps) {
  return (
    <PropertyLabel label={label}>
      <TouchableOpacity onPress={onModify} style={[t.borderB, t.borderGray300, t.flex1, t.pY1, t.pX1]}>
        {value.id ? (
          <Text numberOfLines={1} style={[t.textGray800, t.textSm, t.flexShrink]}>
            {value.id ? value.label : "Empty"}
          </Text>
        ) : (
          <Text numberOfLines={1} style={[t.textGray500, t.fontLight, t.textSm, t.flexShrink]}>
            Empty
          </Text>
        )}
      </TouchableOpacity>
    </PropertyLabel>
  );
}

export interface ActivityType {
  procedura: PropType;
  causale: PropType;
  ticket: number;
  info: string;
  disabled: boolean;
}
export interface PlanType {
  index: number;
  activity?: ActivityType;
}

type ManageActivityProps = { selectedPlan: PlanType; onClose?: () => void; onChange: (activity?: ActivityType) => void };
export default function ManageActivity({ selectedPlan, onClose, onChange }: ManageActivityProps) {
  const [procedura, setProcedura] = useState<PropType>(selectedPlan.activity?.procedura || emptyProp);
  const [causale, setCausale] = useState<PropType>(selectedPlan.activity?.causale || emptyProp);
  const [ticket, setTicket] = useState<number | "">(selectedPlan.activity?.ticket || "");
  const [info, setInfo] = useState(selectedPlan.activity?.info || "");
  const [loadPreset, setLoadPreset] = useState(false);

  const [propList, setPropList] = useState<PropListType>(PropListType.NONE);

  const [propListData, setPropListData] = useState<PropType[]>([]);

  const [selectedData, setSelectedData] = useState(emptyProp);

  useEffect(() => {
    switch (propList) {
      case PropListType.PROCEDURA:
        getProcedureFavorites().then(setPropListData);
        break;
      case PropListType.CAUSALE:
        getCausaliFavorites().then(setPropListData);
        break;
    }
  }, [propList]);

  const setProp = (propID: string) => {
    switch (propList) {
      case PropListType.PROCEDURA: {
        const data = globalProcedure.find((p) => p.id == propID) || emptyProp;
        setSelectedData(data);
        setProcedura(data);
        break;
      }
      case PropListType.CAUSALE: {
        const data = globalCausali.find((p) => p.id == propID) || emptyProp;
        setSelectedData(data);
        setCausale(data);
        break;
      }
    }
  };

  const validData = () => {
    return !!procedura.id && !!causale.id && !!info;
  };
  const savePress = () => {
    onChange({ procedura, causale, ticket: ticket || 0, info, disabled: false });
  };
  const spegniPress = () => {
    onChange({ procedura, causale, ticket: ticket || 0, info, disabled: true });
  };

  const deletePress = () => {
    onChange();
  };

  const loadPresetClick = () => {
    setLoadPreset(true);
  };

  const setActivity = (activity: ActivityType) => {
    setProcedura(activity.procedura);
    setCausale(activity.causale);
    setTicket(activity.ticket);
    setInfo(activity.info);
    setLoadPreset(false);
  };

  return (
    <>
      <PopOver manageKeyboard onClose={onClose}>
        <>
          <Icon icon={["fas", "history"]} style={[t.absolute, t.left0, t.top0, t.mL2, t.mT2]} onPress={loadPresetClick} />
          <Property value={procedura} onModify={() => setPropList(PropListType.PROCEDURA)}>
            Procedura
          </Property>
          <Property value={causale} onModify={() => setPropList(PropListType.CAUSALE)}>
            Causale
          </Property>
          <PropertyLabel label="Ticket">
            <TextInput
              style={[t.borderB, t.borderGray300, t.flex1, t.textGray800, t.textSm, t.pY1, t.pX1]}
              keyboardType="numeric"
              maxLength={6}
              value={ticket.toString()}
              onChangeText={(val) => setTicket(parseInt(val) || "")}
              onFocus={() => setPropList(PropListType.NONE)}
            />
          </PropertyLabel>
          <PropertyLabel label="Info">
            <TextInput
              style={[t.borderB, t.borderGray300, t.flex1, t.textGray800, t.textSm, t.pY1, t.pX1]}
              maxLength={50}
              value={info}
              onChangeText={setInfo}
              onFocus={() => setPropList(PropListType.NONE)}
            />
          </PropertyLabel>
          {propList !== PropListType.NONE ? (
            <>
              <Picker style={[t.wFull, t.bgGray100, t.mB4]} selectedValue={selectedData.id} onValueChange={(val) => setProp(val)}>
                <Picker.Item key={emptyProp.id} label={emptyProp.label} value={emptyProp.id} />
                {propListData.map((prop) => (
                  <Picker.Item key={prop.id} label={prop.label} value={prop.id} />
                ))}
              </Picker>
              <MyButton onPress={() => setPropList(PropListType.NONE)}>Done</MyButton>
            </>
          ) : (
            <View style={[t.flex, t.flexRow]}>
              <MyButton disabled={!validData()} onPress={savePress}>
                Salva
              </MyButton>
              <MyButton onPress={spegniPress}>Spegni</MyButton>
              <MyButton warn onPress={deletePress}>
                Elimina
              </MyButton>
            </View>
          )}
        </>
      </PopOver>

      {!!loadPreset && (
        <PopOver onClose={() => setLoadPreset(false)}>
          <HistoryActivities onSelect={setActivity} />
        </PopOver>
      )}
    </>
  );
}
