import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {
  // get me id prop out of object useParams(). We send url param id in Product.js
  const { id } = useParams();
  // get history from React Router DOM
  const history = useHistory();
  // get state values
  const { single_product_loading: loading, single_product_error: error, single_product: product, fetchSingleProduct } = useProductsContext();

  // get product data each time when we load new page (id changes)
  // in products_context we get data and update single_product in state 
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`)
    // eslint-disable-next-line
  }, [id])

  // if error - redirect user to home page after 3 sec
  // need to add error in dependency list because by default it's false and we never redirect
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        // navigate to homepage 
        history.push('/')
      }, 3000)
    }
    // eslint-disable-next-line
  }, [error])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  // if we get data render single product card
  const { name, price, description, stock, stars, reviews, id: sku, company, images } = product;
  return <Wrapper>
    <PageHero title={name} product />
    <div className="section section-center page">
      <Link to="/products" className="btn">back to products</Link>
      <div className="product-center">
        <ProductImages images={images} />
        <section className="content">
          <h2>{name}</h2>
          <Stars stars={stars} reviews={reviews} />
          <h5 className="price">{formatPrice(price)}</h5>
          <p className="desc">{description}</p>
          <p className="info">
            <span>Available : </span>
            {stock > 0 ? 'In stock' : 'out of stock'}
          </p>
          <p className="info">
            <span>SKU : </span>
            {sku}
          </p>
          <p className="info">
            <span>Brand : </span>
            {company}
          </p>
          <hr />
          {/* user can add to cart only if there are items in stock */}
          {stock > 0 && <AddToCart product={product} />}
        </section>
      </div>
    </div>
  </Wrapper>
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
