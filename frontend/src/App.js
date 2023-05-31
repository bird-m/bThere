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
import QuestionPane from "./components/QuestionPane/QuestionPane";
import { QuestionList } from "./components/QuestionList/QuestionList";
import FormConfigurator from "./components/FormConfigurator/FormConfigurator";
import FormConfigSidePanel from "./components/FormConfigSidePanel/FormConfigSidePanel";
import ResponsePage from "./components/ResponsePage/ResponsePage";


function App() {


  return (
    <>

      <Switch>
        <Route path="/submit/:formId">
          <ResponsePage />
        </Route>

        <Route path="/form/configure/:formId">
          <FormConfigurator />
        </Route>

        <Route path="/form/:formId?">
          <FormCreatePage />
        </Route>

        <Route exact path="/login">
          <AuthFormPage mode='login' />
        </Route>

        <Route exact path="/signup">
          <AuthFormPage mode='signup' />
        </Route>

        <Route path="/forms">
          <FormConfigurator />
        </Route>

        <Route path="/">
          <NavBar />
          <SplashPage />
          <SplashFooter />
        </Route>

      </Switch>
    </>
  );
}

export default App;
