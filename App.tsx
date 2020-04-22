import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Plan from "./containers/Plan";
import { t } from "react-native-tailwindcss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faTimesCircle);

export default function App() {
  return (
    <View style={[t.flex, t.hFull, t.flexGrow0, t.flexShrink0, t.flexCol]}>
      <Plan />
    </View>
  );
}
