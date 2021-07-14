import HomePage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Navbar from "./Pages/Navbar";
import { ProductProvider } from "./context/productContext/ProductContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserProvider } from "./context/UserContext/UserContext";

function App() {
  return (
    <ProductProvider>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </ProductProvider>
  );
}

export default App;
