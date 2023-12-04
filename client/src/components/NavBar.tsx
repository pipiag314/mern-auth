import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <nav style={{
      display: "flex",
      gap: "20px",
      justifyContent: "center"
    }}>
      <Link to="/">Home</Link>
      <Link to="/register">register</Link>
      <Link to="/login">login</Link>
    </nav>
  )
}

export default NavBar