import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {

  if (action.type === LOAD_PRODUCTS) {
    const prices = action.payload.map((product) => product.price);
    const maxPrice = Math.max(...prices);
    // we need to use spread operator with products, because it creates separate instance and when we filter we don't affect to default array
    // we are copying the values, not reference to same place in memory
    return {
      ...state, all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice }
    }
  }

  if (action.type === SET_GRIDVIEW) {
    return {
      ...state, grid_view: true
    }
  }

  if (action.type === SET_LISTVIEW) {
    return {
      ...state, grid_view: false
    }
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;

    let tempProducts = [...filtered_products];
    // iterate over array and compare prices. Place smallest item first
    if (sort === 'price-lowest') {
      // short-way
      // tempProducts = tempProducts.sort((a, b) => a.price - b.price)
      // long-way
      tempProducts = tempProducts.sort((a, b) => {
        if (a.price < b.price) {
          return -1
          // if a<b -> return -1 (correct order) -> place a before b
        }
        if (a.price > b.price) {
          return 1
          // 1 (reverse order) -> place b before a
        }
        return 0
      })

    }

    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price)
    }

    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }

    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }

    return { ...state, filtered_products: tempProducts }
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    // set up dynamic value inside filters property
    return { ...state, filters: { ...state.filters, [name]: value } }
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;
    // console.log({ text, category, company, color, price, shipping })

    let tempProducts = [...all_products];
    // filtering
    // text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        // console.log(product)
        return product.name.toLowerCase().startsWith(text)
      })
    }
    // category
    if (category !== 'all') {
      tempProducts = tempProducts.filter((product) => product.category === category)
    }
    // company
    if (company !== 'all') {
      tempProducts = tempProducts.filter((product) => product.company === company)
    }
    // colors
    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((col) => col === color);
      })
    }
    // price
    tempProducts = tempProducts.filter(product => product.price <= price)
    // shipping
    if (shipping) {
      tempProducts = tempProducts.filter((product) => product.shipping === true)
    }

    return { ...state, filtered_products: tempProducts }
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state, filters:
      {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false
      }
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
