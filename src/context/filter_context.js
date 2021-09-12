import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    // will get actual max price and update the state in LOAD_PRODUCTS action in filter_reducer.js
    max_price: 0,
    price: 0,
    shipping: false
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  // get array of objects with product properties from products_context state
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  // initially products is empty, that's why we need to use it in dependency (update state when we get our products array)
  useEffect(() => {
    // add products to state.all_products and state.filtered_products, calculate and add max price to state.filters.max_price and state.filters.price
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])

  // when we change sort type or select/clear filters 
  useEffect(() => {
    // update state.filtered_products based on state.filters values (depending on value use .filter to find matching values)
    dispatch({ type: FILTER_PRODUCTS })
    // update state.filtered_products based on state.sort values by using .sort
    dispatch({ type: SORT_PRODUCTS })
  }, [products, state.sort, state.filters])

  // when click on view button in Sort, change state.grid_view to true
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }
  // when click on view button in Sort, change state.grid_view to false
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }

  // when change option in select in Sort, update value in state.sort
  const updateSort = (e) => {
    const value = e.target.value;
    // e.x. value: 'price-highest'
    dispatch({ type: UPDATE_SORT, payload: value })
  }

  // When click on filter element (input/button) in Filter, update corresponding property value in state.filters
  const updateFilters = e => {
    const name = e.target.name;
    let value = e.target.value;
    // for buttons we can't get e.target.value, that's why we need to change logic for buttons
    if (name === 'category') {
      value = e.target.textContent
    }

    if (name === 'color') {
      value = e.target.dataset.color
    }

    if (name === 'price') {
      value = Number(value);
    }

    if (name === 'shipping') {
      value = e.target.checked;
    }

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }

  // when click on button in Filters, change state.filters back to default (initial state)
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  return (
    <FilterContext.Provider value={{
      ...state,
      setGridView,
      setListView,
      updateSort,
      updateFilters,
      clearFilters
    }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
