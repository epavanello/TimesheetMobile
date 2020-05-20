import React, { useState } from "react";
import { View, Text, TextInput, Picker, TouchableOpacity } from "react-native";
import { t } from "react-native-tailwindcss";
import PopOver from "../components/popOver";
import { PropertyLabel } from "../components/propertyLabel";
import MyButton from "../components/myButton";
import { HistoryActivities } from "./historyActivities";
import Icon from "../components/Icon";

interface PropType {
  id: string;
  label: string;
}
const procedure = [
  { id: "", label: "" },
  { id: "1098", label: "Euresys (old)" },
  { id: "5015", label: "Euresys cross" },
  { id: "1084", label: "Euresys - HR" },
  { id: "1085", label: "Euresys - RP" },
  { id: "1300", label: "Euresys - Pianificazione Turni" },
  { id: "1301", label: "Euresys - Nota spese" },
  { id: "1302", label: "Euresys - Controllo Accessi" },
  { id: "1303", label: "Euresys - Timesheet" },
  { id: "8203", label: "People App" },
  { id: "5016", label: "Euresys - Acquisizione timbrature" },
];

const causali = [
  { id: "", label: "" },
  { id: "511", label: "Attività presales" },
  { id: "316", label: "Attività sistemistica" },
  { id: "312", label: "Bug-Fix Documentazione" },
  { id: "311", label: "Bug-Fix Analisi" },
  { id: "305", label: "bug-fix Sviluppo" },
  { id: "310", label: "Bug-Fix Test" },
  { id: "309", label: "Coordinamento" },
  { id: "505", label: "Corsi in qualità di docente" },
  { id: "315", label: "Deploy" },
  { id: "47", label: "Partecipazione corso di formazione" },
  { id: "304", label: "SWF-Documentazione" },
  { id: "306", label: "SWF-Riunione aziendale" },
  { id: "307", label: "SWF-Riunione operativa" },
  { id: "300", label: "SWF-Analisi" },
  { id: "303", label: "SWF-Supporto Reparti Assistenza" },
  { id: "301", label: "SWF-Sviluppo" },
  { id: "302", label: "SWF-Test" },
];

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
}
export interface PlanType {
  index: number;
  activity?: ActivityType;
}

type ManageActivityProps = { selectedPlan: PlanType; onClose?: () => void; onChange: (activity?: ActivityType) => void };
export default function ManageActivity({ selectedPlan, onClose, onChange }: ManageActivityProps) {
  const [procedura, setProcedura] = useState<PropType>(selectedPlan.activity?.procedura || procedure[0]);
  const [causale, setCausale] = useState<PropType>(selectedPlan.activity?.causale || causali[0]);
  const [ticket, setTicket] = useState<number | "">(selectedPlan.activity?.ticket || "");
  const [info, setInfo] = useState(selectedPlan.activity?.info || "");
  const [loadPreset, setLoadPreset] = useState(false);

  const [propList, setPropList] = useState<PropListType>(PropListType.NONE);

  let propListData: PropType[] = [];
  let setData: React.Dispatch<React.SetStateAction<PropType>>;
  let data: PropType = { id: "", label: "" };
  switch (propList) {
    case PropListType.PROCEDURA:
      propListData = procedure;
      setData = setProcedura;
      data = procedura;
      break;
    case PropListType.CAUSALE:
      propListData = causali;
      setData = setCausale;
      data = causale;
      break;
  }

  const setProp = (propID: string) => {
    switch (propList) {
      case PropListType.PROCEDURA:
        setProcedura(procedure.find((p) => p.id == propID) || procedure[0]);
        break;
      case PropListType.CAUSALE:
        setCausale(causali.find((p) => p.id == propID) || procedure[0]);
        break;
    }
  };

  const validData = () => {
    return !!procedura.id && !!causale.id && !!info;
  };
  const savePress = () => {
    onChange({ procedura, causale, ticket: ticket || 0, info });
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
              <Picker style={[t.wFull, t.bgGray100, t.mB4]} selectedValue={data.id} onValueChange={(val) => setProp(val)}>
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
