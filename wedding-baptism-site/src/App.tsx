
import React, { useMemo, useState } from "react";
import { Calendar, MapPin, Baby, Gift, Mail, Phone, PartyPopper, Languages } from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<"el" | "en">("el");
  const t = useMemo(() => translations[lang], [lang]);

  const GOOGLE_FORM_ACTION = ""; // paste Google Form formResponse URL if you want silent submissions
  const fieldMap = { name: "entry.111111", email: "entry.222222", guests: "entry.333333", attending: "entry.444444", notes: "entry.555555" };

  function nextLang(current: "el" | "en") { return current === "el" ? "en" : "el"; }

  function handleRSVP(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const guests = String(form.get("guests") || "").trim();
    const attending = String(form.get("attending") || "yes");
    const notes = String(form.get("notes") || "").trim();
    if (!name || !email) { alert(t.alertFill); return; }

    if (GOOGLE_FORM_ACTION) {
      const data = new FormData();
      data.append(fieldMap.name, name);
      data.append(fieldMap.email, email);
      data.append(fieldMap.guests, guests);
      data.append(fieldMap.attending, attending);
      data.append(fieldMap.notes, notes);
      fetch(GOOGLE_FORM_ACTION, { method: "POST", mode: "no-cors", body: data });
      alert(t.alertThanks.replace("{name}", name).replace("{attending}", attending === "yes" ? t.attendingYes : t.attendingNo));
      formEl.reset();
      return;
    }

    const subject = encodeURIComponent("RSVP");
    const body = encodeURIComponent(`${t.formName}: ${name}\nEmail: ${email}\n${t.formGuests}: ${guests}\n${t.formAttendingYes}/${t.formAttendingNo}: ${attending}\n${t.formNotes}: ${notes}`);
    window.location.href = `mailto:${t.contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="min-h-screen bg-[conic-gradient(at_50%_-10%,#f8fafc,#ffffff,#f8fafc)] text-slate-800">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-serif text-xl tracking-wide">{t.brand}</div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm rounded-2xl border" onClick={() => setLang(nextLang(lang))}>
              <span className="inline-flex items-center gap-2"><Languages className="h-4 w-4" /> {lang.toUpperCase()}</span>
            </button>
            <a href="#rsvp"><button className="px-3 py-1 text-sm rounded-2xl bg-slate-900 text-white">{t.ctaRSVP}</button></a>
          </div>
        </div>
      </header>

      <section className="relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-white/70" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <p className="uppercase tracking-[0.3em] text-sm text-slate-600">{t.headerTag}</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-lg text-slate-700">{t.heroSubtitle}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#details"><button className="px-4 py-2 rounded-2xl border">{t.ctaDetails}</button></a>
              <a href="#rsvp"><button className="px-4 py-2 rounded-2xl bg-slate-900 text-white">{t.ctaRSVP}</button></a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl bg-white/60 border grid place-items-center shadow-xl">
              <div className="text-center p-6">
                <div className="text-sm text-slate-500">{t.dateLabel}</div>
                <div className="font-serif text-3xl mt-1">{t.dateValue}</div>
                <div className="mt-4 text-slate-600">{t.whereShort}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="details" className="max-w-6xl mx-auto px-4 pb-8 grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl shadow bg-white">
          <div className="p-4 border-b"><div className="flex items-center gap-2 text-xl"><Calendar className="h-5 w-5" /> {t.when}</div></div>
          <div className="p-4 text-slate-600 space-y-1">
            <p className="font-medium">{t.dateValue}</p>
            <p>{t.timelineCeremony}</p>
            <p>{t.timelineBaptism}</p>
            <p>{t.timelineReception}</p>
          </div>
        </div>
        <div className="rounded-2xl shadow bg-white">
          <div className="p-4 border-b"><div className="flex items-center gap-2 text-xl"><MapPin className="h-5 w-5" /> {t.where}</div></div>
          <div className="p-4 text-slate-600 space-y-1">
            <p className="font-medium">{t.venueWedding}</p>
            <p>{t.venueBaptism}</p>
            <p>{t.venueReception}</p>
            <a href="#map" className="text-slate-700 underline">{t.viewMap}</a>
          </div>
        </div>
        <div className="rounded-2xl shadow bg-white">
          <div className="p-4 border-b"><div className="flex items-center gap-2 text-xl"><Baby className="h-5 w-5" /> {t.baptism}</div></div>
          <div className="p-4 text-slate-600 space-y-1">
            <p className="font-medium">{t.childName}</p>
            <p>{t.godparents}</p>
          </div>
        </div>
      </section>

      <section id="rsvp" className="max-w-6xl mx-auto px-4 py-12">
        <div className="rounded-2xl shadow bg-white">
          <div className="p-4 border-b"><div className="flex items-center gap-2 text-2xl"><PartyPopper className="h-5 w-5" /> {t.rsvpTitle}</div></div>
          <div className="p-4">
            <form className="grid md:grid-cols-2 gap-4" onSubmit={handleRSVP}>
              <input name="name" placeholder={t.formName} className="rounded-xl border p-2" />
              <input name="email" type="email" placeholder={t.formEmail} className="rounded-xl border p-2" />
              <input name="guests" type="number" min={1} placeholder={t.formGuests} className="rounded-xl border p-2" />
              <div className="flex gap-4 items-center text-sm">
                <label className="flex items-center gap-2"><input type="radio" name="attending" value="yes" defaultChecked /> {t.formAttendingYes}</label>
                <label className="flex items-center gap-2"><input type="radio" name="attending" value="no" /> {t.formAttendingNo}</label>
              </div>
              <textarea name="notes" className="md:col-span-2 rounded-xl border p-2" placeholder={t.formNotes} />
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" className="rounded-2xl bg-slate-900 text-white px-4 py-2">{t.submit}</button>
                <button type="reset" className="rounded-2xl border px-4 py-2">{t.reset}</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="rounded-2xl shadow bg-white/70">
          <div className="p-4 border-b"><div className="flex items-center gap-2 text-2xl"><Gift className="h-5 w-5" /> {t.giftsTitle}</div></div>
          <div className="p-4 text-slate-700 space-y-2">
            <p>{t.giftsText}</p>
            <div className="p-4 rounded-xl border bg-white"><span className="font-medium">IBAN:</span> XXXX</div>
          </div>
        </div>
      </section>

      <section id="map" className="max-w-6xl mx-auto px-4 pb-12">
        <div className="rounded-2xl shadow bg-white">
          <div className="p-4 border-b"><div className="flex items-center gap-2 text-2xl"><MapPin className="h-5 w-5" /> {t.mapTitle}</div></div>
          <div className="p-4 grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500 mb-2">Εκκλησία</p>
              <div className="aspect-[16/9] w-full rounded-xl border overflow-hidden">
                <iframe className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=40.673601,22.9496579&z=16&output=embed"></iframe>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-2">Δεξίωση</p>
              <div className="aspect-[16/9] w-full rounded-xl border overflow-hidden">
                <iframe className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=40.6986686,23.043707&z=16&output=embed"></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="rounded-2xl shadow bg-white">
          <div className="p-4 border-b"><div className="flex items-center gap-2 text-2xl"><Mail className="h-5 w-5" /> {t.contactTitle}</div></div>
          <div className="p-4 text-slate-700">
            <p className="font-medium">{t.contactCouple}</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +30 69X XXX XXXX</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> {t.contactEmail}</p>
            <p className="text-sm text-slate-500 mt-2">{t.contactNote}</p>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-slate-500 text-sm">
          <p>{t.footerNote}</p>
        </div>
      </footer>
    </div>
  );
}

const translations: Record<string, any> = {
  en: {
    brand: "Wedding Filippos & Alexandra • Baptism Georgios",
    headerTag: "You're invited",
    heroTitle: "Filippos Iliadis & Alexandra Antoniadou are tying the knot, and baby Georgios is getting baptized",
    heroSubtitle: "Join us for a night of love, family, and too many photos.",
    ctaDetails: "Event details",
    ctaRSVP: "RSVP",
    dateLabel: "Date",
    dateValue: "Friday • 13 Jun 2025",
    whereShort: "Saint Dimitrios (Karatasiou) • Reception at Grand De Lux",
    when: "When",
    where: "Where",
    viewMap: "View map",
    baptism: "Baptism",
    childName: "Georgios",
    godparents: "Godfather: Michalis Avgerinos",
    timelineCeremony: "Wedding ceremony: 19:30 at Saint Dimitrios",
    timelineBaptism: "Baptism: immediately after, same church",
    timelineReception: "Reception: Grand De Lux",
    giftsTitle: "Gifts",
    giftsText: "Your presence is the best gift. If you wish, you can contribute via IBAN.",
    mapTitle: "Locations",
    rsvpTitle: "RSVP",
    formName: "Your full name",
    formEmail: "Email",
    formGuests: "Number of guests",
    formAttendingYes: "Attending",
    formAttendingNo: "Can't make it",
    formNotes: "Allergies, song requests, notes",
    submit: "Send RSVP",
    reset: "Clear",
    contactTitle: "Contact",
    contactCouple: "Contact the couple",
    contactEmail: "f.iliadis@icloud.com",
    contactNote: "No shuttle arranged. If you need transport or accommodation tips, let us know.",
    footerNote: "Made with love. Dress code: cocktail chic.",
    alertFill: "Please fill your name and email.",
    alertThanks: "Thanks, {name}! We've recorded your RSVP: {attending}.",
    attendingYes: "Attending",
    attendingNo: "Not attending",
    venueWedding: "Wedding: Saint Dimitrios Holy Orthodox Church (Karatasiou Military Camp)",
    venueBaptism: "Baptism: immediately after, same church",
    venueReception: "Reception: Grand De Lux",
  },
  el: {
    brand: "Γάμος Φίλιππος & Αλεξάνδρα • Βάπτιση Γεωργίου",
    headerTag: "Είστε καλεσμένοι",
    heroTitle: "Ο Φίλιππος Ηλιάδης και η Αλεξάνδρα Αντωνιάδου παντρεύονται και ο μικρός Γεώργιος βαφτίζεται",
    heroSubtitle: "Μια βραδιά με αγάπη, οικογένεια και πολλές φωτογραφίες.",
    ctaDetails: "Λεπτομέρειες",
    ctaRSVP: "Δήλωση συμμετοχής",
    dateLabel: "Ημερομηνία",
    dateValue: "Παρασκευή • 13 Ιουνίου 2025",
    whereShort: "Άγιος Δημήτριος (Καρατάσιου) • Δεξίωση Grand De Lux",
    when: "Πότε",
    where: "Πού",
    viewMap: "Δείτε τον χάρτη",
    baptism: "Βάπτιση",
    childName: "Γεώργιος",
    godparents: "Νονός: Μιχάλης Αυγερινός",
    timelineCeremony: "Γάμος: 19:30 στον Άγιο Δημήτριο",
    timelineBaptism: "Βάπτιση: αμέσως μετά, ίδια εκκλησία",
    timelineReception: "Δεξίωση: Grand De Lux",
    giftsTitle: "Δώρα",
    giftsText: "Η παρουσία σας είναι το καλύτερο δώρο. Αν θέλετε, μπορείτε να συνεισφέρετε μέσω IBAN.",
    mapTitle: "Τοποθεσίες",
    rsvpTitle: "Δήλωση συμμετοχής",
    formName: "Ονοματεπώνυμο",
    formEmail: "Email",
    formGuests: "Αριθμός ατόμων",
    formAttendingYes: "Θα έρθω",
    formAttendingNo: "Δυστυχώς όχι",
    formNotes: "Αλλεργίες, τραγούδια, σχόλια",
    submit: "Αποστολή",
    reset: "Καθαρισμός",
    contactTitle: "Επικοινωνία",
    contactCouple: "Επικοινωνία με το ζευγάρι",
    contactEmail: "f.iliadis@icloud.com",
    contactNote: "Δεν υπάρχει οργανωμένη μετακίνηση. Αν χρειαστείτε μεταφορά ή προτάσεις διαμονής, ενημερώστε μας.",
    footerNote: "Με αγάπη. Dress code: κοκτέιλ chic.",
    alertFill: "Συμπληρώστε όνομα και email.",
    alertThanks: "Ευχαριστούμε, {name}! Καταγράψαμε τη συμμετοχή: {attending}.",
    attendingYes: "Θα έρθω",
    attendingNo: "Δεν θα έρθω",
    venueWedding: "Γάμος: Saint Dimitrios Holy Orthodox Church (Karatasiou Military Camp)",
    venueBaptism: "Βάπτιση: αμέσως μετά, ίδια εκκλησία",
    venueReception: "Δεξίωση: Grand De Lux",
  }
};
