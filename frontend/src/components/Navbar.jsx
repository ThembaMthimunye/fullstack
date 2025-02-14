import React from 'react'
import { Link } from 'react-router-dom'
import { pageData } from '../assets/PageData/Pagedata'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate=useNavigate()
  function logout(){
    sessionStorage.removeItem("user")
    navigate("/")
  }
  return (
    <div className='fixed flex justify-center items-center flex mx-150  '>
      {pageData.map((page) => {
        return (
          <Link
            to={page.path}
            key={page.path} // Adding a key for React list rendering
            className='p-4 m-4  border-solid border-2 rounded-md'
          >
            <button>
              {page.name}
            </button>
            
          </Link>
        )
      })}
      <button onClick={logout}>Log Out  </button>
    </div>
  )
}

export default Navbar
