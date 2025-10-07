import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Sanakirja</h1>
      <p>Valitse toiminto:</p>
      <Link to="/search">
        <button>Hae sana</button>
      </Link>
      <Link to="/add" style={{ marginLeft: "10px" }}>
        <button>Lisää sana</button>
      </Link>
    </div>
  );
}
