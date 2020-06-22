export enum Page {
  Plan,
  Profile,
}

export interface PropType {
  id: string;
  label: string;
}

/*export const globalCausali = [
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
];*/

export const globalCausali = [
  { id: "511", label: "Attività Presales" },
  { id: "316", label: "Attività sistemistica" },
  { id: "312", label: "Bug Fix Documentazione" },
  { id: "311", label: "Bug-Fix Analisi" },
  { id: "305", label: "bug-fix Sviluppo" },
  { id: "310", label: "Bug-Fix Test" },
  { id: "313", label: "Conversioni" },
  { id: "309", label: "Coordinamento" },
  { id: "505", label: "Corsi in qualità di docente" },
  { id: "315", label: "Deploy" },
  { id: "47", label: "Partecipazione corso di formazione" },
  { id: "317", label: "POC" },
  { id: "308", label: "SWF corsi/formazione/demo" },
  { id: "304", label: "SWF- Documentazione" },
  { id: "306", label: "SWF Riunione aziendale" },
  { id: "307", label: "SWF Riunione operativa" },
  { id: "300", label: "SWF-Analisi" },
  { id: "303", label: "SWF-Supporto Reparti Assistenza" },
  { id: "301", label: "SWF-Sviluppo" },
  { id: "302", label: "SWF-Test" },
];

/*export const globalProcedure = [
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
];*/

export const emptyProp: PropType = { id: "", label: "" };

export const globalProcedure = [
  { id: "324", label: "ASS_SWB Assistenza Software di Base" },
  { id: "774", label: "B2B – E-commerce" },
  { id: "1098", label: "Euresys" },
  { id: "5015", label: "Euresys cross" },
  { id: "5016", label: "Euresys-Acquisizione timbrature" },
  { id: "1302", label: "Euresys-Controllo Accessi" },
  { id: "1084", label: "Euresys-HR" },
  { id: "1301", label: "Euresys-Nota spese" },
  { id: "1300", label: "Euresys-Pianificazione Turni" },
  { id: "1085", label: "Euresys-RP" },
  { id: "1303", label: "Euresys-Timesheet" },
  { id: "34", label: "F24 Gestione Modello F24" },
  { id: "773", label: "HR- HR System" },
  { id: "422", label: "LYNFA F24 Gestione Modello F24" },
  { id: "430", label: "LYNFA STUDIO PAGHE Pratiche dello Studio" },
  { id: "1000", label: "Note spese" },
  { id: "8203", label: "People App" },
  { id: "650", label: "SOFTWARE-TS Altro SW TS" },
  { id: "60", label: "STSCALC Motore di calcolo studi di settore (quesiti sistemistici)" },
  { id: "69", label: "STUDIO PAGHE Pratiche dello Studio" },
];
