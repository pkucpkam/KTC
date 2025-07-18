// components/Header.jsx
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav
            style={{
                padding: "10px",
                background: "#eee",
                marginBottom: "20px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Link to="/carselect" style={{ marginRight: "15px" }}>
                Car Selection
            </Link>
            <Link to="/countdown" style={{ marginRight: "15px" }}>
                Countdown Timer
            </Link>
            <Link to="/currenttime">Current Time</Link>
        </nav>
    );
};

export default Header;
