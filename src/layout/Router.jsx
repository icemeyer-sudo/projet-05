import {createBrowserRouter, Outlet, ScrollRestoration} from "react-router-dom";
import {Index} from "./index.jsx";
import {Header} from "./header.jsx";
import {Contact} from "./contact.jsx";
import {PageError} from "./pageError.jsx";
import {Footer} from "./footer.jsx";
import {AccommodationDetails} from "./AccommodationDetails.jsx";

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
                children: [
                    {
                        path: '',
                        element: <PageError/>
                    },
                    {
                        path: ':id',
                        element: <AccommodationDetails/>
                    }
                ]
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
        <ScrollRestoration/>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
}