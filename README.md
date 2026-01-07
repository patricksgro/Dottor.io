# Doctor.io

**Doctor.io** è una piattaforma moderna che permette agli utenti di prenotare visite mediche scegliendo medici e specialisti registrati sulla piattaforma.
Gli utenti possono filtrare medici per **nome, cognome, città o specializzazione**, gestire il proprio profilo, comunicare con i medici tramite **messaggistica istantanea** e pagare le visite direttamente online tramite **Stripe**.

---

## 🚀 Funzionalità principali

### Per i pazienti
- Registrazione e login sicuro.
- Filtraggio dei medici per:
  - Nome e cognome
  - Specializzazione
  - Città
- Prenotazione visite mediche con pagamento Stripe.
- Visualizzazione e modifica del proprio profilo.
- Chat istantanea con medici tramite **Socket.IO**.
- Storico prenotazioni e messaggi.

### Per i medici
- Registrazione e login sicuro.
- Profilo personalizzabile con dati professionali e recapiti.
- Possibilità di ricevere prenotazioni dai pazienti.
- Comunicazione in tempo reale con i pazienti tramite chat.
- Notifiche per nuove prenotazioni e messaggi.

### Sicurezza e autenticazione
- Autenticazione tramite sessioni gestite con **Redis**.
- Possibilità di usare OTP/TOTP per accesso sicuro (backend pronto per estensioni).
- Protezione delle API tramite middleware e rate limiting.
- Sanitizzazione input utente per evitare vulnerabilità XSS.

---

## 🛠 Stack Tecnologico

### Frontend
- **React 19** con **Vite** come bundler.
- **React Router** per gestione delle pagine.
- **React-Bootstrap** e **Bootstrap 5** per UI reattiva.
- **Socket.IO-client** per messaggistica in tempo reale.
- **Axios** per chiamate HTTP.
- **React-Toastify** per notifiche.

### Backend
- **Node.js** + **Express 5**
- **MongoDB** con **Mongoose** per gestione dati utenti, medici e prenotazioni.
- **Redis** con **ioredis** per gestione sessioni e scalabilità chat.
- **Socket.IO** + Redis Adapter per chat realtime.
- **Stripe** per pagamenti.
- **Passport** e crittografia con **bcrypt** per autenticazione.
- **Multer + Cloudinary** per upload immagini profilo.
- **Helmet** e **express-rate-limit** per sicurezza API.
- **Joi** per validazione dei dati.

---

## 💳 Pagamenti
- I pazienti possono pagare le visite direttamente sulla piattaforma.
- Stripe gestisce pagamenti sicuri e conferme di prenotazione.
- Backend integra API Stripe con gestione eventi per prenotazioni confermate.

---

## 💬 Chat Realtime
- Messaggistica tra pazienti e medici tramite **Socket.IO**.
- Redis Adapter permette scalabilità su più istanze server.
- Supporta invio e ricezione messaggi istantanei.
- Storico messaggi salvato in MongoDB per consultazione futura.

---

## 📁 Struttura del progetto

