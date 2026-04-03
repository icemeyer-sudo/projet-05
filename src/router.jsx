import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Header } from "@/components/header/header.jsx";
import { Footer } from "@/components/footer/footer.jsx";
import { ErrorPage } from "@/pages/errorPage/errorPage.jsx";

const Index    = lazy(() => import("@/pages/index/index.jsx"));
const Contact  = lazy(() => import("@/pages/contact/contact.jsx"));
const Ui       = lazy(() => import("@/pages/ui/ui.jsx"));
const Property = lazy(() => import("@/pages/property/property.jsx"));

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
        <Suspense fallback={<div>Chargement...</div>}>
            <Outlet />
        </Suspense>
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