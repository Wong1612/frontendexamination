import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import ProductList from './components/productlist'
import ManageProduct from './components/admin/manageproduct'
import { Route, withRouter, Switch} from 'react-router-dom' //use WithRouter if there's route in App.js
import { connect } from 'react-redux'
import { keepLogin } from './1.actions'
import './App.css';
import Cookies from 'universal-cookie';
import PageNotFound from './components/pagenotfound'
import Cart from './components/cart'
import ProductDetail from './components/productDetail'
import ScrollToTop from './components/scrollToTop'

const objCookie = new Cookies()
class App extends Component {
  componentDidMount() {
      var cookie = objCookie.get('userData')
      if (cookie !== undefined) {
        this.props.keepLogin(cookie)
      }
  }

  render() {
    return (
      <div class = "container">
          <Navbar/>
          <ScrollToTop>
          <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path='/register' component={Register} exact/>
          <Route path='/product-list' component={ProductList} exact/>
          <Route path='/manage-product' component={ManageProduct} exact/>
          <Route path='/product-detail/:id' component={ProductDetail} exact/>
          <Route path='/cart' component={Cart} exact/>
          <Route path='*' component={PageNotFound} exact/>
          </Switch>
          </ScrollToTop>
      </div>
    );
  }
}

export default withRouter (connect (null, {keepLogin})(App));
