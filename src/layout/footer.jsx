import logoWhite from "/public/logo-white.png";

export function Footer() {
    return <footer>
        <div>
            <img src={logoWhite} alt="logo"/>
        </div>
        <div>
            <p>© 2020 Kasa. All rights reserved</p>
        </div>
    </footer>
}