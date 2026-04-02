import styles from "./index.module.css";

export default function IndexPlaceholder() {
    return <>
        <main>
            <Section__banner/>
            <Section__gallery/>
        </main>
    </>
}

function Section__banner() {
    return <>
        <section className={styles["index__banner"]}>
            <h1>Chez vous, partout et ailleurs</h1>
        </section>
    </>
}

function Section__gallery() {
    return <>
        <section className={styles["section__gallery"]}>
            <div className={styles["section__gallery--div"]}>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </section>
    </>
}

function Card() {
    return <>
        <article>
            <div>
                <h2></h2>
            </div>
        </article>
    </>
}