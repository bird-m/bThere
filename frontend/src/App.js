import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormPage from "./components/LoginFormPage/LoginFormPage";

function App() {
  return (
    <Switch>
      <Route exact path="/login">
        <>
          <h2>there I am</h2>
          <LoginFormPage/>
        </>
        
        {/* <LoginFormPage /> */}
      </Route>
      <Route exact path="/">
        <h1>Hello World</h1>
      </Route>
    </Switch>
  );
}

export default App;
