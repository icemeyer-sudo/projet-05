import { useState, useEffect } from "react";
import styles from './carousel.module.css';

export function Carousel({pictures}) {
    const [prevIndex, setPrevIndex] = useState(pictures.length - 1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [animationClass, setAnimationClass] = useState();
    const [isAnimating, setIsAnimating] = useState(false);
    const ANIMATION_DURATION = 400;

    useEffect(() => {
        const main = new Image();
        main.src = pictures[0];
        main.onload = () => {
            pictures.slice(1).forEach(src => {
                const img = new Image();
                img.src = src;
            });
        };
    }, [pictures]);

    if (!pictures || pictures.length === 0) {
        return null;
    }

    function goToPreviousImage() {
        setIsAnimating(true);
        if (currentIndex === 0) {
            setAnimationClass("carousel__slide--translate-plus");
            setTimeout(() => {
                setPrevIndex(pictures.length - 2),
                setCurrentIndex(pictures.length - 1),
                setNextIndex(0)
                setIsAnimating(false);
                setAnimationClass("");
            }, ANIMATION_DURATION);
        }
        else if (currentIndex === 1) {
            setAnimationClass("carousel__slide--translate-plus");
            setTimeout(() => {
                setPrevIndex(pictures.length - 1),
                setCurrentIndex(prevIndex),
                setNextIndex(currentIndex)
                setIsAnimating(false);
                setAnimationClass("");
            }, ANIMATION_DURATION);
        }
        else {
            setAnimationClass("carousel__slide--translate-plus");
            setTimeout(() => {
                setPrevIndex(prevIndex - 1),
                setCurrentIndex(prevIndex),
                setNextIndex(currentIndex)
                setIsAnimating(false);
                setAnimationClass("");
            }, ANIMATION_DURATION);
        }
    }

    function goToNextImage() {
        setIsAnimating(true);
        if (currentIndex === pictures.length - 2){
            setAnimationClass("carousel__slide--translate-minus");
            setTimeout(() => {
                setPrevIndex(currentIndex)
                setCurrentIndex(nextIndex)
                setNextIndex(0)
                setIsAnimating(false);
                setAnimationClass("");
            }, ANIMATION_DURATION);
        }
        else {
            setAnimationClass("carousel__slide--translate-minus");
            setTimeout(() => {
                setPrevIndex(currentIndex),
                setCurrentIndex(nextIndex),
                setNextIndex(nextIndex + 1)
                setIsAnimating(false);
                setAnimationClass("");
            }, ANIMATION_DURATION);
        }
    }

    function renderNavigationButton(direction) {
        const onClick = direction === "left" ? goToPreviousImage : goToNextImage;
        return (
            pictures.length > 1 && (
                <button type="button" name={direction} className={`${styles["carousel__arrow"]} ${styles["carousel__arrow--" + direction]}`} onClick={onClick} disabled={isAnimating}>
                    <span className={styles["carousel__arrow-label"]}>{direction}</span>
                    <i className={"fa-solid fa-angle-" + direction}></i>
                </button>
            )
        );
    }

    function renderSlideCounter() {
        return <>
            {pictures.length > 1 && (
                <p className={styles["carousel__counter"]}>
                    {currentIndex + 1} / {pictures.length}
                </p>
            )}
        </>
    }

    function renderCarousel() {
        if (pictures.length === 1) {
            return <img src={pictures[currentIndex]} alt={"Photo " + (currentIndex)}/>
        } else {
            return <>
                <div className={styles["carousel__track"]}>
                    <img className={styles[animationClass]} src={pictures[prevIndex]} alt={`Photo n°${prevIndex + 1} de l'appartement`}/>
                    <img className={styles[animationClass]} src={pictures[currentIndex]} alt={`Photo n°${currentIndex + 1} de l'appartement`}/>
                    <img className={styles[animationClass]} src={pictures[nextIndex]} alt={`Photo n°${nextIndex + 1} de l'appartement`}/>
                </div>
            </>
        }
    }

    return <>
        <div className={styles["carousel"]}>
            {renderNavigationButton("left")}
            {renderNavigationButton("right")}
            {renderCarousel()}
            {renderSlideCounter()}
        </div>
    </>
}