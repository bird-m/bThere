import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
// import LoginFormPage from "./components/LoginFormPage/AuthFormPage";
// import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import AuthFormPage from "./components/AuthFormPage/AuthFormPage";
import { useSelector } from "react-redux";
import LogoutButton from "./components/LogoutButton/LogoutButton";
import NavBar from "./components/NavBar/NavBar";
import { SplashPage } from "./components/SplashPage/SplashPage";
import SplashFooter from "./components/SplashFooter/SplashFooter";
import FormsPage from "./components/FormsPage/FormsPage";
import FormDetails from "./components/FormDetails/FormDetail";
import FormCreatePage from "./components/FormCreatePage/FormCreatePage";
import { LoggedInBanner } from "./components/LoggedInBanner/LoggedInBanner";

function App() {
  

  return (
    <>
    
    <Switch>

      <Route path="/deets">
        <LoggedInBanner/>
      </Route>

      <Route path="/form/:formId?">
        <FormCreatePage/>
      </Route>

      <Route exact path="/login">
        <AuthFormPage mode='login'/>
      </Route>

      <Route exact path="/signup">
        <AuthFormPage mode='signup'/>
      </Route>

      <Route path="/forms">
        <FormsPage/>
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
