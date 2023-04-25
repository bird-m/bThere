import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
// import LoginFormPage from "./components/LoginFormPage/AuthFormPage";
// import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import AuthFormPage from "./components/AuthFormPage/AuthFormPage";
import { useSelector } from "react-redux";
import LogoutButton from "./components/LogoutButton/LogoutButton";
import NavBar from "./components/NavBar/NavBar";
import { SplashPage } from "./components/SplashPage/SplashPage";
import SplashFooter from "./components/SplashFooter/SplashFooter";

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

      <Route path="/">
        <NavBar/>
        <SplashPage/>
        <SplashFooter/>
      </Route>


      
    </Switch>
    </>
  );
}

export default App;
