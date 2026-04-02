import { useParams } from "react-router-dom";
import { CollapseEffect } from '@/components/accordion/accordion.jsx'
import { Carousel } from '@/components/carousel/carousel.jsx';
import { ErrorPage } from "@/pages/errorPage/errorPage.jsx";
import { useState, useEffect } from "react";
import { getAccomodation } from "../../bdd/getAccomodation.js"
import { getTags } from "../../bdd/getTags.js"
import { getEquipments } from "../../bdd/getEquipments.js"
import { getPictures } from "../../bdd/getPictures.js"
import styles from './property.module.css';
import PropertyPlaceholder from "./PropertyPlaceholder.jsx"

export default function Property () {
    const { id } = useParams();
    const [accomodation, setAccomodation] = useState(null);
    const [tags, setTags] = useState(null);
    const [equipments, setEquipments] = useState(null);
    const [pictures, setPictures] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        Promise.all([
            getAccomodation(id),
            getTags(id),
            getEquipments(id),
            getPictures(id)
        ])
        .then(([accomodationResults, tagsResults, equipmentsResults, picturesResults]) => {
            if(isMounted) {
                setAccomodation(accomodationResults)
                setTags(tagsResults)
                setEquipments(equipmentsResults)
                setPictures(picturesResults)
            }
        })
        .catch(() => {
            console.log("ERREUR AVEC L'API")
        })
        .finally(() => {
            if(isMounted) {
                setLoading(false)
            }
        })
    }, [id]);

    if(loading === false) {
        if(!accomodation) {
            return <ErrorPage/>;
        }
        return <>
            <main id={styles["fiche"]}>
                {pictures && <Carousel pictures={pictures}/>}
                {accomodation && tags && equipments && <Article accommodation={accomodation} tags={tags} equipments={equipments}/>}
            </main>
        </>
    } else {
        return <PropertyPlaceholder/>
    }
}

function Article({ accommodation, tags, equipments }) {
    const {title, location, host_name: name, host_picture: picture, rating, description} = accommodation;
    const host = { name, picture };
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