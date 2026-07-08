import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#1e293b",
        color: "white",
      }}
    >
      <h2>🚀 Crypto Platform</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>

        <Link
          to="/markets"
          style={{ color: "white", textDecoration: "none" }}
        >
          Markets
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;