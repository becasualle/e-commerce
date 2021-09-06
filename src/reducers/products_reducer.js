import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {

  // update state when we call openSidebar. We do it when click on burger in Navbar
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSideBarOpen: true }
  }
  // update state when we call closeSidebar. We do it when click on buttons in SideBar
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSideBarOpen: false }
  }
  // update state when we fetch our data. We do it each time product_context uploads (useEffect)
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true }
  }
  // update state when we get our data in fetchProducts in product_context
  if (action.type === GET_PRODUCTS_SUCCESS) {
    // get all products that have property featured = true
    const featured_products = action.payload.filter((product) => product.featured === true)
    return { ...state, products_loading: false, products: action.payload, featured_products }
  }
  // update state when we get error in fetchProducts in product_context
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_loading: false, products_error: true }
  }
  // update state when fetchSingleProduct fires. We call it when rendering SingleProductPage (using url and id of it's product)
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return { ...state, single_product_loading: true, single_product_error: false }
  }
  // update state when we get our data in fetchSingleProduct in product_context
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return { ...state, single_product_loading: false, single_product: action.payload }
  }
  // update state when we get error in fetchSingleProduct in product_context
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return { ...state, single_product_loading: false, single_product_error: true }
  }

  // return state

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
