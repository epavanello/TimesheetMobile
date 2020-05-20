import React, { useState } from "react";
import { View, Text } from "react-native";

import moment from "moment";
import "moment/locale/it";
moment.locale("it");
moment.locale();

import Plan from "./containers/Plan";
import { t } from "react-native-tailwindcss";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimesCircle,
  faArrowLeft,
  faArrowRight,
  faUpload,
  faUser,
  faAngleLeft,
  faSave,
  faHistory,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Page } from "./shared/models";
import Profile from "./containers/Profile";

library.add(faTimesCircle, faArrowLeft, faArrowRight, faUpload, faUser, faAngleLeft, faSave, faHistory, faCheckCircle);

export default function App() {
  const [page, setPage] = useState<Page>(Page.Plan);

  return (
    <View style={[t.flex, t.hFull, t.flexGrow0, t.flexShrink0, t.flexCol]}>
      {
        {
          [Page.Plan]: <Plan onPageChange={setPage} />,
          [Page.Profile]: <Profile onPageChange={setPage} />,
        }[page]
      }
    </View>
  );
}
