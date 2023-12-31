import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "../pages/404";

export default function RouteHandler({ valid_routes }) {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={valid_routes[1].page} />
                {
                    // valid_routes &&
                    valid_routes.map((route_, i) => (
                        <Route
                            path={`${route_.path}`}
                            key={`route_${i}`}
                            element={route_.page}
                        />
                    ))
                }
                <Route path="/404" element={<PageNotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </BrowserRouter>
    );
}
