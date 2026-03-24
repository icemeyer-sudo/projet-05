import {createBrowserRouter, Outlet} from "react-router-dom";
import {Index} from "./Index.jsx";
import {Header} from "./Header.jsx";
import {Contact} from "./Contact.jsx";
import {PageError} from "./PageError.jsx";
import {Footer} from "./Footer.jsx";
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
        <Header/>
        <Outlet/>
        <Footer/>
    </>
}