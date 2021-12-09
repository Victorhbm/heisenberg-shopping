import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/product/:id"
          render={ (props) => <Product { ...props } /> }
        />
        <Route path="/cart" component={ Cart } />
        <Route path="/" component={ Home } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
