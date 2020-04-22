import React, { useState, useEffect, ReactElement } from "react";
import { Text, View, SafeAreaView, ScrollView, Picker, Button, TouchableOpacity, TextInput } from "react-native";
import { t } from "react-native-tailwindcss";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import MyButton from "./myButton";

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

type PropertyLabelProps = { label: string; children: ReactElement };
function PropertyLabel({ label, children }: PropertyLabelProps) {
  return (
    <View style={[t.wFull, t.mB4, t.flex, t.flexRow, t.itemsBaseline]}>
      <Text style={[t.textGray800, t.textLg, t.fontMedium, t.mR2]}>{label}:</Text>
      {children}
    </View>
  );
}

type PropertyProps = { children: string; value: PropType; onModify: () => void; onDone: () => void };
function Property({ children: label, value, onModify, onDone }: PropertyProps) {
  const [modify, setModify] = useState(false);

  const onEditDonePress = () => {
    if (modify) {
      onDone();
    } else {
      onModify();
    }
    setModify(!modify);
  };

  return (
    <PropertyLabel label={label}>
      <>
        <View style={[t.borderB, t.borderGray300, t.flex1, t.pY1, t.pX1]}>
          {value.id ? (
            <Text numberOfLines={1} style={[t.textGray800, t.textLg, t.flexShrink]}>
              {value.id ? value.label : "Empty"}
            </Text>
          ) : (
            <Text numberOfLines={1} style={[t.textGray500, t.fontLight, t.textLg, t.flexShrink]}>
              Empty
            </Text>
          )}
        </View>
        <MyButton onPress={() => onEditDonePress()}>{modify ? "Done" : value ? "Edit" : "Set"}</MyButton>
      </>
    </PropertyLabel>
  );
}

type PopOverProps = { onClose?: () => void; onSave: (procedura: PropType, causale: PropType, ticket: number, info: string) => void };
export default function PopOver({ onClose, onSave }: PopOverProps) {
  const [procedura, setProcedura] = useState<PropType>(procedure[0]);
  const [causale, setCausale] = useState<PropType>(causali[0]);
  const [ticket, setTicket] = useState<number | "">("");
  const [info, setInfo] = useState("");

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
    onSave(procedura, causale, ticket || 0, info);
  };

  return (
    <View style={[t.absolute, t.left0, t.right0, t.top0, t.bottom0, t.itemsCenter, t.justifyCenter]}>
      <View style={[t.absolute, t.left0, t.right0, t.top0, t.bottom0, t.bgGray400, t.opacity75]}></View>
      <View style={[t.p4, t.wFull]}>
        <View style={[t.bgWhite, t.wFull, t.p6, t.roundedLg, t.itemsCenter, t.pT12]}>
          <TouchableOpacity style={[t.absolute, t.right0, t.top0, t.mR4, t.mT4]} onPress={onClose}>
            <FontAwesomeIcon icon={["fas", "times-circle"]} size={20} />
          </TouchableOpacity>
          <Property value={procedura} onDone={() => setPropList(PropListType.NONE)} onModify={() => setPropList(PropListType.PROCEDURA)}>
            Procedura
          </Property>
          <Property value={causale} onDone={() => setPropList(PropListType.NONE)} onModify={() => setPropList(PropListType.CAUSALE)}>
            Causale
          </Property>
          <PropertyLabel label="Ticket">
            <TextInput
              style={[t.borderB, t.borderGray400, t.flex1, t.textGray800, t.textLg, t.pY1, t.pX1]}
              keyboardType="numeric"
              maxLength={6}
              value={ticket.toString()}
              onChangeText={(val) => setTicket(parseInt(val))}
            />
          </PropertyLabel>
          <PropertyLabel label="Info">
            <TextInput
              style={[t.borderB, t.borderGray400, t.flex1, t.textGray800, t.textLg, t.pY1, t.pX1]}
              maxLength={50}
              value={info}
              onChangeText={setInfo}
            />
          </PropertyLabel>
          {propList !== PropListType.NONE ? (
            <Picker style={[t.wFull, t.bgGray100]} selectedValue={data.id} onValueChange={(val) => setProp(val)}>
              {propListData.map((prop) => (
                <Picker.Item key={prop.id} label={prop.label} value={prop.id} />
              ))}
            </Picker>
          ) : (
            <MyButton disabled={!validData()} onPress={savePress}>
              Save
            </MyButton>
          )}
        </View>
      </View>
    </View>
  );
}
