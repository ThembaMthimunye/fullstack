import React from 'react'
import { Link } from 'react-router-dom'
import { pageData } from '../assets/PageData/Pagedata'

const Navbar = () => {
  return (
    <div className='fixed flex justify-center items-center flex mx-150  '>
      {pageData.map((page) => {
        return (
          <Link
            to={page.path}
            key={page.path} // Adding a key for React list rendering
            className='p-4 m-4 text-black border-solid border-2 rounded-md'
          >
            <button>
              {page.name}
            </button>
          </Link>
        )
      })}
    </div>
  )
}

export default Navbar
