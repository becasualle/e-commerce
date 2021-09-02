import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

// Domain
// dev-3ayl8y6u.eu.auth0.com
// Client ID
// QrcVlLWcMDcYqLAsbTOSrHGBfvHi0Bq8

ReactDOM.render(
    <Auth0Provider
        domain="dev-3ayl8y6u.eu.auth0.com"
        clientId="QrcVlLWcMDcYqLAsbTOSrHGBfvHi0Bq8"
        redirectUri={window.location.origin}
        cacheLocation='localstorage'
    >
        <UserProvider>
            <ProductsProvider>
                {/* because we need to get some info from ProductsProvider to FilterProvider we need to put it inside */}
                <FilterProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </FilterProvider>
            </ProductsProvider>
        </UserProvider>
    </Auth0Provider>,

    document.getElementById('root')

)
