import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
// import LoginFormPage from "./components/LoginFormPage/AuthFormPage";
// import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import AuthFormPage from "./components/AuthFormPage/AuthFormPage";
import { useSelector } from "react-redux";
import LogoutButton from "./components/LogoutButton/LogoutButton";

function App() {
  

  return (
    <>
    <LogoutButton/>
    <Switch>

      <Route exact path="/login">
        <AuthFormPage mode='login'/>
      </Route>

      <Route exact path="/signup">
        <AuthFormPage mode='signup'/>
      </Route>

      <Route exact path="/">
        <h1>Hello World</h1>
      </Route>
      
    </Switch>
    </>
  );
}

export default App;
