import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleUp} from '@fortawesome/free-solid-svg-icons'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'


export function Contact() {
    return <main id="contact">
        <Section__banner/>
        <Section__contact/>
    </main>
}

function Section__banner() {
    return <section className="contact__banner">
    </section>
}

function Section__contact() {
    return <section>
        <div className="contact__list">
            <div>
                <p>Fiabilité</p>
                <p><FontAwesomeIcon icon={faAngleUp} /></p>
            </div>
            <div>
                <p>Respect</p>
                <p><FontAwesomeIcon icon={faAngleUp} /></p>
            </div>
            <div>
                <p>Service</p>
                <p><FontAwesomeIcon icon={faAngleUp} /></p>
            </div>
            <div>
                <p>Sécurité</p>
                <p><FontAwesomeIcon icon={faAngleUp} /></p>
            </div>
        </div>
    </section>
}