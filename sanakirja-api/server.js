const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

/* CORS isn’t enabled on the server, this is due to security reasons by default,
so no one else but the webserver itself can make requests to the server. */
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-type", "application/json");

  // Pass to next layer of middleware
  next();
});

// GET-metodi
app.get("/translate", (req, res) => {
  const fin = req.query.fin;
  if (!fin) {
    return res.status(400).send("Anna parametri 'fin'.");
  }

  fs.readFile("./sanakirja.txt", { encoding: "utf8" }, (err, data) => {
    if (err) {
      return res.status(500).send("Tiedoston luku epäonnistui.");
    }

    const lines = data.split(/\r?\n/);
    for (const line of lines) {
      if (!line) continue;
      const parts = line.split(" ");
      if (parts.length >= 2 && parts[0] === fin) {
        return res.send(parts[0] + " " + parts[1]);
      }
    }
    return res.status(404).send(`Sanaa '${fin}' ei löytynyt.`);
  });
});

// POST -metodi
app.post("/words", (req, res) => {
  const { fin, eng } = req.body || {};
  if (!fin || !eng) {
    return res.status(400).send("Anna 'fin' ja 'eng'.");
  }

  fs.readFile("./sanakirja.txt", { encoding: "utf8" }, (err, data) => {
    if (err) {
      return res.status(500).send("Tiedoston luku epäonnistui.");
    }

    // Tarkistetaan, onko sana jo olemassa
    const lines = data.split(/\r?\n/);
    for (const line of lines) {
      const parts = line.split(" ");
      if (parts[0] === fin) {
        return res.status(400).send(`Sana '${fin}' on jo sanakirjassa.`);
      }
    }

    // Jos ei ole, lisätään uusi
    const line = "\n" + fin + " " + eng;
    fs.appendFile("./sanakirja.txt", line, { encoding: "utf8" }, (err) => {
      if (err) {
        return res.status(500).send("Lisäys epäonnistui.");
      }
      return res.status(201).send("Lisätty: " + fin + " " + eng);
    });
  });
});

app.listen(3001, () => {
  console.log("Serveri käynnissä portissa 3001");
});
