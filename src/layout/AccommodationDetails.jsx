import {useParams} from "react-router-dom";
import data from '../bdd/data.json';

export function AccommodationDetails () {
    const {id} = useParams();
    const accommodation = data.find((accommodation) => accommodation.id === id);
    if(!accommodation) {
        return <section id="fiche">Logement introuvable.</section>;
    }
    return <section id="fiche">
        <Picture picture={accommodation.cover}/>
        <Article accommodation={accommodation}/>
    </section>
}

function Picture({picture}) {
    return <div className="__picture">
        <img src={picture} alt="Photo du logement"/>
    </div>
}

function Article(props) {
    const {title, location, host, rating, tags} = props.accommodation;
    return <article className="__article">
        <Header title={title} location={location} host={host}/>
        <TagsAndRating tags={tags} rating={rating}/>
    </article>
}

function Header({title, location, host}) {
    const [firstName = "", lastName = ""] = host.name.split(" ");
    return <div className="--header">
        <div>
            <h2>{title}</h2>
            <h3>{location}</h3>
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

function Tags({tags}) {
    return <>
        {tags.map((tag) => (
            <h4 key={tag} className="--tags">{tag}</h4>
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