import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from './Orders';

const promise = loadStripe('pk_test_51Kma2nIq3vLJGy4T7hIgLYv90uanq22pH4ZP9wuk3Ur9bO6WkDOt125i8bEkMd5ebJ2cjAlX38Pd6gbLb0hjgJTk00ta3SC6r2');

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('The User id >>>> ', authUser);
      if(authUser){
        // logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/checkout" element={[<Header />, <Checkout />]} />
          <Route path='/login' element={[<Login/>]}/>
          <Route path="/payment" element={[<Header />, <Elements stripe={promise}><Payment/></Elements>]} />
          <Route path="/orders" element={[<Header />, <Orders />]}/>

          <Route path='/'element={[<Header />, <Home />]}/>
        </Routes>
      </div>
    </Router>
  );
}
    
    

export default App;
