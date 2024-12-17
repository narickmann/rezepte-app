# 📖 Rezepte-App

Dies ist eine Rezepte-App mit einem simplen Login-System. Die App ermöglicht es angemeldeten Benutzern, Rezepte hinzuzufügen, zu bearbeiten, zu löschen und als Favoriten zu markieren. Nicht angemeldete Benutzer können Rezepte suchen und anzeigen.

---

## 🔧 Status

**Projekt im Rahmen eines JS-Kurses**:  
Dieses Projekt wurde als Abschlussprojekt innerhalb eines JavaScript-Kurses erstellt. Die App wurde in einer Woche entwickelt und stellt den aktuellen Stand des Projekts dar. Es gibt noch einige Funktionen, die verbessert und erweitert werden, z. B. eine optimierte Benutzeroberfläche und Zugangskontrolle für bestimmte Seiten.

Das Projekt ist noch **Work-in-Progress** und wird in der Zukunft weiterentwickelt.

---

### Weitere Änderungen, die noch geplant sind:
- ~~**Benutzeroberfläche**: Verbesserung und Optimierung der Benutzeroberfläche für eine bessere Nutzererfahrung.~~
- ~~**Zugangskontrolle für Seiten**: Derzeit sind Seiten wie z. B. `http://localhost:3000/add-recipe` über direkte Links erreichbar, obwohl sie nur für angemeldete Nutzer zugänglich sein sollten. Diese Funktionalität wird noch angepasst, sodass nicht angemeldete Benutzer an der Navigation zu geschützten Seiten gehindert werden.~~
- ggf. **zulässige Benutzernamen**: Benutzernamen case-insensitive abgleichen -> Namen in Kleinbuchstaben in der DB speichern oder min. abgleichen, damit Benutzer nicht "doppelt" hinzugefügt werden können, weil ein ähnlicher Name verwendet wurde (Bsp: "Nadine" und "nadine").

---

## 🚀 Features

### Funktionen für **angemeldete Benutzer**:
- **Rezepte erstellen**: Neue Rezepte hinzufügen.
- **Rezepte bearbeiten/löschen**: Eigene Rezepte ändern oder entfernen.
- **Favoriten verwalten**: Rezepte als Favoriten speichern oder aus Favoriten entfernen.

### Funktionen für **nicht angemeldete Benutzer**:
- **Rezepte suchen**: Rezepte nach Namen, Zutaten oder Kategorien durchsuchen.
- **Rezepte anzeigen**: Details zu Rezepten einsehen.

---

## 🛠️ Voraussetzungen

1. **CouchDB**:
   - CouchDB muss installiert und lauffähig sein. 
   - Benutzer und Rezepte werden in der CouchDB gespeichert. Die Verbindung wird in einer `credentials.json` konfiguriert.
   
2. **Node.js und npm**:
   - Node.js in Version `16.x` oder höher wird benötigt.
   - Installiere Node.js [hier](https://nodejs.org/).

3. **Proxy**:
   - Stelle sicher, dass der Proxy im Frontend auf die korrekte Backend-Adresse verweist. Standardmäßig ist dies `http://localhost:5000`.

---

## 📂 Projektstruktur

```
rezepteapp/
  └── backend/
      └── controller/          # Funktionen für API-Anfragen
      └── data/
          └── credentials.json # Zugangsdaten für CouchDB
      └── db/                  # Konfiguration/Verbindung zur DB
      └── routes/              # Routen für API-Anfragen
      └── uploads/             # Speicherort für Bilder
      └── server.js            # Verbindung zum Server
  # React-Frontend-Dateien
  └── public/          # Statische Dateien
  └── source/
      └── components/  # React-Komponenten
      └── services/    # Service-Funktionen
      └── views/       # Seitenansichten
  └── App.js, index.js # Einstiegspunkte
```

---

## ⚙️ Einrichtung

### 1. **CouchDB konfigurieren**
- Stelle sicher, dass CouchDB läuft und über `http://127.0.0.1:5984` oder eine andere Adresse erreichbar ist.
- Lege in der CouchDB eine Datenbank namens `user` (für Benutzer) und `rezepte` (für Rezepte) an.

---

### 2. **Datei `credentials.json` anlegen**
Erstelle die Datei `backend/data/credentials.json` mit folgendem Inhalt und passe die Zugangsdaten an:

```json
{
  "user": "your username",
  "password": "your password",
  "url": "http://127.0.0.1:5984"
}
```

### 3. **Backend installieren**
Navigiere in das Backend-Verzeichnis und installiere die Abhängigkeiten:
```bash
cd backend
npm install
```

Abhängigkeiten, die verwendet werden:
- **`cors`**: Ermöglicht die Kommunikation zwischen Frontend und Backend.
- **`express`**: Webserver-Framework.
- **`multer`**: Zum Hochladen von Bildern (Speicherort: `backend/uploads`).
- **`nano`**: Node.js-Client für CouchDB.

### 4. **Frontend installieren**
Navigiere in das Frontend-Verzeichnis und installiere die Abhängigkeiten (vom backend-Verzeichnis aus gesehen):
```bash
cd ..
npm install
```

Abhängigkeiten, die verwendet werden:
- **`md5`**: Zum Verschlüsseln von Passwörtern (nicht sicher für produktive Umgebungen).
- Der Proxy für die Backend-Verbindung ist standardmäßig auf `http://localhost:5000` gesetzt. Passe dies bei Bedarf in der `package.json` an:
  ```json
  "proxy": "http://dein-backend-server:5000"
  ```

---

### 5. **Starten der App**

#### Backend
Starte den Server im Backend-Verzeichnis:
```bash
cd backend
npm node server.js
```

#### Frontend
Starte die React-App im Frontend-Verzeichnis (vom backend-Verzeichnis aus gesehen):
```bash
cd ..
npm start
```

---

## 🧪 Tests

Es sind keine benutzerdefinierten Tests vorhanden. Die vorhandenen Tests stammen aus der standardmäßigen React-App-Generierung.

---

## 💡 Hinweise
- CouchDB wird für die Benutzerverwaltung (`user`) und die Speicherung der Rezepte (`rezepte`) verwendet.
- Bilder werden lokal im Ordner `backend/uploads` gespeichert. Wenn du einen externen Speicher verwenden möchtest, passe die Konfiguration entsprechend an.
- Für zusätzliche Sicherheitsmaßnahmen (z. B. bei Passwörtern) sollte ein sichererer Hashing-Algorithmus wie **bcrypt** verwendet werden.

---

## 📜 Lizenz
- Das Backend ist unter der **ISC-Lizenz** lizenziert (siehe `package.json` im Backend).
- Das Frontend nutzt die Standardlizenz von React.

---
