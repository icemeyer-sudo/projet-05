import { useState } from 'react';
import styles from './accordion.module.css';

export function CollapseEffect({name, content}) {
    const [collapse, setCollapse] = useState(false);
    const [rotated, setRotated] = useState(false);

    function handleCollapse () {
        setRotated(!rotated);
        setCollapse(!collapse);
    }

    function renderContent() {
        if (Array.isArray(content) === true) {
            return (
                <ul>
                    {content.map(function mapItem(item, index) {
                        return <li key={index}>{item}</li>;
                    })}
                </ul>
            );
        }

        if (typeof content === 'string') {
            return <p>{content}</p>;
        }

        return null;
    }

    return <>
        <div className={ styles["collapse"] }>
            <div className={ styles["title"] } onClick={handleCollapse}>
                <h3>{ name }</h3>
                <span className={ `fa-solid fa-angle-down ${styles["fa-angle-down"]} ${ rotated ? styles["rotated"] : '' }` }></span>
            </div>
            <div className={`${ styles["textInCollapse"] } ${collapse ? styles["active"] : ''}`}>
                <div className={styles["content"]}>
                    {renderContent()}
                </div>
            </div>
        </div>
    </>
}

// className={`${styles["carousel__arrow"]}