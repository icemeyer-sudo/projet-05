import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Header } from "@/components/header/header.jsx";
import { Footer } from "@/components/footer/footer.jsx";
import { Index } from "@/pages/index/index.jsx";
const ErrorPage = lazy(() => import("@/pages/errorPage/errorPage.jsx"));
const Contact = lazy(() => import("@/pages/contact/contact.jsx"));
const Property = lazy(() => import("@/pages/property/property.jsx"));

const ErrorPageFallback = (
    <Suspense fallback={<div>Chargement...</div>}>
        <ErrorPage/>
    </Suspense>
);

const ContactFallback = (
    <Suspense fallback={<div>Chargement...</div>}>
        <Contact/>
    </Suspense>
);

const PropertyFallback = (
    <Suspense fallback={<div>Chargement...</div>}>
        <Property/>
    </Suspense>

);

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: ErrorPageFallback,
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
                        element: ErrorPageFallback
                    },
                    {
                        path: ':id',
                        element: PropertyFallback
                    }
                ]
            },
            {
                path: 'contact',
                element: ContactFallback
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