import RouteHandler from "./components/routes";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";

function App() {
    return (
        <RouteHandler
            valid_routes={[
                { path: "/sign_up", page: <SignUp /> },
                { path: "/sign_in", page: <SignIn /> },
            ]}
        />
    );
}

export default App;
