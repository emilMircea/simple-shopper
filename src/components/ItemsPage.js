import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import '../styles/ItemsPage.css'


const ItemsPage = ({products, onAddToCart}) =>
  <div className="items-page">
    <h2>Items Page</h2>
    {
      products.map(product =>
        <Item
          key={product.id}
          product={product}
          onAddToCart={() => onAddToCart(product)}
        />
      )
    }
  </div>



ItemsPage.propTypes = {
  products: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired
}

export default ItemsPage
