import HTMLParser from "fast-html-parser";
import { PlanType } from "../containers/manageActivity";
import moment from "moment";
import { getTime, getHours, twoDigit, getMinutes, getUsername, getPassword, getOperatore } from "../shared/utilities";

let authenticated = false;

export const authenticate = async () => {
  const homepage = await fetch("https://teamproject.teamsystem.com");

  const body = await homepage.text();
  const root = HTMLParser.parse(body);

  // Get login parameters
  const parameters = root
    .querySelectorAll("input")
    .filter((el) => el.attributes["name"] && el.attributes["value"] && el.attributes["type"] == "hidden")
    .map((el) => [el.attributes["name"], el.attributes["value"]]);

  parameters.push(["username", (await getUsername()) || ""]);
  parameters.push(["password", (await getPassword()) || ""]);
  parameters.push(["Conferma", "Conferma"]);

  const formBody = [];
  for (var parameter of parameters) {
    var encodedKey = encodeURIComponent(parameter[0]);
    var encodedValue = encodeURIComponent(parameter[1]);
    formBody.push(encodedKey + "=" + encodedValue);
  }

  // Try to login
  const login = await fetch("https://teamproject.teamsystem.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    credentials: "same-origin",
    body: formBody.join("&"),
  });
  if (login.status != 200 || HTMLParser.parse(await login.text()).querySelector("#form_login")) {
    throw login.statusText + " - Not authenticated";
  }
};

const createVoucher = async (voucher: PlanType, day: Date, ore: number, minuti: number) => {
  if (!voucher.activity) return;

  const parameters: string[][] = [];
  const date = moment(day).format("DD/MM/YYYY");

  const operatore = (await getOperatore()) || "";

  parameters.push(["__EVENTTARGET", "BottomBar1$Btn_Registra"]);
  parameters.push([
    "__VIEWSTATE",
    "/wEPDwUJNzA3NTcwODQ4D2QWAgIBD2QWGAIIDxYCHgdWaXNpYmxlaGQCCQ9kFgJmDw8WCB4FV2lkdGgbAAAAAAAATkABAAAAHghDc3NDbGFzcwURZGF0YSByZXEgZGF0YSByZXEeCFJlYWRPbmx5aB4EXyFTQgKCAhYEHgpvbmtleXByZXNzBRtDa19LZXlQcmVzcygnZGF0YScsJycsdHJ1ZSkeBm9uYmx1cgUOQ2tfRGF0ZSh0aGlzKTtkAgoPFgIfAGgWAgIBD2QWBAIBDw9kFgIfBgUSc2V0T3JlSW1waWVnYXRvKCk7ZAIDDw9kFgIfBgUSc2V0T3JlSW1waWVnYXRvKCk7ZAILDxYCHwBoZAIPDxYCHwBoZAIRDxYCHwBoZAISDxYCHwBoZAITDxYCHwBoZAIUDxYCHwBoZAIVDxYCHwBoZAIWD2QWAmYPZBYCAgEPFgIeC18hSXRlbUNvdW50AgEWAgIBD2QWAgIPDw8WAh4PQ29tbWFuZEFyZ3VtZW50BQEwZGQCFw9kFhYCAQ8PFggeBFRleHQFB0RVUExJQ0EeDU9uQ2xpZW50Q2xpY2sFHmR1cGxpY2FWb3VjaGVyKCk7cmV0dXJuIGZhbHNlOx4HRW5hYmxlZGcfAGgWAh4CcGIFATBkAgIPDxYEHwkFCEFHR0lVTkdJHwBnFgIfDAUBMWQCAw8PZBYCHwwFATJkAgQPD2QWAh8MBQEzZAIFDw9kFgIfDAUBNGQCBg8PZBYCHwwFATVkAgcPDxYCHgdUb29sVGlwBQhNb2RpZmljYRYCHgRzYXZlBQExZAIIDw8WAh8NBQdFbGltaW5hFgIeBmRlbGV0ZQUBMWQCCQ8PFgIfDQUJSW5zZXJpc2NpFgQeA25ldwUBMR4HT25DbGljawUhQ2xlYXJGaWVsZHMoJ25ldycpOyByZXR1cm4gZmFsc2U7ZAIKDw8WBB8NBRRMaW5rIGdlc3Rpb25lIHJlcG9ydB8AaBYCHgZyZXBvcnQFATFkAgsPDxYCHw0FFFRvcm5hIGFsbGEgaG9tZSBwYWdlFgQeBWNsb3NlBQExHgZhY3Rpb24FATBkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYJBRJUaXRsZUJhcjEkQnRuX0hvbWUFElRpdGxlQmFyMSRCdG5fRXhpdAUaTkMxMl9DT0RESVBfUVUwMSRMa19CdXR0b24FHk5DMTJfQ09EQ0FVU0FMRV9OQzExJExrX0J1dHRvbgUfTkMwMV9JRF9DT01NRVNTQV9OQzI5JExrX0J1dHRvbgUaTkMxMl9DT0RSQ0ZfUVUxMiRMa19CdXR0b24FHU5DMDFfQ09EUFJPU0VSX1FVMDkkTGtfQnV0dG9uBRxSZXBlYXRlcjEkY3RsMDEkdHh0U3Rvcm5hT3JlBRhSZXBlYXRlcjEkY3RsMDEkaW1nQ2xlYW70riHDnRTOdaeyoSpqORwZa4h4Cw==",
  ]);
  parameters.push([
    "__EVENTVALIDATION",
    "/wEdACjFKg4XWOB3c3mhbWJkdR0/yEaEMx73R3OT1PH9XUnxJEMXxG/qEgC+T1yQ6s/7Hk83X5S9jKPGCMiDPSFfBU9QFY2xTEwdHbzAVMVTCqPLmlk/UeRASygCG2Q1j+kj0eDgiRlC7IDCWvxCB7XtXjfLfBHt+jbGCEzUCJ/9BK6oQ6KNnrYlk7QKTCLluYTi07rBr5IN+S0WZT2KeFnjXN9MzojmrfiIzXhnZNBcZeBovDFv0XiUwE8LjJ3aJCErTHcrZLDQ7uzt5UWvdFHvKt/9TfVcNO/Gw700qe9NIqnHo83EQ4teOmDAoRbAUVBDtvRRY3W31+UW3JaYPsbn4tu5acN8vLsWFpXQa+l2lWaBCmX0ab9A15uQwaBXP+PtiXdWimlZ3vrIcJTMbucsjdt3ljZhUZk8W//yNXMSIshsdjlWlzBE/q7Ap+IJJ/80M6WxbDOQCF5RS8p/KGub6QZ/D9yuSTPQM/vTG0jTDvp5r0XkuoazXA+EZ8oVgxrnjjjSN2jqR/F+cI4OHQ3pqLIhWrUwGu/4T7v8jADZfJct6zKrjT1rHEgPsxuP7v+Ks+VrdLmutxTiUvDxaMLNciuIUM5EARJTWDydLnQR73zpDIw5JqQ6N58grj6QC04M2TfOjKjLa1IeCZqx+x+KZyFMXj9VO2DsXk0rDC2bKCoq+Yl4I5GWE7EsDce6zuEs2ScwJRfmIQoM5PKf9kTNlznA5MPLxCfL1gRJoCqEMOR8zWUlrZm2Es43kOs6O2Fu/U37UpWXgp2K61gCCe4Yrb8iSqAQpCFK0ASRH6qxpJYH29E30F7IcscsBsQeGZyHjfTkpdAi/BHLgFpswyKOtBWVX08VuOXo/yF2VD+ST5ozDxB6xmA=",
  ]);
  parameters.push(["NC12_CODDIP_QU01$Codice", operatore]);
  parameters.push(["NC12_CODCAUSALE_NC11$Codice", voucher.activity.causale.id]);
  parameters.push(["NC12_DATA_ATTIVITA$CAL", date]);
  parameters.push(["NC01_CODPROSER_QU09$Codice", "773"]);
  parameters.push(["Repeater1$ctl01$txtNumTicket", voucher.activity.ticket.toString()]);
  parameters.push(["Repeater1$ctl01$txtDurataHH", twoDigit(ore)]);
  parameters.push(["Repeater1$ctl01$txtDescrizione", voucher.activity.info]);
  parameters.push(["Repeater1$ctl01$txtDurataMM", twoDigit(minuti)]);
  parameters.push(["tipo_cmd", "new"]);

  const formBody = [];
  for (var parameter of parameters) {
    var encodedKey = encodeURIComponent(parameter[0]);
    var encodedValue = encodeURIComponent(parameter[1]);
    formBody.push(encodedKey + "=" + encodedValue);
  }

  const result = await fetch(
    `https://teamproject.teamsystem.com/swproject/Voucher_Semplificato.aspx?mod=1&voucher=-1&idatt=-1&idfase=&idoper=${operatore}&data=${date}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      credentials: "same-origin",
      body: formBody.join("&"),
      redirect: "manual",
    }
  );
  if (result.status != 200) {
    throw result.statusText + " - Not authenticated";
  }
};

const sendPlan = async (plan: PlanType[], day: Date, stepCents: number) => {
  if (!authenticated) {
    await authenticate();
  }
  let lastIndxChange = -1;
  let stepCounter = 0;

  let offsetCounter = 0;

  for (let i = 0; i < plan.length; i++) {
    const step = plan[i];
    if (!step.activity?.disabled) {
      stepCounter++;
    }
    if (step.activity) {
      if (lastIndxChange >= 0) {
        createVoucher(plan[lastIndxChange], day, getHours(stepCounter, stepCents), getMinutes(stepCounter, stepCents));
        offsetCounter += stepCounter;
        stepCounter = 0;
      }
      lastIndxChange = i;
    }
  }
  if (lastIndxChange >= 0 && lastIndxChange != plan.length - 1) {
    createVoucher(plan[lastIndxChange], day, getHours(stepCounter, stepCents), getMinutes(stepCounter, stepCents));
    offsetCounter += stepCounter;
  }

  return offsetCounter;
};

export default sendPlan;
