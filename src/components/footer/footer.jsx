import logoWhite from "/public/logo-white.png";
import style from './footer.module.css';

export function Footer() {
    return <footer>
        <img src={logoWhite} alt="Logo de Kasa"/>
        <p>© 2020 Kasa. All rights reserved</p>
    </footer>
}