
import React, { useMemo, useState } from "react";
import { Calendar, MapPin, Baby, Gift, Mail, Phone, PartyPopper, Languages } from "lucide-react";

export default function App() {
  const [lang, setLang] = useState("el");
  const t = useMemo(() => translations[lang], [lang]);
  return <div className="p-6"><h1 className="text-3xl font-serif">{t.brand}</h1><p>{t.dateValue}</p></div>;
}

const translations: Record<string, any> = {
  el: { brand: "Γάμος Φίλιππος & Αλεξάνδρα • Βάπτιση Γεωργίου", dateValue: "Παρασκευή • 13 Ιουνίου 2025" },
  en: { brand: "Wedding Filippos & Alexandra • Baptism Georgios", dateValue: "Friday • 13 Jun 2025" }
};
