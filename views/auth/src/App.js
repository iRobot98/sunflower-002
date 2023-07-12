import RouteHandler from "./components/routes";
import LogIn from "./pages/login";
import SignUp from "./pages/signup";

function App() {
    return (
        <RouteHandler
            valid_routes={[
                { path: "/signup", page: <SignUp /> },
                { path: "/login", page: <LogIn /> },
            ]}
        />
    );
}

export default App;
