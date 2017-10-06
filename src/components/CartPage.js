import React from 'react'
import '../styles/CartPage.css'
import { Link } from 'react-router-dom'

import CartPageProductView from './CartPageProductView'
import TotalOrder from './TotalOrder'

const EmptyCartMessage = () =>
<div className="notification is-warning empty-cart-message">
    You cart is <strong>empty</strong>. Add products to your cart before proceeding to checkout.
</div>

const CartPage = ({ cart, cartProducts, onAddOne, onRemoveOne }) =>
  <div className='cart-page'>
    <h2 className='cart-title'>Cart Page</h2>
    <ul className='cart-list'>
      {
        cartProducts.map(product =>
          <li
            key={product.id}
            className='CartPage-item box'
          >
            <CartPageProductView
              product={product}
            />
            <div className="cart-product-controls">
              <a
                className='remove-one button is-white'
                onClick={() => onRemoveOne(product)}
              >
                {
                  product.count > 1 ?
                  <span className='button is-danger is-outlined'>&ndash;</span> : <span className='button is-light'>x</span>
                }
              </a>

              <span className='product-count'>{product.count}</span>

              <button
                className="add-one button is-primary is-outlined"
                onClick={() => onAddOne(product)}
              >
                +
              </button>
            </div>
          </li>
        )
      }
      {/* cart products total */}
      <li className='cartPage-total'>
        {
          cartProducts.length > 0 ? <TotalOrder cartProducts={cartProducts} /> : null
        }

      </li>
    </ul>

    {/* checkout button */}
    {
      cartProducts.length > 0 ?
        <Link to='/checkout' className='button is-primary button-large is-pulled-right checkout-btn' >Checkout</Link>
        :
        <EmptyCartMessage />
    }


  </div>

export default CartPage
