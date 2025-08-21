
import React, { useEffect, useMemo, useState } from "react";
import { MapPin, PartyPopper, Gift, Languages } from "lucide-react";

type Lang = "el" | "en";

export default function App() {
  const [lang, setLang] = useState<Lang>("el");
  const t = useMemo(() => translations[lang], [lang]);

  // Countdown to 2025-06-13 19:30 local
  const target = useMemo(() => new Date("2025-06-13T19:30:00"), []);
  const [countdown, setCountdown] = useState<{d:number,h:number,m:number,s:number}>({d:0,h:0,m:0,s:0});
  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, target.getTime() - now);
      const d = Math.floor(diff / (1000*60*60*24));
      const h = Math.floor((diff / (1000*60*60)) % 24);
      const m = Math.floor((diff / (1000*60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setCountdown({d,h,m,s});
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  // RSVP handling
  const GOOGLE_FORM_ACTION = "";
  const fieldMap = { name: "entry.111111", email: "entry.222222", guests: "entry.333333", attending: "entry.444444", notes: "entry.555555" };
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
      formEl.reset(); return;
    }
    const subject = encodeURIComponent("RSVP");
    const body = encodeURIComponent(`${t.formName}: ${name}\nEmail: ${email}\n${t.formGuests}: ${guests}\n${t.formAttendingYes}/${t.formAttendingNo}: ${attending}\n${t.formNotes}: ${notes}`);
    window.location.href = `mailto:${t.contactEmail}?subject=${subject}&body=${body}`;
  }

  const [ibanVisible, setIbanVisible] = useState(false);

  function nextLang(cur: Lang) { return cur === "el" ? "en" : "el"; }

  return (
    <div className="text-ink">
      {/* NAV */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-black/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="uppercase tracking-wideish text-xs">{t.navOurStory}</div>
          <div className="flex items-center gap-3">
            <button className="text-xs border px-3 py-1 rounded-full" onClick={() => setLang(nextLang(lang))}>
              <span className="inline-flex items-center gap-2"><Languages className="w-4 h-4"/>{lang.toUpperCase()}</span>
            </button>
            <a href="#rsvp" className="text-xs border px-3 py-1 rounded-full">RSVP</a>
          </div>
        </div>
      </header>

      {/* HERO date-focused */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 py-14 grid md:grid-cols-3 gap-6 items-center">
          <img className="hidden md:block rounded-lg mono object-cover h-56 w-full" src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop" alt="" />
          <div className="text-center">
            <div className="text-sm tracking-wideish">{t.brandSmall}</div>
            <h1 className="font-display text-6xl md:text-7xl tracking-widest my-3">13 · 06 · 2025</h1>
            <p className="thin">{t.heroSub}</p>
          </div>
          <img className="hidden md:block rounded-lg mono object-cover h-56 w-full" src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop" alt="" />
        </div>
      </section>

      {/* SCHEDULE band */}
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

      {/* LOCATION with central image */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <h3 className="font-display text-3xl">LOCATION</h3>
          <div className="grid md:grid-cols-3 gap-6 items-center mt-8">
            <div className="text-left text-sm">{t.leftVenue}</div>
            <img className="rounded-lg mono object-cover h-64 w-full" src="https://images.unsplash.com/photo-1454537468202-b7ff71d51c2e?q=80&w=1000&auto=format&fit=crop" alt="" />
            <div className="text-right text-sm">{t.rightVenue}</div>
          </div>
          <a href="#map" className="inline-block mt-4 text-xs border px-3 py-1 rounded-full">MAP</a>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="uppercase tracking-wideish text-xs opacity-70">{t.countdownIntro}</div>
          <div className="grid grid-cols-4 gap-6 mt-6">
            <Counter num={countdown.d} label={t.days}/>
            <Counter num={countdown.h} label={t.hours}/>
            <Counter num={countdown.m} label={t.minutes}/>
            <Counter num={countdown.s} label={t.seconds}/>
          </div>
        </div>
      </section>

      {/* RSVP minimal */}
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

      {/* GIFTS / IBAN reveal */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 pb-16 text-center">
          <h3 className="font-display text-2xl mb-3">{t.giftsTitle}</h3>
          <p className="text-sm opacity-80">{t.giftsText}</p>
          <div className="mt-4">
            {!ibanVisible ? (
              <button onClick={() => setIbanVisible(true)} className="border px-4 py-2 rounded-full text-sm">Show IBAN</button>
            ) : (
              <div className="inline-block border rounded-lg px-4 py-3 text-sm">IBAN: XXXX</div>
            )}
          </div>
        </div>
      </section>

      {/* MAPS */}
      <section id="map" className="bg-white">
        <div className="max-w-5xl mx-auto px-4 pb-20 grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-xs uppercase opacity-60 mb-2">Saint Dimitrios</div>
            <div className="aspect-[16/9] w-full rounded-lg border overflow-hidden">
              <iframe className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=40.673601,22.9496579&z=16&output=embed"></iframe>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase opacity-60 mb-2">Grand De Lux</div>
            <div className="aspect-[16/9] w-full rounded-lg border overflow-hidden">
              <iframe className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=40.6986686,23.043707&z=16&output=embed"></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
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
  return (
    <div className="text-center">
      <div className="text-5xl">{String(num).padStart(2,'0')}</div>
      <div className="text-xs opacity-70 mt-1 uppercase tracking-wideish">{label}</div>
    </div>
  );
}

const translations: Record<Lang, any> = {
  el: {
    navOurStory: "Η ιστορία μας",
    brandSmall: "Φίλιππος & Αλεξάνδρα",
    heroSub: "Γάμος και βάπτιση του Γεωργίου",
    schedulePeek: "Μια ματιά στο πρόγραμμα",
    scheduleTitle: "Πρόγραμμα",
    ceremony: "Τελετή Γάμου",
    baptism: "Βάπτιση",
    cocktail: "—",
    reception: "Δεξίωση",
    leftVenue: "Saint Dimitrios Holy Orthodox Church (Karatasiou)",
    rightVenue: "Grand De Lux",
    countdownIntro: "Αντίστροφη μέτρηση",
    days: "Ημέρες", hours: "Ώρες", minutes: "Λεπτά", seconds: "Δευτερόλεπτα",
    formName: "Ονοματεπώνυμο", formEmail: "Email", formGuests: "Αριθμός ατόμων",
    formAttendingYes: "Θα έρθω", formAttendingNo: "Δυστυχώς όχι", formNotes: "Αλλεργίες, σχόλια",
    giftsTitle: "Δώρα", giftsText: "Η παρουσία σας είναι το καλύτερο δώρο. Αν θέλετε, μπορείτε να συνεισφέρετε μέσω IBAN.",
    contactTitle: "Επικοινωνία", contactCouple: "Επικοινωνία με το ζευγάρι",
    contactEmail: "f.iliadis@icloud.com",
    alertFill: "Συμπληρώστε όνομα και email.",
    alertThanks: "Ευχαριστούμε, {name}! Καταγράψαμε τη συμμετοχή: {attending}.",
    attendingYes: "Θα έρθω", attendingNo: "Δεν θα έρθω",
  },
  en: {
    navOurStory: "Our story",
    brandSmall: "Filippos & Alexandra",
    heroSub: "Wedding and Georgios’ baptism",
    schedulePeek: "Here’s a sneak peek",
    scheduleTitle: "Our special day’s schedule",
    ceremony: "Ceremony",
    baptism: "Baptism",
    cocktail: "—",
    reception: "Reception",
    leftVenue: "Saint Dimitrios Holy Orthodox Church (Karatasiou)",
    rightVenue: "Grand De Lux",
    countdownIntro: "Let the countdown begin",
    days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds",
    formName: "Your full name", formEmail: "Email", formGuests: "Number of guests",
    formAttendingYes: "Attending", formAttendingNo: "Can't make it", formNotes: "Allergies, notes",
    giftsTitle: "Gifts", giftsText: "Your presence is the best gift. If you wish, you can contribute via IBAN.",
    contactTitle: "Contact", contactCouple: "Contact the couple",
    contactEmail: "f.iliadis@icloud.com",
    alertFill: "Please fill your name and email.",
    alertThanks: "Thanks, {name}! We've recorded your RSVP: {attending}.",
    attendingYes: "Attending", attendingNo: "Not attending",
  }
};
