import React, { useEffect } from "react";
import { View } from "react-native";

import moment from "moment";
import "moment/locale/it";
moment.locale("it");
moment.locale();

import Plan from "./containers/Plan";
import { t } from "react-native-tailwindcss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle, faArrowLeft, faArrowRight, faUpload } from "@fortawesome/free-solid-svg-icons";

library.add(faTimesCircle, faArrowLeft, faArrowRight, faUpload);

export default function App() {
  return (
    <View style={[t.flex, t.hFull, t.flexGrow0, t.flexShrink0, t.flexCol]}>
      <Plan />
    </View>
  );
}
