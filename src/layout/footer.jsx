import logoWhite from "/public/logo-white.png";

export function Footer() {
    return <footer>
        <div>
            <img src={logoWhite} alt="Logo de Kasa"/>
        </div>
        <div>
            <span>© 2020 Kasa. All rights reserved</span>
        </div>
    </footer>
}