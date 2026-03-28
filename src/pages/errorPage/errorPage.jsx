import { Link, useRouteError } from "react-router-dom";
import { Header } from "../../components/header/header.jsx";
import { Footer } from "../../components/footer/footer.jsx";

export function ErrorPage() {
    return <>
        <Header/>
        <MainError/>
        <Footer/>
    </>
}

function MainError() {
    const error = useRouteError();
    console.log(error);
    return <main id="__page-error">
        <h2>404</h2>
        <p className="--text">Oups! La page que vous demandez n'existe pas.</p>
        <p className="--link"><Link to="/">Retourner sur la page d'accueil</Link></p>
    </main>
}