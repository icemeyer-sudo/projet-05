import { useParams } from "react-router-dom";
import { CollapseEffect } from '@/components/accordion/accordion.jsx'
import { Carousel } from '@/components/carousel/carousel.jsx';
import { ErrorPage } from "@/pages/errorPage/errorPage.jsx";
import styles from './property.module.css';
import data from '@/bdd/data.json';

export default function Property () {
    const { id } = useParams();
    const accommodation = data.find((accommodation) => accommodation.id === id);
    if(!accommodation) {
        return <ErrorPage/>;
    }
    return <main id={styles["fiche"]}>
        <Carousel pictures={accommodation.pictures}/>
        <Article accommodation={accommodation}/>
    </main>
}

function Article(props) {
    const {title, location, host, rating, tags, description, equipments} = props.accommodation;
    return <>
            <article className={styles["__article"]}>
                <div className={styles["article-box"]}>
                    <Header title={title} location={location} tags={tags}/>
                    <TagsAndRating rating={rating} host={host}/>
                </div>
                <Collapse description={description} equipments={equipments}/>
            </article>
    </>
}

function Header({title, location, tags}) {
    return <div className={styles["--header"]}>
        <div>
            <h1>{title}</h1>
            <h2>{location}</h2>
        </div>
        <div className={styles["--tags-container"]}>
            <Tags tags={tags}/>
        </div>
    </div>
}


function TagsAndRating({host, rating}) {
    const [firstName = "", lastName = ""] = host.name.split(" ");
    return <div className={styles["--tagsAndRating"]}>
        <div className={styles["--owner"]}>
            <p>
                {firstName}
                <br/>
                {lastName}
            </p>
            <img src={host.picture} alt="Photo de profil du propriétaire"/>
        </div>
        <div className={styles["--rating-container"]}>
            <Rating rating={rating}/>
        </div>
    </div>
}

function Collapse({description, equipments}) {
    return <>
        <div className={styles["collapse-container"]}>
            <CollapseEffect name="Description" content={description}/>
            <CollapseEffect name="Équipement" content={equipments}/>
        </div>
    </>
}

function Tags({tags}) {
    return <>
        {tags.map((tag) => (
            <p key={tag} className={styles["--tags"]}>{tag}</p>
        ))}
    </>
}

function Rating({rating}) {
    const filledStars = [];
    const unfilledStars = [];
    for(let i = 0; i < 5; i++) {
        if(i < Number(rating)) {
            filledStars.push(<i key={i} className={`fa-solid fa-star ${styles["--filledStars"]}`}></i>);
        } else {
            unfilledStars.push(<i key={i} className={`fa-solid fa-star ${styles["--unfilledStars"]}`}></i>);
        }
    }
    return <>
        {filledStars}{unfilledStars}
    </>
}