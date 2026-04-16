import { Link, NavLink, useLocation } from "react-router-dom";
import { getProperties } from "../../bdd/getProperties.js"
import { getCountProperties } from "../../bdd/getCountProperties.js"
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import styles from "./index.module.css";
import IndexPlaceholder from "@/pages/index/indexPlaceholder.jsx";

export default function Index() {
    const [properties, setProperties] = useState([]);
    const [numberOfProperties, setNumberOfProperties] = useState();
    const [loading, setLoading] = useState(true);
    const [myDownElementIsVisible, setMyDownElementIsVisible] = useState();
    const [myUpElementIsVisible, setMyUpElementIsVisible] = useState();
    const [pageSmart, setPageSmart] = useState(1);
    const { page } = useParams();
    const location = useLocation();

    const isMobile = window.innerWidth < 565;
    console.log('TEST');

    useEffect(() => {
        let isMounted = true;
        const numberOfPage = page ? Number(page) : 1;
        Promise.all([
            getProperties(numberOfPage),
            getCountProperties()
        ])
        .then(([results, PropertiesResults]) => {
            if(isMounted) {
                setProperties(results)
                setNumberOfProperties(PropertiesResults)
                setPageSmart(1);
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
    },[page, location.key]);

    // ---- SCROLL INFINI DOWN ---- //

    const observerDown = useRef();
    useEffect(() => {
        if (!isMobile) return;
        if (!observerDown.current) return;
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setMyDownElementIsVisible(entry.isIntersecting);
        });
        observer.observe(observerDown.current);
        return () => observer.disconnect();
    }, [properties, isMobile]);

    useEffect(() => {
        if (!isMobile) return;
        if (myDownElementIsVisible === true) {

            const totalProperties = numberOfProperties?.totalOfProperties ?? 0;
            const numberOfPages = Math.ceil(totalProperties / 6);

            const next = pageSmart + 1;
            if (next > numberOfPages) return;

            Promise.all([
                getProperties(pageSmart),
                getProperties(next),
            ])
            .then(([resultsPage, resultsNext]) => {
                const newProperties = [...resultsPage, ...resultsNext];
                setProperties(newProperties);
            })
            setPageSmart(next);
            setMyDownElementIsVisible(false);
        }
    });

    // ---- SCROLL INFINI UP ---- //

    const observerUp = useRef();
    useEffect(() => {
        if (!isMobile) return;
        if (!observerUp.current) return;
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setMyUpElementIsVisible(entry.isIntersecting);
        });
        observer.observe(observerUp.current);
        return () => observer.disconnect();
    }, [properties, isMobile]);

    useEffect(() => {
        if (!isMobile) return;
        if (myUpElementIsVisible === true) {

            if (pageSmart === 1) return;

            const prev = pageSmart - 1;

            Promise.all([
                getProperties(prev),
                getProperties(pageSmart),
            ])
            .then(([resultsPrev, resultsPage]) => {
                const newProperties = [...resultsPrev, ...resultsPage];
                setProperties(newProperties);
            })
            setPageSmart(prev);
            setMyUpElementIsVisible(false);
        }
    });

    // ---- FIN DU SETUP SCROLL ---- //

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
                <Section__gallery
                    properties={properties}
                    observerDown={isMobile ? observerDown : null}
                    observerUp={isMobile ? observerUp : null}
                />
                <Pagination numberOfPages={numberOfPages}/>
            </main>
        </>
    } else {
        return <>
            <IndexPlaceholder/>
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

function Section__gallery({properties, observerDown, observerUp}) {
    return <>
        <section className={styles["section__gallery"]}>
            <div className={styles["section__gallery--div"]}>
                {properties.map((work, index) => (
                    <Card
                        work={work}
                        key={work.id}
                        cardRef={
                            index === 0 ? observerUp :
                            index === properties.length -1 ? observerDown :
                            null
                        }
                    />
                ))}
            </div>
        </section>
    </>
}

function Card({work, cardRef}) {
    return <>
        <article key={work.id} ref={cardRef}>
            <Link to={`/fiche-logement/${work.id}`}>
                <img src={work.cover} alt={`Photo du logement de l'annonce : ${work.title}`}/>
                <div>
                    <h2>{work.title}</h2>
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