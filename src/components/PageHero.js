import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// show breadcrumbs at the header of page
const PageHero = ({ title }) => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3>
          {/* breadcrumbs with dynamic title that we send as props */}
          <Link to='/'>Home</Link>/ {title}
        </h3>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 20vh;
  display: flex;
  align-items: center;

  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`

export default PageHero
