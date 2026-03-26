import { useState } from 'react';

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
    <div className="collapse">
        <div className="title" onClick={handleCollapse}>
            <h3>{name}</h3>
            <p><i className={`fa-solid fa-angle-down ${rotated ? 'rotated' : ''}`}></i></p>
        </div>
        <div className={`textInCollapse ${collapse ? 'active' : ''}`}>
            <div className="content">
                {renderContent()}
            </div>
        </div>
    </div>
    </>
}