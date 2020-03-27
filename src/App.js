import React from "react";
import Form from './Form';
// import Home from './Home';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

function Home(props) {
  return <h1>Lambda Eats</h1>
  
}
const App = () => {
  return (
    <>
      {/* <h1>Lambda Eats</h1>
      <p>You can remove this code and create your own header</p> */}
    <Router>
      <Link to='/'>Home</Link>
      <Link to='/order'>Order</Link>

      <Route exact path='/' component={Home}/>
      <Route path='/order' component={Form}/>
    </Router>
      {/* <Form/> */}
    </>
  );
};
export default App;
