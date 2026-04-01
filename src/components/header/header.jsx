import {Link, NavLink} from "react-router-dom";
import logo from "/logo.png";
import styles from "./header.module.css"

export function Header() {
    return <header>
        <div className={styles["header__title"]}>
            <Link to="/"><img src={logo} alt="Logo de Kasa"/></Link>
        </div>
        <div className={styles["__nav"]}>
            <nav>
                <ul>
                    <li><NavLink to="/">Accueil</NavLink></li>
                    <li><NavLink to="contact">À propos</NavLink></li>
                </ul>
            </nav>
        </div>
    </header>
}