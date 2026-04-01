import { Link, NavLink, useLocation } from "react-router-dom";
import { getProperties } from "../../bdd/getProperties.js"
import { getCountProperties } from "../../bdd/getCountProperties.js"
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "./index.module.css";

export function Index() {
    const [properties, setProperties] = useState([]);
    const [numberOfProperties, setNumberOfProperties] = useState();
    const [loading, setLoading] = useState(true);
    const { page } = useParams();
    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        const numberOfPage = page ? Number(page) : 1;
        Promise.all([
            getProperties(numberOfPage),
            getCountProperties()
        ])
        .then(([results, PropertiesResults]) => {
            if(isMounted) {
                setProperties(results)
                setNumberOfProperties(PropertiesResults)
            }
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            if(isMounted) {
                setLoading(false)
            }
        })
        return () => {
            isMounted = false;
        }
    },[page]);
    if(loading === false) {
        const totalProperties = numberOfProperties?.totalOfProperties ?? 0;
        const numberOfPages = Math.ceil(totalProperties / 6);
        const pageNumber = page ? Number(page) : 1;

        if(page && (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > numberOfPages || properties.length === 0)) {
            throw new Response("Page not found", { status: 404 });
        }

        return <>
            <main>
                <Section__banner/>
                <Section__gallery properties={properties}/>
                <Pagination numberOfPages={numberOfPages}/>
            </main>
        </>
    } else {
        return <>
            <p>En chargement...</p>
        </>
    }
}

function Section__banner() {
    return <>
        <section className={styles["index__banner"]}>
            <h1>Chez vous, partout et ailleurs</h1>
        </section>
    </>
}

function Section__gallery({properties}) {
    return <>
        <section className={styles["section__gallery"]}>
            <div className={styles["section__gallery--div"]}>
                {properties.map((work) => (
                    <Card work={work} key={work.id}/>
                ))}
            </div>
        </section>
    </>
}

function Card(props) {
    return <>
        <article key={props.work.id}>
            <Link to={`/fiche-logement/${props.work.id}`}>
                <img src={props.work.cover} alt={`Photo du logement de l'annonce : ${props.work.title}`}/>
                <div>
                    <h2>{props.work.title}</h2>
                </div>
            </Link>
        </article>
    </>
}

function Pagination({numberOfPages}) {
    const location = useLocation();
    const pages = Array.from({ length: numberOfPages }, (_, index) => index + 1);
    return <>
        <div className={styles["pagination-box"]}>
            {pages.map((page) => (
                <NavLink
                    to={`/page/${page}`}
                    key={page}
                    className={({ isActive }) => {
                        const isIndexPageOne = page === 1 && location.pathname === "/";
                        return `${styles["pagination-btn"]} ${(isActive || isIndexPageOne) ? styles["pagination-btn-active"] : ""}`.trim();
                    }}
                >
                    {page}
                </NavLink>
            ))}
        </div>
    </>
}