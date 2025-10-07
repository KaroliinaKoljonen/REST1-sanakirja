import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddWord() {
  const [fin, setFin] = useState("");
  const [eng, setEng] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = async () => {
    const response = await fetch("http://localhost:3001/words", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fin, eng }),
    });

    if (response.ok) {
      setMessage("Sana lisätty!");
      setFin("");
      setEng("");
    } else {
      setMessage("Virhe lisäyksessä");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Lisää uusi sana</h2>
      <input
        type="text"
        placeholder="Suomeksi"
        value={fin}
        onChange={(e) => setFin(e.target.value)}
      />
      <input
        type="text"
        placeholder="Englanniksi"
        value={eng}
        onChange={(e) => setEng(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
      <button onClick={handleAdd} style={{ marginLeft: "10px" }}>
        Lisää
      </button>
      <p>{message}</p>

      {/* Takaisin-nappi */}
      <Link to="/">
        <button>Takaisin etusivulle</button>
      </Link>
    </div>
  );
}
