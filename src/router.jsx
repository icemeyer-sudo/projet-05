import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Header } from "@/components/header/header.jsx";
import { Footer } from "@/components/footer/footer.jsx";
import { ErrorPage } from "@/pages/errorPage/errorPage.jsx";
import IndexPlaceholder from "@/pages/index/indexPlaceholder.jsx";
import PropertyPlaceholder from "@/pages/property/propertyPlaceholder.jsx";

const Index    = lazy(() => import("@/pages/index/index.jsx"));
const Contact  = lazy(() => import("@/pages/contact/contact.jsx"));
const Ui       = lazy(() => import("@/pages/ui/ui.jsx"));
const Property = lazy(() => import("@/pages/property/property.jsx"));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <MainErrorPage/>,
        children: [
            {
                path: '',
                element: <Suspense fallback={<IndexPlaceholder/>}><Index/></Suspense>
            },
            {
                path: 'page/:page',
                element: <Suspense fallback={<IndexPlaceholder/>}><Index/></Suspense>
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
                        element: <Suspense fallback={<PropertyPlaceholder/>}><Property/></Suspense>
                    }
                ]
            },
            {
                path: 'contact',
                element: <Contact/>
            },
            {
                path: 'ui',
                element: <Ui/>
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

function MainErrorPage() {
    return <>
        <ScrollRestoration/>
        <Header/>
        <ErrorPage/>
        <Footer/>
    </>
}