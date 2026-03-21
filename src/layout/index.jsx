import data from '../bdd/data.json';

console.log(data);

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
                <article key={work.id}>
                    <img src={work.cover} alt={work.title}/>
                    <div>
                        <h2>{work.title}</h2>
                    </div>
                </article>
            ))}
        </div>
    </section>
}