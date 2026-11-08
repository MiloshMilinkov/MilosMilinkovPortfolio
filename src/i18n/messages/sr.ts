import type { Education, Role } from '../../data/types.ts'
import type { Messages } from './en.ts'

/** Serbian plural: 1 / 2–4 / 5+ (with 11–14 taking the 5+ form). */
const plural = (n: number, one: string, few: string, many: string) => {
  const d = n % 10
  const t = n % 100
  if (d === 1 && t !== 11) return one
  if (d >= 2 && d <= 4 && (t < 12 || t > 14)) return few
  return many
}

export const sr: Messages = {
  meta: {
    title: 'Miloš Milinkov — Sajtovi i veb aplikacije za firme',
    description:
      'Miloš Milinkov pravi brze sajtove i veb aplikacije za firme, lako vidljive na Google-u: dizajn, izrada i hosting iz Beograda.',
    ogImageAlt: 'Miloš Milinkov — brzi, moderni sajtovi i veb aplikacije za firme',
    jobTitle: 'Full-stack veb programer',
  },
  a11y: {
    skip: 'Preskoči na sadržaj',
    newTab: '(otvara se u novoj kartici)',
    toTop: 'Miloš Milinkov — na vrh stranice',
  },
  header: {
    menu: 'Meni',
    cta: 'Započnimo projekat',
    languages: 'Jezik',
  },
  nav: {
    services: 'Usluge',
    projects: 'Radovi',
    process: 'Proces',
    hosting: 'Hosting',
    about: 'O meni',
    contact: 'Kontakt',
  },
  hero: {
    pill: 'Sajtovi i veb aplikacije za firme',
    headline: 'Brzi, moderni sajtovi koji vam donose klijente.',
    lead: 'Ja sam Miloš, full-stack programer iz Beograda. Dizajniram, pravim i hostujem sajtove i veb aplikacije za firme: brzi na svakom telefonu, lako se pronalaze na Google-u, i održavani i posle objave.',
    primary: 'Započnimo projekat',
    secondary: 'Pogledajte radove',
    roleLine: 'Full-stack veb programer iz Beograda',
    portraitAlt: 'Portret Miloša Milinkova',
    liveValue: (n: number) => `${n} ${plural(n, 'sajt', 'sajta', 'sajtova')} za klijente — online`,
    liveText: 'Advokatska kancelarija i fitnes trener: oba sajta sam napravio, objavio i održavam.',
    statsLabel: 'Ukratko',
    stats: {
      years: 'godina u produkciji',
      projects: 'urađenih projekata',
      pagespeed: 'PageSpeed ocena ovog sajta (mobilni)',
    },
  },
  services: {
    title: 'Šta mogu da napravim za vas',
    lede: 'Od prvog sajta za vašu firmu do veb aplikacije po meri: dizajn, izrada i hosting od jednog programera koji odgovara na vaše mejlove.',
    includesLabel: (title: string) => `${title} — uključeno`,
    items: {
      websites: {
        title: 'Sajtovi za firme',
        summary: 'Brz sajt prilagođen telefonima, koji jasno objašnjava čime se bavite i olakšava kupcima da vas kontaktiraju.',
        includes: ['Dizajn po meri vašeg brenda', 'Prilagođen telefonima', 'SEO i mapa sajta', 'Linkovi za kontakt i zakazivanje'],
      },
      'web-apps': {
        title: 'Veb aplikacije i kontrolne table',
        summary: 'Alati po meri vašeg posla: portali za klijente, admin paneli, interne kontrolne table i radni tokovi.',
        includes: ['Brz, prilagodljiv interfejs', 'Bezbedan server i API', 'Pouzdana baza podataka', 'Prijave i korisničke uloge'],
      },
      content: {
        title: 'Sadržaj koji sami menjate',
        summary: 'Objavljujte tekstove i menjajte stranice sami, kroz jednostavan admin editor sa pregledom uživo.',
        includes: ['Jednostavan admin editor', 'Tekstovi sa slikama', 'SEO za svaku stranicu', 'Slike optimizovane za brzinu'],
      },
      care: {
        title: 'Hosting, brzina i održavanje',
        summary: 'Objava, domen i SSL, bezbednosna podešavanja i redovna ažuriranja, da sajt ostane brz i dostupan.',
        includes: ['Brz globalni hosting', 'Sopstveni domen i SSL', 'Dobre bezbednosne prakse', 'Ažuriranja i ispravke'],
      },
    },
    ctaText: 'Niste sigurni šta vam treba? Opišite svoj posao i predložiću najjednostavnije rešenje, uz besplatnu ponudu.',
    ctaButton: 'Zatražite besplatnu ponudu',
  },
  projects: {
    title: 'Izdvojeni radovi',
    lede: 'Sajtovi za klijente i demo sajtovi koje možete posetiti već danas, plus aplikacije i sistemi koje sam napravio. Sajtovi se otvaraju u novoj kartici; projekti koji nisu objavljeni vode na izvorni kod.',
    archiveTitle: 'Još na GitHub-u',
    status: { live: 'Online', source: 'Samo kod', classified: 'Poverljivo' },
    links: {
      visit: 'Posetite sajt',
      source: 'Kod',
      viewSource: 'Pogledajte kod na GitHub-u',
      noteSource: 'Nije javno objavljen — pogledajte izvorni kod na GitHub-u.',
      noteClassified: 'Interni sistem pod ugovorom o poverljivosti — detalji na upit.',
    },
    screenshotAlt: (title: string) => `Snimak ekrana sajta ${title}`,
    items: {
      'advokat-vladic': {
        kind: 'Sajt advokatske kancelarije',
        summary: 'Brz sajt advokatske kancelarije sa blogom koji kancelarija sama vodi i SEO podešavanjima na svakoj stranici.',
        highlights: [
          'Admin editor za blog sa pregledom uživo.',
          '11 postojećih tekstova preneto na novi sajt.',
          'Mapa sajta i SEO za oblasti prava i tekstove.',
        ],
      },
      arizonalifts: {
        kind: 'Sajt fitnes trenerke',
        summary: 'Sajt za fitnes trenerku @arizonalifts, koji razvijam, hostujem i održavam.',
        highlights: ['Brz sajt na jednoj stranici, prilagođen telefonima, na domenu klijenta.', 'Stalni razvoj i održavanje za klijenta.'],
      },
      'little-fern-coffee': {
        kind: 'Demo sajt za kafić u komšiluku',
        summary: 'Demo sajt za izmišljeni kafić, napravljen da lokalnim firmama pokaže kako bi njihov sajt mogao da izgleda.',
        highlights: [
          'Oznaka „otvoreno / zatvoreno“ uživo, po beogradskom vremenu.',
          'Meni u stilu školske table, sa karticama za kafu, ostala pića i peciva.',
          'Radno vreme sa istaknutim današnjim danom, lista događaja i ilustrovana mapa.',
          'Lagane stranice koje se gotovo trenutno učitavaju na svakom telefonu.',
        ],
      },
      'mabels-chair': {
        kind: 'Demo sajt za frizerski salon i berbernicu',
        summary:
          'Demo sajt za izmišljeni frizerski salon i berbernicu, napravljen da lokalnim firmama pokaže kako bi njihov sajt mogao da izgleda.',
        highlights: [
          'Uvodni deo sa osvetljenim ogledalom i oznakom „otvoreno / zatvoreno“ uživo.',
          'Cenovnik, galerija radova, tim i utisci klijenata.',
          'Forma za zakazivanje pored adrese i radnog vremena (demo: ništa se ne šalje).',
          'Lagane stranice koje se gotovo trenutno učitavaju na svakom telefonu.',
        ],
      },
      projectanvil: {
        kind: 'Radni prostor za projekte, zadatke i znanje',
        summary:
          'Aplikacija koja se instalira i radi i bez interneta: projekti, zadaci, beleške, platna, graf veza i zapisi odluka.',
        highlights: [
          'Timski prostori sa ulogama Viewer / Editor / Admin, zajedničko uređivanje uživo, pominjanja i obaveštenja.',
          'Zadaci koji se ponavljaju, sa podsetnicima po vremenskim zonama, grupno uređivanje i sačuvani prikazi.',
          'Ojačana bezbednost, proverene rezervne kopije sa vraćanjem i automatski testovi u svim glavnim pregledačima.',
          'Napravljeno uz pomoć veštačke inteligencije: ja sam postavio arhitekturu, standarde i dokumentaciju, a AI agenti su implementirali pod mojim nadzorom.',
        ],
      },
      euronet: {
        kind: 'Interni sistemi u Euronet Worldwide-u',
        year: '2022 — danas',
        summary: 'Automatsko fakturisanje, praćenje plaćanja i izveštaji mejlom za finansijske i računovodstvene timove.',
        highlights: [
          'Automatsko generisanje faktura i praćenje plaćanja.',
          'Automatski DCC izveštaji mejlom, sa logikom izveštaja u bazi podataka.',
          'Tokovi podataka koji prenose i obrađuju podatke između internih i eksternih sistema.',
          'Brže finansijsko poslovanje i tačniji, pravovremeni izveštaji za donošenje odluka.',
        ],
      },
      'silicon-lottery': {
        kind: 'Veb prodavnica (diplomski rad)',
        summary: 'Online prodavnica računarskih komponenti, napravljena kao moj diplomski rad.',
        highlights: ['Odvojeni bekend i frontend, sa slojevitom arhitekturom.', 'Pokreće se u kontejnerima, jednom komandom.'],
      },
    },
  },
  process: {
    title: 'Kako ćemo sarađivati',
    lede: 'Četiri jasna koraka, a vi ste uključeni u svaki. Bez iznenađenja oko obima posla i cene.',
    steps: [
      { title: 'Dogovor', text: 'Kratak razgovor ili mejl o vašim ciljevima, stranicama i roku. Dobijate jasnu, besplatnu ponudu.' },
      { title: 'Dizajn', text: 'Izgled koji odgovara vašem brendu, koji zajedno pregledamo pre nego što napišem ijednu liniju koda.' },
      { title: 'Izrada', text: 'Brze, pristupačne stranice, testirane na telefonima i računarima, sa SEO podešavanjima od početka.' },
      { title: 'Objava i održavanje', text: 'Hosting, domen i analitika su podešeni. Ostajem tu za izmene, ispravke i nove funkcije.' },
    ],
  },
  hosting: {
    title: 'Hosting na vašem nalogu',
    lede: 'Vaš sajt je na Cloudflare nalogu koji pripada vama, a ne meni. Podešavanje traje oko 10 minuta i nikada ne delite lozinku.',
    reasons: [
      { title: 'Vi ste vlasnik', text: 'Vaš sajt, domen i podaci ostaju na vašem nalogu.' },
      {
        title: 'Vi kontrolišete troškove',
        text: 'Cloudflare je besplatan za većinu manjih sajtova. Ako ikada pređete na plaćeni plan, račun stiže vama.',
      },
      {
        title: 'Bezbedno je',
        text: 'Nikome ne dajete lozinku. Mene samo pozivate kao člana, a pristup možete da ukinete kad god želite.',
      },
    ],
    stepsTitle: 'Kako to funkcioniše',
    steps: [
      {
        title: 'Napravite besplatan nalog',
        text: 'Registrujte se na dash.cloudflare.com/sign-up svojom e-mail adresom, potvrdite je i uključite dvofaktorsku autentifikaciju.',
      },
      {
        title: 'Pozovite me kao člana',
        text: 'U delu Manage account → Members kliknite na Invite, upišite moju e-mail adresu i izaberite ulogu Administrator.',
      },
      {
        title: 'Ja objavljujem vaš sajt',
        text: 'Podešavam domen i objavljujem projekat na vaš nalog. Ne morate ništa više da radite, a nije vam potreban ni GitHub nalog.',
      },
      {
        title: 'Kontrola ostaje kod vas',
        text: 'Naplata i članovi ostaju samo vama, a moj pristup možete da ukinete u bilo kom trenutku. Sajt ostaje na vašem nalogu.',
      },
    ],
    neverTitle: 'Nikome ne šaljite',
    never: [
      'Lozinku za Cloudflare',
      'Kodove iz aplikacije za dvofaktorsku autentifikaciju',
      'Podatke o platnoj kartici mejlom ili porukom (njih sami unosite, u delu Billing)',
      'Vaš „Global API Key“',
    ],
    costsTitle: 'Troškovi',
    costs:
      'Besplatan plan je dovoljan za većinu manjih sajtova. Ako ga vaš sajt prevaziđe, javiću vam, a vi odlučujete o prelasku: plaćeni planovi počinju od oko 5 USD mesečno (cene se mogu menjati).',
    guideTitle: 'Vodič korak po korak',
    guideText: 'PDF od dve strane sa svakim klikom, da ga sačuvate ili prosledite osobi koja vodi vaše naloge.',
    guideButton: 'Preuzmite vodič (PDF)',
    guideOther: 'Dostupno i na:',
  },
  about: {
    title: 'O meni',
    bio: [
      'Programer sam sa više od 4 godine iskustva u izradi finansijskih back-office sistema i sistema za izveštavanje u kompaniji Euronet Worldwide. Pored toga pravim sajtove i veb aplikacije za firme, od sajtova za male firme do kompletnog radnog prostora za upravljanje projektima.',
      'Strast prema video igrama od detinjstva podstiče radoznalost, kreativnost i rešavanje problema koje unosim u svaki projekat.',
    ],
    factsLabel: 'Ukratko o meni',
    basedIn: 'Lokacija',
    location: 'Beograd, Srbija',
    languagesTitle: 'Jezici',
    languages: ['Srpski — maternji', 'Engleski — tečno'],
    interestsTitle: 'Interesovanja',
    interests: ['Softversko inženjerstvo', 'Razvoj uz pomoć AI-ja', 'Video igre', 'Fitnes'],
  },
  skills: {
    title: 'Kako radim i šta koristim',
    lede: 'AI agenti za programiranje su deo mog svakodnevnog rada. Koristim Claude Code i OpenAI Codex za planiranje, implementaciju, testiranje i dokumentovanje funkcija, dok arhitektura, pregled koda i kontrola kvaliteta ostaju na meni.',
    tablistLabel: 'Grupe veština',
    groups: {
      backend: { label: 'Bekend', blurb: 'C# i .NET u produkciji od 2022; Node.js i Express za full-stack projekte.' },
      frontend: { label: 'Frontend', blurb: 'Vue 3 + Vite mi je podrazumevani izbor za sajtove i aplikacije, uz TypeScript gde se isplati.' },
      data: { label: 'Podaci', blurb: 'Uskladištene procedure, optimizacija upita i SSIS tokovi koji prenose finansijske podatke između sistema.' },
      ai: { label: 'AI', blurb: 'Agenti planiraju, implementiraju, testiraju i dokumentuju pod mojim nadzorom — arhitektura i kvalitet su na meni.' },
      tools: { label: 'Alati', blurb: 'Kontrola verzija, kontejneri, testiranje u pregledačima i hosting na mreži za pouzdane isporuke.' },
    },
    tiers: { core: 'Glavno', proficient: 'Napredno', familiar: 'Osnovno' },
    usedIn: (n: number) => `Korišćeno u ${n} ${plural(n, 'projektu', 'projekta', 'projekata')}`,
    readoutIn: 'u ovim projektima:',
    readoutNone: 'je deo mog svakodnevnog rada, a ne jednog navedenog projekta.',
    hint: 'Izaberite alat da vidite koji ga moji projekti koriste.',
  },
  experience: {
    title: 'Iskustvo',
    lede: 'Od najnovijeg. Otvorite stavku za detalje.',
    roles: [
      {
        title: 'Programer softverskih aplikacija',
        org: 'Euronet Worldwide',
        place: 'Beograd',
        period: '2022 — danas',
        points: [
          { label: 'Finansijski back-office', text: 'Razvijam i održavam sistem koji automatizuje izradu faktura i praćenje plaćanja.' },
          {
            label: 'DCC izveštavanje',
            text: 'Napravio sam automatsko slanje izveštaja mejlom za finansijske i računovodstvene timove, sa celom logikom izveštaja u složenim uskladištenim procedurama.',
          },
          { label: 'Integracija podataka', text: 'Dizajniram tokove podataka koji prenose i obrađuju podatke između internih i eksternih sistema.' },
          {
            label: 'Optimizacija baze',
            text: 'Pišem, optimizujem i objavljujem napredne uskladištene procedure, uz dobre SQL prakse za integritet, brzinu i skalabilnost.',
          },
          { text: 'Pravim finansijske izveštaje i sarađujem sa različitim timovima da funkcije odgovaraju poslovnim potrebama.' },
        ],
      },
      {
        title: 'Frilens veb programer',
        org: 'Samostalno',
        place: 'Beograd',
        period: '2024 — danas',
        points: [
          {
            text: 'Pravim sajtove za male firme — advokatsku kancelariju, građevinsku firmu i fitnes trenerku — od zahteva i izrade do SEO-a, objave i održavanja.',
          },
          { text: 'Koristim AI agente da ubrzam isporuku, a kod ostaje pregledan, testiran i dokumentovan.' },
        ],
      },
      {
        title: 'Predavač programiranja',
        org: 'Kliker IT centar za decu',
        place: 'Beograd',
        period: '2021 — 2023',
        points: [
          { label: 'Kursevi', text: 'Osmislio sam i predavao početne kurseve programiranja i izrade igara za decu različitog uzrasta.' },
          {
            label: 'Nastava i materijali',
            text: 'Prilagođavao sam metode nivou svake grupe i održavao materijale u skladu sa trendovima u programiranju.',
          },
          { label: 'Mentorstvo', text: 'Obučavao sam i mentorisao nove predavače.' },
        ],
      },
    ] as Role[],
    education: [
      {
        degree: 'Diplomirani inženjer računarstva (osnovne studije)',
        school: 'Visoka škola elektrotehnike i računarstva',
        place: 'Beograd',
        period: '2019 — 2023',
        points: [
          'Usmerenje na objektno orijentisano programiranje, uz uravnotežen rad na bekendu i frontendu.',
          'Diplomski rad „Silicon Lottery“: full-stack veb prodavnica računarskih komponenti.',
        ],
      },
    ] as Education[],
  },
  contact: {
    title: 'Imate projekat na umu?',
    lede: 'Recite mi nešto o svom poslu i šta sajt treba da radi. Odgovoriću sa idejama i besplatnom ponudom.',
    emailButton: 'Pišite mi o projektu',
    copyButton: 'Kopiraj mejl',
    copyAria: 'Kopiraj e-mail adresu',
    copied: 'E-mail adresa je kopirana',
    copyFailed: (email: string) => `Kopiranje nije uspelo — adresa je ${email}`,
    mailSubject: 'Novi projekat sajta',
    labels: { email: 'E-mail', linkedin: 'LinkedIn', github: 'GitHub', location: 'Lokacija' },
  },
  footer: {
    built: 'Dizajn, izrada i hosting: ja.',
    source: 'Izvorni kod na GitHub-u',
    top: 'Na vrh',
  },
}
