import RouteHandler from "./components/routes";
import LogIn from "./pages/login";
import SignUp from "./pages/signup";

function App() {
    return (
        <RouteHandler
            valid_routes={[
                { path: "/sign_up", page: <SignUp /> },
                { path: "/log_in", page: <LogIn /> },
            ]}
        />
    );
}

export default App;
