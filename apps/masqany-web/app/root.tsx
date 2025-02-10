import {Links, Meta, Outlet, Scripts, ScrollRestoration} from "@remix-run/react"
import type { MetaFunction } from "@remix-run/react"
import stylesheet from "./tailwind.css";
import type { LinksFunction } from "@remix-run/node";
import { ReactNode } from "react";

export const meta: MetaFunction = () => {
    return [{
        title: 'Masqany Rental Property Management'
    }]
}

export const link: LinksFunction = () => [
    {rel: 'stylesheet', href: stylesheet},
    {rel: 'icon', href: '/favicon-masqany.png', type: 'image/png'}
]

export function Layout({children}:{children: ReactNode}){
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    return <Outlet />
}

export function ErrorBoundary() {
    return <h1>An error occured</h1>;
}