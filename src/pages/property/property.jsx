import { useParams } from "react-router-dom";
import data from '@/bdd/data.json';
import { CollapseEffect } from '@/components/accordion/accordion.jsx'
import { Carousel } from '@/components/carousel/carousel.jsx';
import styles from './property.module.css';

export function Property () {
    const {id} = useParams();
    const accommodation = data.find((accommodation) => accommodation.id === id);
    if(!accommodation) {
        return <section id="fiche">Logement introuvable.</section>;
    }
    return <main id="fiche">
        <Carousel pictures={accommodation.pictures}/>
        <Article accommodation={accommodation}/>
    </main>
}

function Article(props) {
    const {title, location, host, rating, tags, description, equipments} = props.accommodation;
    return <article className="__article">
        <Header title={title} location={location} host={host}/>
        <TagsAndRating tags={tags} rating={rating}/>
        <Collapse description={description} equipments={equipments}/>
    </article>
}

function Header({title, location, host}) {
    const [firstName = "", lastName = ""] = host.name.split(" ");
    return <div className="--header">
        <div>
            <h1>{title}</h1>
            <h2>{location}</h2>
        </div>
        <div className="--owner">
            <p>
                {firstName}
                <br/>
                {lastName}
            </p>
            <img src={host.picture} alt="Photo de profil du propriétaire"/>
        </div>
    </div>
}

function TagsAndRating({tags, rating}) {
    return <div className="--tagsAndRating">
        <div className="--tags-container">
            <Tags tags={tags}/>
        </div>
        <div className="--rating-container">
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
            <p key={tag} className="--tags">{tag}</p>
        ))}
    </>
}

function Rating({rating}) {
    const filledStars = [];
    const unfilledStars = [];
    for(let i = 0; i < 5; i++) {
        if(i < Number(rating)) {
            filledStars.push(<i key={i} className="fa-solid fa-star --filledStars"></i>);
        } else {
            unfilledStars.push(<i key={i} className="fa-solid fa-star --unfilledStars"></i>);
        }
    }
    return <>
        {filledStars}{unfilledStars}
    </>
}