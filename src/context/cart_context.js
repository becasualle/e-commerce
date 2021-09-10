import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'
// import { links } from '../utils/constants'

const getLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'))
  } else {
    return []
  }
}

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // we fire add to cart in AddToCart when click on button. Product and id we get from single_product state, color and amount from AddToCart
  // this function will add new item to a cart, or if it exists - change it amount in state. We will update "cart" state with new or modified object. It will trigger useEffect which setItem to localStorage 
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } })
  }

  // call this function when click on button in CartItem, get id of state.cart.item.id
  // update state.cart using filter by id in cart_reducer
  const removeItem = id => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
  };

  // call it when click on increase or decrease buttons and send value to identify operation, update state.cart.amount in cart_reducer
  const toggleAmount = (id, value) => {
    // console.log({ id, value })
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } })
  };

  // call it in CartContent. In cart_reducer return state.cart = [] 
  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  };

  // each time we change "cart" state (by using functions above and corresponding actions to reducer) - update localStorage
  useEffect(() => {
    // on every cart change count and update total_items, total_amount
    dispatch({ type: COUNT_CART_TOTALS })
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart])

  return (
    <CartContext.Provider value={{
      ...state,
      addToCart,
      removeItem,
      toggleAmount,
      clearCart
    }}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
