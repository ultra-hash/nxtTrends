import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    this.setState(prevState => {
      const {cartList} = prevState
      const index = cartList.findIndex(item => item.id === product.id)
      if (index === -1) {
        return {cartList: [...prevState.cartList, product]}
      }

      cartList.forEach(eachItem => {
        if (eachItem.id === product.id) {
          const {...newObject} = eachItem
          newObject.quantity += product.quantity
          cartList[index] = newObject
        }
      })
      return {cartList: [...cartList]}
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = cartItemId => {
    this.setState(prevState => {
      const {cartList} = prevState
      const index = cartList.findIndex(item => item.id === cartItemId)
      cartList.splice(index, 1)
      return {cartList: [...cartList]}
    })
  }

  incrementCartItemQuantity = cartItemId => {
    this.setState(prevState => {
      const {cartList} = prevState
      cartList.forEach((item, index) => {
        if (cartItemId === item.id) {
          const {...newItem} = item
          newItem.quantity += 1
          cartList[index] = newItem
        }
      })
      return {cartList: [...cartList]}
    })
  }

  decrementCartItemQuantity = cartItemId => {
    this.setState(prevState => {
      const {cartList} = prevState
      cartList.forEach((item, index) => {
        if (cartItemId === item.id) {
          const {...newItem} = item
          newItem.quantity -= 1
          cartList[index] = newItem
        }
      })
      return {cartList: [...cartList]}
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
