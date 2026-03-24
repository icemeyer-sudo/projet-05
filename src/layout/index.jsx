import data from '../bdd/data.json';
import {Link} from "react-router-dom";

export function Index() {
    return <main id="index">
        <Section__banner/>
        <Section__gallery/>
    </main>
}

function Section__banner() {
    return <section className="index__banner">
        <p>Chez vous, partout et ailleurs</p>
    </section>
}

function Section__gallery() {
    return <section className="section__gallery">
        <div className="section__gallery--div">
            {data.map((work) => (
                <Card work={work} key={work.id}/>
            ))}
        </div>
    </section>
}

function Card(props) {
    return <article key={props.work.id}>
        <img src={props.work.cover} alt={props.work.title}/>
            <div>
                <Link to={`fiche-logement/${props.work.id}`}>
                    <h2>{props.work.title}</h2>
                </Link>
            </div>
    </article>
}