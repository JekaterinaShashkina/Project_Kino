# Kinoportaal: Filmi ja Piletite Haldamine

### Projekt
**RAM0541 Veebiprogrammeerimine**

**Üliõpilased:** Nadezda Artamonova (231815), Jekaterina Šaškina (231802)  
**Juhendaja:** N. Ivleva

---

## SISUKORD

1. [Ülevaade](#1-Ülevaade)  
    1.1 [Taust](#11-taust)  
    1.2 [Infosüsteemi funktsioonide loetelu](#12-infosüsteemi-funktsioonide-loetelu)  
    1.3 [Tehnoloogia valik](#13-tehnoloogia-valik)  

---

## 1. Ülevaade

### 1.1 Taust

**Kinoportaal** on kaasaegne lahendus kinojuhtimiseks, mis lihtsustab administraatorite ja juhtkonna tööd ning pakub kasutajatele mugavat vahendit filmide otsimiseks, piletite ostmiseks ja info saamiseks.

**Projekti eesmärk:**
- Arendada infosüsteem, mis automatiseerib filmide, seansside, saalide ja piletite haldamise protsesse.
- Tagada kasutajatele lihtne ligipääs filmide infole ning piletite ostmise ja tagastamise võimalus.
- Tõsta kinotöö efektiivsust ja parandada kliendikogemust.

---

### 1.2 Infosüsteemi funktsioonide loetelu

#### **Administraator:**
- Filmide, seansside, saalide, kategooriate jne haldamine:
  - Info lisamine (nt filmi pealkiri, kirjeldus, žanr, kestus, linastumise kuupäev jne).
  - Info muutmine ja kustutamine.
  - Filmide filtreerimine ja otsing (pealkiri, žanr, kuupäev).
  - Vormide valideerimine (nt ei saa lisada minevikukuupäeva).

#### **Juhtkond:**
- Aruanded ja statistika:
  - Piletimüügi analüüs.


#### **Kasutaja:**
- Kinokava ja filmide sirvimine:
  - Filmide ja saadaolevate seansside nimekiri.
  - Filtreerimine kuupäeva, žanri, pealkirja jms järgi.
  - Detailne filmiinfo (kirjeldus, kestus, žanr, treiler jne).
- Piletite ostmine:
  - Kohtade valimine saalis.
  - Ostu vormistamine.
- Piletite tagastamine.

#### **Autentimine ja autoriseerimine:**
- Kasutajate registreerimine ja sisselogimine.
- Autoriseerimine JWT põhiselt.
- Ligipääsutasemete eristamine:
  - Tavakasutajad: filmide vaatamine, piletite ost.
  - Administraatorid: sisu haldamine.
  - Juhtkond: juurdepääs statistikale ja rollidele.
Авторитизация в swagger Baerer + space + token
---

### 1.3 Tehnoloogia valik

| Komponent | Tehnoloogia |
|----------|-------------|
| **Backend** | Node.js + Express |
| **ORM / Andmebaas** | Sequelize + PostgreSQL |
| **Frontend** | React |
| **State Management** | Redux |
| **API** | REST (Express) |
| **Autentimine** | JWT |

---

> Projekti eesmärk on luua töökindel ja kasutajasõbralik kinoportaal, mis toetab mitmekülgset haldust ja pakub intuitiivset kasutajakogemust.


## Paigaldamine ja Swagger 

Dokumentatsioon: `http://localhost:3001/api`

## Kontrollid ja valideerimine

### Filmid
- Kohustuslikud väljad: pealkiri, kestus, kuupäev, hinnang, staatus, keel
- Kestus peab olema positiivne täisarv
- Hinnang: 0 kuni 10
- Kuupäev peab olema kehtiv
- Staatus: 'Released', 'Processes', 'Cancelled'
- Kontroll, et kategooriad eksisteerivad

### Piletid
- Ei saa osta, kui:
  - Seanss on minevikus
  - Koht on juba ostetud
  - Kasutajat pole
  - Hinda pole määratud
- Piletil on staatus: 'active', 'used', 'refunded'
- Tagastamine võimalik vaid > 1h enne seansi algust

### Kasutajad
- Kasutajanimi ja email peavad olema unikaalsed
- Parool krüpteeritakse (bcrypt)
- JWT-põhine autoriseerimine

### Kohad
- Vaade `view_places_with_status`
- Kohtade staatus: 'free', 'active', 'refunded'
- Kuvatakse ainult kohad, millel on hind > 0

### Raportid
- Piletimüük seansside kaupa (kogus, tulu)

- Vaated PostgreSQL-is: `view_sales_summary`, `view_places_with_status`
## Filtrid ja otsing

###  Filmide otsing ja filtreerimine
- **Pealkiri (title)**: osaline vaste
Wind

- **Žanr (category)**: 
Romance
- **Linastumise kuupäevade vahemik**:
    releasedateFrom=1940-01-01

    releasedateTo=1960-01-01

###  Seansside vaatamine 

/status/:sessionid — seansi kohtade olek (vaba, aktiivne, tagastatud)


## Backend
```
cd Project_Kino\
npx nodemon index.js
```

swagger http://localhost:3001/api

### autoriseerimise naidised
```json
{
  "username": "user",
  "password": "123"
}
```

```json
{
  "username": "admin",
  "password": "123"
}
```

```json
{
  "username": "manager",
  "password": "123"
}
```

Autorizeerimine swaggeris Baerer + space + token

### Управление ролями
Роли назначает пользователь с ролью manager, по умолчанию добавляется пользователю роль user


- `http://localhost:3001/add-role`
- `http://localhost:3001/remove-role`


### Модификации базы данных

#### Таблица `ticket`
Добавление поля статуса:
```sql
ALTER TABLE kino.ticket
ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'active';

ALTER TABLE kino.ticket
ADD CONSTRAINT ticket_status_check
CHECK (status IN ('active', 'used', 'refunded'));
```

#### View для отображения статуса мест
```sql
DROP VIEW IF EXISTS kino.view_places_with_status;

CREATE VIEW kino.view_places_with_status AS
SELECT
  p.placeid,
  p.rownumber,
  p.seatnumber,
  s.hallid,
  s.sessionid,
  COALESCE(t.status, 'free')::VARCHAR AS status,
  pr.price
FROM kino.place p
JOIN kino.session s ON p.hallid = s.hallid
JOIN kino.price pr ON pr.sessionid = s.sessionid AND pr.placeid = p.placeid
LEFT JOIN kino.ticket t
  ON t.sessionid = s.sessionid AND t.placeid = p.placeid AND t.status = 'active'
WHERE pr.price > 0;
```
Проверка:
```sql
SELECT * FROM kino.view_places_with_status WHERE sessionid = 3;
```

#### Уникальность в таблице `useraccount`

```sql
ALTER TABLE kino.useraccount
ADD CONSTRAINT unique_username UNIQUE (login);

ALTER TABLE kino.useraccount
ADD CONSTRAINT unique_useremail UNIQUE (useremail);
```

### Отчёт по проданным билетам
```sql
CREATE OR REPLACE VIEW kino.view_sales_summary AS
SELECT
  s.sessionid,
  s.starttime,
  m.title AS movie_title,
  COUNT(t.ticketid) FILTER (WHERE t.status = 'active') AS tickets_sold,
  SUM(p.price) FILTER (WHERE t.status = 'active') AS total_income
FROM kino.session s
JOIN kino.movie m ON s.movieid = m.movieid
LEFT JOIN kino.ticket t ON s.sessionid = t.sessionid
LEFT JOIN kino.price p ON p.sessionid = t.sessionid AND p.placeid = t.placeid
GROUP BY s.sessionid, s.starttime, m.title;
```

---









