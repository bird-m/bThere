import { Route } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormPage from "./components/LoginFormPage/LoginFormPage";

function App() {
  return (
    <>
      <Route exact path="/login" component={LoginFormPage}/>
      <Route exact path="/" component={() => (<h1>Hello World</h1>)}/>
    </>
  );
}

export default App;
