import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  // get a selector
  const cart = useSelector((state) => state.cart);

  const onLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("Position");
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg  "
      style={{ background: "#102C57" }}
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <div className=" navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/home">
                Home
              </Link>
            </li>

            <li>
              <button
                onClick={onLogout}
                className="nav-link"
                aria-current="page"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
