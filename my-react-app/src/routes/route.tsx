import App from "../App";
import FrontPage from "../pages/FrontPage";
import SearchResult from "../pages/SearchResult";
import VenueInforPage from "../pages/VenueInforPage";
import CategoryInforPage from "../pages/CategoryInforPage";
import { createBrowserRouter } from "react-router-dom";

let router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <FrontPage />
            },
            {
                path: "/searchResult",
                element: <SearchResult />
            },
            {
                path: "/categoryInfor/:id",
                element: <CategoryInforPage />
            }, 
            {
                path: "/venueInfor/:id",
                element: <VenueInforPage />
            }  
        ]
    }
]);

export default router;