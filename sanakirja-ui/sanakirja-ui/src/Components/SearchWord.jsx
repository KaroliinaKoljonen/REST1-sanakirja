import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchWord() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState("");

  const handleSearch = async () => {
    if (!word.trim()) {
      setResult("Anna suomenkielinen sana.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/translate?fin=${word}`
      );

      if (!response.ok) {
        // Jos palvelin palauttaa 404 tai muun virheen
        setResult("Sanaa ei löytynyt sanakirjasta.");
        return;
      }

      const text = await response.text();

      // Jos palvelin ei löytänyt sanaa mutta palauttaa tyhjän rivin
      if (!text || text.trim().length === 0) {
        setResult("Sanaa ei löytynyt sanakirjasta.");
      } else {
        setResult(text);
      }
    } catch (error) {
      setResult("Virhe palvelinyhteydessä.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Hae englanninkielinen vastine</h2>
      <input
        type="text"
        placeholder="Anna suomenkielinen sana"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
        Hae
      </button>
      <p>{result}</p>

      {/* Takaisin-nappi */}
      <Link to="/">
        <button>Takaisin etusivulle</button>
      </Link>
    </div>
  );
}
