import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom"; // Importe o Link se não estiver importado

import "./header.css";
import logo from "../../assets/img/logotexto.jpg";

export function Header() {
  const { logout } = useContext(UserContext);

  return (
    <header className="headerComponent">
      <img src={logo} alt="" className="logo" />
      <Link to="#" onClick={() => logout()} className="btn">
        Sair
      </Link>
    </header>
  );
}
