import { useState } from "react";
import styles from './galery.module.css';

export function Galery({pictures}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!pictures || pictures.length === 0) {
        return null;
    }

    function goToPreviousImage() {
        if (currentIndex === 0) {
            setCurrentIndex(pictures.length - 1);
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    }

    function goToNextImage() {
        if (currentIndex === pictures.length - 1) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    }

    function renderArrow(direction) {
        const onClick = direction === "left" ? goToPreviousImage : goToNextImage;
        return (
            pictures.length > 1 && (
                <button
                    type="button"
                    className={`${styles["__arrow"]} ${styles["__arrow--" + direction]}`}
                    onClick={onClick}
                >
                    <i className={"fa-solid fa-angle-" + direction}></i>
                </button>
            )
        );
    }

    function renderCounter() {
        return <>
            {pictures.length > 1 && (
                <p className={styles["__counter"]}>
                    {currentIndex + 1} / {pictures.length}
                </p>
            )}
        </>
    }

    function renderPicture() {
        if (pictures.length === 1) {
            return <img src={pictures[currentIndex]} alt={"Photo " + (currentIndex)}/>
        } else {
            return <>
                {pictures.map((picture) => (
                    <img key={picture} src={picture} alt={"Photo " + {pictures}} style={{translate: `${-100 * currentIndex}%`}}/>
                ))}
            </>
        }
    }

    return <>
        <div className={styles["__picture"]}>

            {renderArrow("left")}
            {renderArrow("right")}
            {renderPicture()}
            {renderCounter()}

        </div>
    </>
}