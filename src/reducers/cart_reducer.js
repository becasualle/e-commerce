import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    // color and amount which we select when add to cart, id and product - from single_product state
    const { id, color, amount, product } = action.payload;
    //Example: { id: "recm7wC8TBVdU9oEL", color(mainColor): "#0000ff", amount: 1, product: {category, colors, company, description, id, images, name, price, reviews, stars, stock} } 

    // find if there is same item already in the cart
    const tempItem = state.cart.find(item => {
      // compare if id item in cart (recoW8ecgjtKx2Sj2#ff0000) matches id item that we add 
      // if we add item with same id and same color like we already have in the card - create tempItem. if not - create new item and it to a cart
      return item.id === id + color
    })

    // add existing item to the card
    // if we created tempItem it means that we add item that already have in the cart
    if (tempItem) {
      const tempCart = state.cart.map(cartItem => {
        // update amount only for exact item with same color and id, not to all items in array
        // for item that matches update amount or set it to max amd update it's amount
        if (cartItem.id === id + color) {

          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...cartItem, amount: newAmount }
          // if item doesn't match just return it
        } else {
          return cartItem
        }
      })
      // update state with those changes
      return { ...state, cart: tempCart }
    }

    // if we don't have this item -- add new item to the cart 
    else {
      // create unique id for item using color, for matching when we do some changes
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload)
    return { ...state, cart: tempCart }
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {

        if (value === 'inc') {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max
          }
          return { ...item, amount: newAmount }
        }

        if (value === 'dec') {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...item, amount: newAmount }
        }

      } return item
    })

    return { ...state, cart: tempCart }
  }

  if (action.type === COUNT_CART_TOTALS) {

    // for each item in cart get it's amount and price and save to total_items, total_amount
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        // initial total is object so we can add values for it's properties each iteration over cartItems
        total.total_items += amount;
        total.total_amount += price * amount;
        // total example: {total_items: 8, total_amount: 49792}
        return total
      },
      {
        total_items: 0,
        total_amount: 0
      })

    return { ...state, total_items, total_amount }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
