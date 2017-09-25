import React from 'react'
import TotalOrder from './TotalOrder'
import CardSection from './CardSection'
import { injectStripe } from 'react-stripe-elements'
import axios from 'axios'

// begin form validation
class CheckoutForm extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault()

    const extraDetails = {
      name: this.name.value,
      email: this.email.value,
      phone: this.tel.value,
      address_country: this.country.value,
      address_city: this.city.value,
      address_zip: this.postcode.value,
      address_line1: this.street.value,
    }

    const apiUrl = 'http://localhost:3000/v1/orders'

    this.props.stripe.createToken(extraDetails).then(({token}) => {
      console.log('Received Stripe token: ', token)
      axios.post(apiUrl, {
        cart_products: this.props.cartProducts,
        name: extraDetails.name,
        email: extraDetails.email,
        tel: extraDetails.phone,
        country: extraDetails.address_country,
        city: extraDetails.address_city,
        postcode: extraDetails.address_zip,
        street: extraDetails.address_line1,
        stripe_token: token
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
    })

  }

  render() {
    const {cartProducts, email, cardholderName, phone, selectedCountry, city, postalCode, address, handleUserInput, formValid, emailValid, phoneValid, selectedCountryValid, cityValid, postalCodeValid, addressValid} = this.props;

    return(
      <form onSubmit={this.handleSubmit} >

        <section className="your-details">

          <div className="field form-group">
            <div className="control has-icons-left">
              <label htmlFor="name">Name *</label>
              <input ref={(input) => this.name = input}
                className={`input ${cardholderName.length > 2 ? 'is-success' : 'is-warning'}`}
                type="text"
                name='name'
                placeholder='First and Last Name'
                value={cardholderName}
                onChange={ (e) => handleUserInput(e) }
              />
              <span className="icon is-small is-left icon-fix">
                <i className="fa fa-user-o"></i>
              </span>

            </div>
            {
              cardholderName.length === 2 || cardholderName.length === 1 ?
                <ul className={`help is-danger is-pulled-right`}>
                  <li>* Name is too short *</li>
                </ul>
                :
                null
            }
          </div>

          <div className={`field form-group`}>
            <div className="control has-icons-left">
              <label htmlFor="email">Email address *</label>
              <input ref={(input) => this.email = input}
                type="email"
                placeholder="Email"
                className={`input ${emailValid ? 'is-success' : 'is-warning'}`}
                name='email'
                value={email}
                onChange={(e) => handleUserInput(e)}
                />
              <span className="icon is-small is-left icon-fix">
                <i className="fa fa-envelope-o"></i>
              </span>

            </div>

            {
              email.length > 3 && emailValid === null ?
                <ul className={`help is-danger is-pulled-right`}>
                  <li>* This is not a valid email *</li>
                </ul>
                :
                null
            }
          </div>

          <div className="field form-group">
            <div className="control has-icons-left">
              <label htmlFor="phone">Mobile *</label>
              <input ref={(input) => this.tel = input}
                className={`input ${phoneValid  ? 'is-success' : 'is-warning'}`} type="tel" placeholder='Phone: 10 Digids'
                name='phone'
                value={phone}
                onChange={(e) => handleUserInput(e)}
                     />
              <span className="icon is-small is-left icon-fix">
                <i className="fa fa-mobile"></i>
              </span>
            </div>
          </div>
          {
            phoneValid === null && phone.length > 2 ?
              <ul className={`help is-danger is-pulled-right`}>
                 <li>* Phone Number is required  and must contain 10 DIGIDS*</li>

               </ul>

              :
              null
          }
        </section>

        <section className="ship-to">
          <p className="subtitle">Ship to</p>
          {/* <div className="field form-group">
            <p className="control has-icons-left">
              <input className="input" type="text" name='shipTo-name' placeholder='First and Last Name' />
              <span className="icon is-small is-left">
                <i className="fa fa-user-o"></i>
              </span>
            </p>
          </div> */}

          <div className="field form-group">
            <div className="control has-icons-left">
              <label htmlFor="selectedCountry">Select your country *</label>
              <span className="select">
                <span className="icon is-small is-left">
                  <i className="fa fa-globe"></i>
                </span>

                <select ref={(input) => this.country = input}
                  defaultValue={selectedCountry}
                  onChange={(e) => { handleUserInput(e) }}
                  name='selectedCountry'
                  className={`input ${selectedCountryValid ? 'is-success' : 'is-warning'}`}
                >
                  <option >Select Country</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Italy">Italy</option>
                  <option value="Germany">Germany</option>
                </select>

              </span>

            </div>
            {
              selectedCountryValid === null ?
                <ul className={`help is-danger is-pulled-right`}>
                   <li>* Please select a country *</li>
                 </ul>

                :
                null
            }
          </div>

          <div className="field is-grouped form-group">
            <div className="control has-icons-left city">
              <label htmlFor="city">City *</label>
              <input ref={(input) => this.city = input}
                className={`input ${cityValid  ? 'is-success' : 'is-warning'}`} type="text" placeholder='City'
                name='city'
                value={city}
                onChange={(e) => { handleUserInput(e) }}
              />
              <span className="icon is-small is-left icon-fix">
                <i className="fa fa-map-o"></i>
              </span>
            </div>
            {
              cityValid === null ?
                <ul className={`help is-danger is-pulled-right`}>
                   <li>* Please enter your city *</li>
                 </ul>

                :
                null
            }

            <div className="control has-icons-left postalCode">
              <label htmlFor="postalCode">Postal Code *</label>
              <input ref={(input) => this.postcode = input}
                className={`input ${postalCodeValid  ? 'is-success' : 'is-warning'}`} type="text" name='postalCode' placeholder='Postal Code'
                value={postalCode}
                onChange={(e) => { handleUserInput(e) }}
               />
              <span className="icon is-small is-left icon-fix">
                <i className="fa fa-map-o"></i>
              </span>
            </div>

            {
              postalCodeValid === null ?
                <ul className={`help is-danger is-pulled-right`}>
                   <li>* Please enter your post code *</li>
                 </ul>

                :
                null
            }

          </div>

          <div className="field form-group">
            <div className="control has-icons-left">
              <label htmlFor="address">Street address *</label>
              <input  ref={(input) => this.street = input}
                className={`input ${addressValid  ? 'is-success' : 'is-warning'}`} type="text"
                name='address' placeholder='Street Address'
                value={address}
                onChange={(e) => { handleUserInput(e) }}
               />
              <span className="icon is-small is-left icon-fix">
                <i className="fa fa-map-o"></i>
              </span>
            </div>
            {
              addressValid === null ?
                <ul className={`help is-danger is-pulled-right`}>
                   <li>* Please enter your street and number *</li>
                 </ul>

                :
                null
            }
          </div>

        </section>

        <hr/>

        <CardSection />

        <section className="invoice">
          {
            cartProducts.length > 0 ? <TotalOrder cartProducts={cartProducts} /> : null
          }
        </section>

        <div className="field is-grouped submit">
          <p className="control">
            <button className="button is-primary" type='submit' disabled={!formValid}>Confirm Order</button>
          </p>
        </div>
      </form>
    )
  }

}

export default injectStripe(CheckoutForm)