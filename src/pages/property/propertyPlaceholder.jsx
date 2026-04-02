import styles from './property.module.css';
import stylesC from '../../components/carousel/carousel.module.css';
import stylesB from '../../components/accordion/accordion.module.css';

export default function PropertyPlaceholder () {
    return <>
        <main id={styles["fiche"]}>
            <Carousel/>
            <Article/>
        </main>
    </>
}

function Article() {
    return <>
        <article className={styles["__article"]}>
            <div className={styles["article-box"]}>
                <Header/>
                <TagsAndRating/>
            </div>
            <Collapse/>
        </article>
    </>
}

function Header() {
    return <div className={styles["--header"]}>
        <div>
            <h1></h1>
            <h2></h2>
        </div>
        <div className={styles["--tags-container"]}>
            <Tags/>
        </div>
    </div>
}

function TagsAndRating() {
    return <div className={styles["--tagsAndRating"]}>
        <div className={styles["--owner"]}>
            <p>

                <br/>

            </p>
            <div className={styles["img-owner-placeholder"]}></div>
        </div>
        <div className={styles["--rating-container"]}>
            <Rating/>
        </div>
    </div>
}

function Collapse() {
    return <>
        <div className={styles["collapse-container"]}>
            <CollapseEffect/>
            <CollapseEffect/>
        </div>
    </>
}

function Tags({tags}) {
    return <>
        <p className={styles["--tags"]}>Chargement</p>
    </>
}

function Carousel() {

    function renderNavigationButton(direction) {
        return <>
            <button type="button" name={direction} className={`${stylesC["carousel__arrow"]} ${stylesC["carousel__arrow--" + direction]}`}>
                <span className={stylesC["carousel__arrow-label"]}>{direction}</span>
                <i className={"fa-solid fa-angle-" + direction}></i>
            </button>
        </>
    }

    function renderCarousel() {
        return <img/>
    }

    return <>
        <div className={stylesC["carousel"]}>
            {renderNavigationButton("left")}
            {renderNavigationButton("right")}
            {renderCarousel()}
        </div>
    </>
}

function CollapseEffect() {
    return <>
        <div className={ stylesB["collapse"] }>
            <div className={ stylesB["title"] }>
                <h3>Chargement</h3>
                <span className={ `fa-solid fa-angle-up ${stylesB["fa-angle-up"]}` }></span>
            </div>
            <div className={`${ stylesB["textInCollapse"] }`}>
                <div className={stylesB["content"]}>

                </div>
            </div>
        </div>
    </>

}

function Rating({rating}) {
    return <>
        <i className={`fa-solid fa-star ${styles["--unfilledStars"]}`}></i>
        <i className={`fa-solid fa-star ${styles["--unfilledStars"]}`}></i>
        <i className={`fa-solid fa-star ${styles["--unfilledStars"]}`}></i>
        <i className={`fa-solid fa-star ${styles["--unfilledStars"]}`}></i>
        <i className={`fa-solid fa-star ${styles["--unfilledStars"]}`}></i>
    </>
}