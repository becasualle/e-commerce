import React, { useState } from 'react'
import styled from 'styled-components'

// before fetch image is undefined so we need to set default value in order to useState based on images
const ProductImages = ({ images = [{ url: '' }] }) => {
  const [main, setMain] = useState(images[0]);

  return <Wrapper>
    <img src={main.url} alt="main" className="main" />
    <div className="gallery">
      {images.map((image, index) => {
        // when click on small image - update state and show it as main image
        return <img
          src={image.url}
          alt={image.filename}
          key={index}
          // when click change main image to clicked one
          onClick={() => setMain(images[index])}
          // add border to show what image we display now as main
          className={`${image.url === main.url ? 'active' : null}`}
        />
      })}
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages
