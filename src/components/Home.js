import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"

const Home = () => {
  return (<div className="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Holy guacamole!</strong> Your Profile is Incomplete <Link to="/profile">Complete Now</Link>
  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
  )
}

export default Home