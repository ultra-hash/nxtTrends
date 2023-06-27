// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalValue = 0
      cartList.forEach(item => {
        totalValue += item.price * item.quantity
      })
      return (
        <div className="cart-summary-container">
          <div className="cart-summary-price-container">
            <h1 className="cart-summary-heading">
              Order Total:{' '}
              <span className="cart-summary-heading-total-price">
                Rs {totalValue}/-
              </span>
            </h1>
            <p>{cartList.length} items in cart</p>
          </div>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
