import React from 'react'
import '../styles/Product.css'
import { inject, observer} from 'mobx-react'

@inject(['products'])
@observer
class IndividualProductView extends React.Component {

  componentWillMount(){
    this.props.products.fetchAll() // -> this.props.products.all
  }

  findProductById = productId => {
    const product = this.props.products.all.find(
      product => product.id === parseInt(productId, 10)
    );
    return { ...product };
  }

  render(){
    const { onAddToCart, match } = this.props;
    const product = this.findProductById(match)
    return(
      <div className="card individual-product-view">
        <div className="primary-image-wrapper">
          <figure className="image">
            <img src={product.main_img_url} alt={product.name} />
          </figure>
        </div>
        <div className="secondary-images-wrapper">
          <figure className="image">
            <img src={product.second_img_url} alt={product.name} />
          </figure>
          <figure className="image">
            <img src={product.third_img_url} alt={product.name} />
          </figure>
          <figure className="image">
            <img src={product.fourth_img_url} alt={product.name} />
          </figure>
        </div>
        <div className="card-content">
          <div className="info-product-wrapper">
                <h3 className="title is-2 product-name">{product.name}</h3>
                <p className="subtitle is-5 has-text-weight-bold product-price">
                  <span className="icon">
                    <i className="fa fa-eur" aria-hidden="true"></i>
                  </span>
                  {product.price/100}
                </p>
          </div>

          <div className="column info-product-wrapper">
            <p className='description'>{product.description}</p>

            {
              product.stock > 0 ?
              <button
                className="addToCart button is-primary is-outlined"
                onClick={() => onAddToCart(product)}
              >
                Add to cart
              </button>
              :
              <button disabled className="button is-danger is-outlined out-of-stock-btn">Out of stock</button>

            }
          </div>
        </div>
      </div>
    )
  }

}


export default IndividualProductView
