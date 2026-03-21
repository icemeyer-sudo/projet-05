import {createBrowserRouter, Outlet} from "react-router-dom";
import {Index} from "./index.jsx";
import {Header} from "./header.jsx";
import {Contact} from "./contact.jsx";
import {PageError} from "./pageError.jsx";
import {Footer} from "./footer.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <PageError/>,
        children: [
            {
                path: '',
                element: <Index/>
            },
            {
                path: 'fiche-logement',
                element: <Logement/>
            },
            {
                path: 'contact',
                element: <Contact/>
            }
        ]
    }
]);

function Root() {
    return <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
}

function Logement() {
    return <>
        <h1>Fiche logement</h1>
    </>
}

