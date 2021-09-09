import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  // get props from SingleProductPage, which gets data using fetchSingleProduct in products_context
  const { id, stock, colors } = product;
  // colors is array so basically we set first color as main. We will update this state when click on color. 
  const [mainColor, setMainColor] = useState(colors[0]);
  // when we add product we add at least one of it
  const [amount, setAmount] = useState(1);

  // when we click plus button add 1 product, but we can add as many products as we have in stock, not more
  const increase = () => {
    setAmount((prevAmount) => {
      let tempAmount = prevAmount + 1;
      // if we have more items that in stock - stop adding 1
      if (tempAmount > stock) {
        tempAmount = stock;
      }
      return tempAmount;
    });

  }
  // when we click minus button decrease amount, but we can't have less than one (unless we delete in cart)
  const decrease = () => {
    setAmount((prevAmount) => {
      let tempAmount = prevAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  }

  return <Wrapper>
    <div className="colors">
      <span>colors : </span>
      {/* generate color button and change background color from array */}
      {/* on click update state. If we color of element matches main color - set opacity to 1 and add check icon */}
      <div>
        {
          colors.map((color, index) => {
            return <button
              key={index}
              className={`${mainColor === color ? 'color-btn active' : 'color-btn'}   `}
              style={{ background: color }}
              onClick={() => { setMainColor(color) }}
            >
              {mainColor === color ? <FaCheck /> : null}
            </button>
          })
        }
      </div>
    </div>

    <div className="btn-container">
      <AmountButtons amount={amount} increase={increase} decrease={decrease} />
      {/* when we click on button - in cart_reducer fires ADD_TO_CART action */}
      <Link to="/cart" className="btn" onClick={() => addToCart(id, mainColor, amount, product)}>add to cart</Link>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
