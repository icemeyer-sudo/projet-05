import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router-dom";
import { Header } from "@/components/header/header.jsx";
import { Footer } from "@/components/footer/footer.jsx";
import { Index } from "@/pages/index/index.jsx";
import { Contact } from "@/pages/contact/contact.jsx";
import { ErrorPage } from "@/pages/errorPage/errorPage.jsx";
import { Property } from "@/pages/property/property.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <ErrorPage/>,
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
                        element: <ErrorPage/>
                    },
                    {
                        path: ':id',
                        element: <Property/>
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