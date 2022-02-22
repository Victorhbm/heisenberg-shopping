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
          path="/heisenberg-shopping/product/:id"
          render={ (props) => <Product { ...props } /> }
        />
        <Route path="/heisenberg-shopping/cart" component={ Cart } />
        <Route path="/heisenberg-shopping/" component={ Home } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
