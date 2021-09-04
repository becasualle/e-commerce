# Readme

# Overview

Responsive React e-commerce project which allows user to find and order furniture for home. 

# Features

- Filters by category, company, colors, price and shipping. User can select, change and clear filters and see results
- Sort by price (lowest-highest) and name (A-Z, Z-A)
- Change product view - grid or list
- Select color and set amount in Single Product Page
- Add to cart
- Cart: change amount, delete product from cart, clear cart. Calculate subtotal, shipping fee, order total
- Checkout (using Stripe): add cart info, pay, redirect to main page after payment.
- Login and logout using Auth0. Checkout available only after login.
- Collect emails using Formspree.io

# Setup

- React 17.0.1
- CSS using styled-components
- Icons using React Icons
- Routing using React Router
- Collect emails with Formspree.io
- Authorization with Auth0
- Checkout with Stripe
- Server-less functions for payment, deployment with Netlify

# Structure

Main project contains pages, components, context, reducers and utils. There are some additional files to set up payments - env, netlify, functions.

- There are several pages. Some of them have all of the code for rendring inside (like ErrorPage), some contains child components (like HomePage), some contains both (like ProductsPage)
- Same with components - in some cases we use child components (Sidebar.js), mostly - not.
- Pages and components folders have index.js inside. We use it for get all of the files and export as object, so we can easy import multiple components in one line like this: `import { FeaturedProducts, Hero, Services, Contact } from '../components'`
- Utils → helpers.js contains functions that help to format price values and get unique values for filters

# Data&State Management

- We get our data from external API, links to it you can find in utils→constatnts.js
- We fetch this data in products_context.js, dispatch to product_reducer.js, updating the state and provide this data to the App.
- We use this data for rendering content in our pages and components, and import it in another context files to build new states.
- We have 3 main context/reducers: products, cart and filter. Also we have user_context for set up Auth0
- We export custom hook (for example useProductsContext) in each context file in order to faster get our data from state
- We store all our actions for context and reducers in separate file — actions.js. It helps us to faster write dispatch type and actions without making errors
- We set up Stripe using stateless functions (create-payment-intent.js), netlify.toml, env, StripeCheckout.js component, and use this component inside CheckoutPage.js