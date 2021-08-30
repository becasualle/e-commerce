import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(
    <ProductsProvider>
        {/* because we need to get some info from ProductsProvider to FilterProvider we need to put it inside */}
        <FilterProvider>
            <App />
        </FilterProvider>
    </ProductsProvider>,

    document.getElementById('root')

)
