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
    // we need to use spread operator with products, because it creats separate instance and when we filter we don't affect to default array
    // we are copying the values, not reference to same place in memory
    return {
      ...state, all_products: [...action.payload],
      filtered_products: [...action.payload]
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
