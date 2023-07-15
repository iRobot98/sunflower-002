import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PageNotFound from "./pages/404";

import SignIn from "./pages/signin";
import SignUp from "./pages/signup";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={"/auth/sign_in"} />} />
                <Route path="/auth/sign_in" element={<SignIn />} />
                <Route path="/auth/sign_up" element={<SignUp />} />

                <Route
                    path="/sign_in"
                    element={<Navigate to={"/auth/sign_in"} />}
                />

                <Route
                    path="/sign_up"
                    element={<Navigate to={"/auth/sign_up"} />}
                />

                <Route path="/auth/404" element={<PageNotFound />} />
                <Route path="*" element={<Navigate to="/auth/404" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
