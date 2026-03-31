import { Link, useRouteError } from "react-router-dom";
import styles from "./errorPage.module.css";

export function ErrorPage() {
    return <>
        <MainError/>
    </>
}

function MainError() {
    const error = useRouteError();
    if (error) console.log(error);
    return <main id={styles["__page-error"]}>
        <h2>404</h2>
        <p className={styles["--text"]}>Oups! La page que vous demandez n'existe pas.</p>
        <p className={styles["--link"]}><Link to="/">Retourner sur la page d'accueil</Link></p>
    </main>
}