import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import App from "./App"
import Folder from "./Folder"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/folder/:user",
        element: <Folder />,
    },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
