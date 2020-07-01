import React, { useState, useEffect } from "react";
import { View, Text, Button, StatusBar, SafeAreaView, Platform } from "react-native";
import { Notifications } from "expo";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import moment from "moment";
import "moment/locale/it";
moment.locale("it");
moment.locale();

import Plan from "./containers/Plan";
import { t } from "react-native-tailwindcss";
import { color } from "react-native-tailwindcss";

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
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

import { Page } from "./shared/models";
import Profile from "./containers/Profile";

library.add(faTimesCircle, faArrowLeft, faArrowRight, faUpload, faUser, faAngleLeft, faSave, faHistory, faCheckCircle, faHeart, farHeart);

export default function App() {
  const [page, setPage] = useState<Page>(Page.Plan);

  const newReminder = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.createCategoryAsync("dismiss", [
      { actionId: "dismiss", buttonTitle: "Silenzia fino al prossimo avvio", isDestructive: true, doNotOpenInForeground: true },
    ]);
    const reminderID = await Notifications.scheduleLocalNotificationAsync(
      {
        title: "Timesheet",
        body: "Stai ancora lavorando sulla stessa attività?",
        categoryId: "dismiss",
      },
      {
        time: moment().add("1", "hour").minute(0).toDate().getTime(),
      }
    );
    console.log("Notification", reminderID.toString());
  };

  useEffect(() => {
    console.log("Init notifications");
    (async () => {
      if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("You need to enable garants for notifications!");
          return;
        }
        Notifications.addListener(async (notification: any) => {
          if (notification.origin === "selected") {
            if (notification.actionId == "dismiss") {
              return;
            } else {
              alert("Carica nuovi dati");
            }
          }
          await newReminder();
        });
        await newReminder();
        //
      }
    })();
  }, []);

  return (
    <SafeAreaView style={[t.flex, t.hFull, t.flexGrow0, t.flexShrink0, t.flexCol]}>
      <StatusBar barStyle="dark-content" backgroundColor={color.blue200} />
      {
        {
          [Page.Plan]: <Plan onPageChange={setPage} />,
          [Page.Profile]: <Profile onPageChange={setPage} />,
        }[page]
      }
    </SafeAreaView>
  );
}
