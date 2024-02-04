import React, { useState, useEffect } from "react";
import styles from "../HomePage/NavBar.module.css";
import { Link } from "react-router-dom";

function NavBar() {
  // const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Check if the user is logged in by inspecting the localStorage
    const authToken = localStorage.getItem("authtoken");

    if (authToken) {
      // Fetch user info using the token
      fetchUserInfo(authToken);
    }
  }, []);
  async function fetchUserInfo(token) {
    try {
      // Fetch user info from the server using the token
      const response = await fetch(
        "https://trails-6dwz.onrender.com/userInfo",
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      if (response.ok) {
        // If the response is successful, extract user information and update the state
        const data = await response.json();
        setUserInfo(data.user);
        // store userInfo in session Storage
        sessionStorage.setItem("userInfo", JSON.stringify(data.user));
        // console.log(sessionStorage.getItem('userInfo'))
      }
    } catch (error) {
      // Handle errors that occur during the fetch
      console.error("Error fetching user info:", error);
    }
  }
  function handleLogout() {
    // Clear the authentication token and user info on logout
    localStorage.removeItem("authtoken");
    setUserInfo(null);

    sessionStorage.removeItem("userInfo");
    console.log("Logout Successfully");
    // navigate("/");
  }

  return (
    <>
      {/* Navigation bar with links */}
      <nav className={`nav d-flex justify-content-around p-3 ${styles.nav}`}>
        <div className="title-name d-flex">
          {/* Link to the home page */}
          <Link to={"/"} className={`m-2 ${styles.title}`}>
            Zomato App
          </Link>
        </div>
        <div>
          {userInfo ? (
            <>
              {/* Display user's name for the "My Account" link */}

              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-primary fw-bold dropdown-toggle p-2 m-2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {userInfo.name.split(" ")[0].charAt(0).toUpperCase()}
                  {userInfo.name.split(" ")[1].charAt(0).toUpperCase()}
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/profile"}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/MyOrder"}>
                      My Order
                    </Link>
                  </li>
                </ul>
              </div>

              <Link
                to={"/"}
                onClick={handleLogout}
                className={`${styles.logOutBtn} m-2 btn text-white`}
              >
                Logout
              </Link>
            </>
          ) : (
            // Display links for users who are not logged in
            <>
              <Link
                to={"/login"}
                className={`${styles.loginBtn} m-1 btn bg-warning `}
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                className={` m-1 btn text-white ${styles.signupBtn}`}
              >
                Create an account
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
