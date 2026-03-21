import {useRouteError} from "react-router-dom";
import {Header} from "./header.jsx";
import {Footer} from "./footer.jsx";

export function PageError() {
    return <>
        <Header/>
        <MainError/>
        <Footer/>
    </>
}

function MainError() {
    const error = useRouteError();
    console.log(error);
    return <main>
        <h1>Erreur 404</h1>
    </main>
}