import { Link } from "react-router-dom";
import { getProperties } from "../../bdd/getProperties.js"
import { useState, useEffect } from "react";
import styles from "./index.module.css";

export function Index() {
    const [properties, setProperties] = useState([]);
    useEffect(() => {
        getProperties()
        .then((results) => {
            setProperties(results);
        })
        .catch((error) => {
            console.error(error)
        })
    },[]);
    return <main>
        <Section__banner/>
        <Section__gallery properties={properties}/>
    </main>
}

function Section__banner() {
    return <section className={styles["index__banner"]}>
        <h1>Chez vous, partout et ailleurs</h1>
    </section>
}

function Section__gallery({properties}) {
    return <section className={styles["section__gallery"]}>
        <div className={styles["section__gallery--div"]}>
            {properties.map((work) => (
                <Card work={work} key={work.id}/>
            ))}
        </div>
    </section>
}

function Card(props) {
    return <>
        <article key={props.work.id}>
            <Link to={`fiche-logement/${props.work.id}`}>
                <img src={props.work.cover} alt={`Photo du logement de l'annonce : ${props.work.title}`}/>
                <div>
                    <h2>{props.work.title}</h2>
                </div>
            </Link>
        </article>
    </>
}