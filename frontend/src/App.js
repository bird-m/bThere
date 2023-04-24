import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormPage from "./components/LoginFormPage/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";

function App() {
  return (
    <Switch>
      <Route exact path="/login">
          <LoginFormPage/>
      </Route>
      <Route exact path="/signup">
          <SignupFormPage/>
      </Route>
      <Route exact path="/">
        <h1>Hello World</h1>
      </Route>
    </Switch>
  );
}

export default App;
