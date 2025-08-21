
import React, { useEffect, useMemo, useState } from "react";
import { Languages, PartyPopper } from "lucide-react";

type Lang = "el" | "en";

const IMG_STEFANA = "https://images.unsplash.com/photo-1610715817279-9b64ac2f1d1d?q=80&w=800&auto=format&fit=crop";
const IMG_BAPTISM_CROSS = "https://images.unsplash.com/photo-1589987707462-bd2c58e445cb?q=80&w=800&auto=format&fit=crop";

export default function App() {
  const [lang, setLang] = useState<Lang>("el");
  const t = useMemo(() => translations[lang], [lang]);

  const EVENT_ISO = "2026-06-13T19:30:00+03:00";
  const target = useMemo(() => new Date(EVENT_ISO), []);
  const [diffMs, setDiffMs] = useState(() => target.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setDiffMs(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const past = diffMs <= 0;
  const remaining = Math.max(0, diffMs);
  const countdown = {
    d: Math.floor(remaining / (1000*60*60*24)),
    h: Math.floor((remaining / (1000*60*60)) % 24),
    m: Math.floor((remaining / (1000*60)) % 60),
    s: Math.floor((remaining / 1000) % 60),
  };

  const [ibanVisible, setIbanVisible] = useState(false);
  function nextLang(cur: Lang) { return cur === "el" ? "en" : "el"; }

  function handleRSVP(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")||"").trim();
    const email = String(form.get("email")||"").trim();
    const guests = String(form.get("guests")||"").trim();
    const attending = String(form.get("attending")||"yes");
    const notes = String(form.get("notes")||"").trim();
    if (!name || !email) { alert(t.alertFill); return; }
    const subject = encodeURIComponent("RSVP");
    const body = encodeURIComponent(`${t.formName}: ${name}\nEmail: ${email}\n${t.formGuests}: ${guests}\n${t.formAttendingYes}/${t.formAttendingNo}: ${attending}\n${t.formNotes}: ${notes}`);
    window.location.href = `mailto:${t.contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="text-ink">
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-black/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="uppercase tracking-wideish text-xs">{t.brandSmall}</div>
          <div className="flex items-center gap-3">
            <button className="text-xs border px-3 py-1 rounded-full" onClick={() => setLang(nextLang(lang))}>
              <span className="inline-flex items-center gap-2"><Languages className="w-4 h-4"/>{lang.toUpperCase()}</span>
            </button>
            <a href="#rsvp" className="text-xs border px-3 py-1 rounded-full">RSVP</a>
          </div>
        </div>
      </header>

      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 py-14 grid md:grid-cols-3 gap-6 items-center">
          <img className="hidden md:block rounded-lg mono object-cover h-56 w-full" src={IMG_STEFANA} alt="Στέφανα γάμου" />
          <div className="text-center">
            <div className="text-sm tracking-wideish">{t.brandSmall}</div>
            <h1 className="font-display text-6xl md:text-7xl tracking-widest my-3">13 · 06 · 2026</h1>
            <p className="thin">{t.heroSub}</p>
          </div>
          <img className="hidden md:block rounded-lg mono object-cover h-56 w-full" src={IMG_BAPTISM_CROSS} alt="Βαπτιστικός σταυρός" />
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 py-14 text-center">
          <div className="uppercase tracking-wideish text-xs opacity-70">{t.schedulePeek}</div>
          <h2 className="font-display text-3xl md:text-4xl my-3">{t.scheduleTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div><div className="text-2xl">19:30</div><div className="text-xs opacity-70 mt-1">{t.ceremony}</div></div>
            <div><div className="text-2xl">—</div><div className="text-xs opacity-70 mt-1">{t.baptism}</div></div>
            <div><div className="text-2xl">—</div><div className="text-xs opacity-70 mt-1">{t.cocktail}</div></div>
            <div><div className="text-2xl">—</div><div className="text-xs opacity-70 mt-1">{t.reception}</div></div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-5xl mx_auto px-4 py-16 text-center">
          <h3 className="font-display text-3xl">LOCATION</h3>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div>
              <div className="text-xs uppercase opacity-60 mb-2">Saint Dimitrios (Karatasiou)</div>
              <div className="aspect-[16/9] w-full rounded-lg border overflow-hidden">
                <iframe className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=&layer=c&cbll=40.673601,22.9496579&cbp=11,0,0,0,0&hl=el&ie=UTF8&hq=&hnear=&t=m&z=16&output=svembed"></iframe>
              </div>
            </div>
            <div>
              <div className="text-xs uppercase opacity-60 mb-2">Grand De Lux</div>
              <div className="aspect-[16/9] w-full rounded-lg border overflow-hidden">
                <iframe className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=40.6986686,23.043707&z=16&output=embed"></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="uppercase tracking-wideish text-xs opacity-70">{t.countdownIntro}</div>
          {past ? (
            <p className="mt-6 text-sm opacity-80">{t.countdownDone}</p>
          ) : (
            <div className="grid grid-cols-4 gap-6 mt-6">
              <Counter num={countdown.d} label={t.days}/>
              <Counter num={countdown.h} label={t.hours}/>
              <Counter num={countdown.m} label={t.minutes}/>
              <Counter num={countdown.s} label={t.seconds}/>
            </div>
          )}
        </div>
      </section>

      <section id="rsvp" className="bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h3 className="font-display text-3xl text-center mb-8">RSVP</h3>
          <form onSubmit={handleRSVP} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input name="name" placeholder={t.formName} className="border p-3 rounded-lg w-full" />
              <input name="email" type="email" placeholder={t.formEmail} className="border p-3 rounded-lg w-full" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <input name="guests" type="number" min={1} placeholder={t.formGuests} className="border p-3 rounded-lg w-full" />
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="attending" value="yes" defaultChecked/> {t.formAttendingYes}</label>
              <label className="flex items-center gap-2 text-sm"><input type="radio" name="attending" value="no" /> {t.formAttendingNo}</label>
            </div>
            <textarea name="notes" placeholder={t.formNotes} className="border p-3 rounded-lg w-full" />
            <div className="flex gap-3">
              <button type="submit" className="bg-black text-white px-5 py-2 rounded-full">Send</button>
              <button type="reset" className="border px-5 py-2 rounded-full">Clear</button>
            </div>
          </form>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 pb-16 text-center">
          <h3 className="font-display text-2xl mb-3">{t.giftsTitle}</h3>
          <p className="text-sm opacity-80">{t.giftsText}</p>
          <div className="mt-4">
            <button onClick={() => setIbanVisible(v=>!v)} className="border px-4 py-2 rounded-full text-sm">{ibanVisible?'Hide IBAN':'Show IBAN'}</button>
            {ibanVisible && <div className="inline-block border rounded-lg px-4 py-3 text-sm ml-3">IBAN: XXXX</div>}
          </div>
        </div>
      </section>

      <footer className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6 items-center">
          <div className="uppercase tracking-wideish text-xs">{t.contactTitle}</div>
          <div className="text-sm flex items-center gap-3 justify-center md:justify-start">
            <PartyPopper className="w-4 h-4"/><span>{t.contactCouple}</span>
          </div>
          <div className="text-sm flex flex-col items-center md:items-end gap-1">
            <span>+30 69X XXX XXXX</span>
            <span>{t.contactEmail}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Counter({num, label}:{num:number,label:string}) {
  return (<div className="text-center"><div className="text-5xl">{String(num).padStart(2,'0')}</div><div className="text-xs opacity-70 mt-1 uppercase tracking-wideish">{label}</div></div>);
}

const translations: Record<Lang, any> = {
  el: {
    brandSmall: "Φίλιππος & Αλεξάνδρα",
    heroSub: "Γάμος και βάπτιση του Γεωργίου",
    schedulePeek: "Μια ματιά στο πρόγραμμα",
    scheduleTitle: "Πρόγραμμα",
    ceremony: "Τελετή Γάμου",
    baptism: "Βάπτιση",
    cocktail: "—",
    reception: "Δεξίωση",
    countdownIntro: "Αντίστροφη μέτρηση",
    countdownDone: "Η μέρα έφτασε!",
    days: "Ημέρες", hours: "Ώρες", minutes: "Λεπτά", seconds: "Δευτερόλεπτα",
    formName: "Ονοματεπώνυμο", formEmail: "Email", formGuests: "Αριθμός ατόμων",
    formAttendingYes: "Θα έρθω", formAttendingNo: "Δυστυχώς όχι", formNotes: "Αλλεργίες, σχόλια",
    giftsTitle: "Δώρα", giftsText: "Η παρουσία σας είναι το καλύτερο δώρο. Αν θέλετε, μπορείτε να συνεισφέρετε μέσω IBAN.",
    contactTitle: "Επικοινωνία", contactCouple: "Επικοινωνία με το ζευγάρι",
    contactEmail: "f.iliadis@icloud.com",
    alertFill: "Συμπληρώστε όνομα και email."
  },
  en: {
    brandSmall: "Filippos & Alexandra",
    heroSub: "Wedding and Georgios’ baptism",
    schedulePeek: "Here’s a sneak peek",
    scheduleTitle: "Our special day’s schedule",
    ceremony: "Ceremony",
    baptism: "Baptism",
    cocktail: "—",
    reception: "Reception",
    countdownIntro: "Let the countdown begin",
    countdownDone: "The day is here!",
    days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds",
    formName: "Your full name", formEmail: "Email", formGuests: "Number of guests",
    formAttendingYes: "Attending", formAttendingNo: "Can't make it", formNotes: "Allergies, notes",
    giftsTitle: "Gifts", giftsText: "Your presence is the best gift. If you wish, you can contribute via IBAN.",
    contactTitle: "Contact", contactCouple: "Contact the couple",
    contactEmail: "f.iliadis@icloud.com",
    alertFill: "Please fill your name and email."
  }
};
