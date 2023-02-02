import React from "react";
import { Link } from "react-router-dom";
import { useSignOut } from "../hooks/useSignOut";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { signout } = useSignOut();

  const { user } = useAuthContext();

  const handleSignOut = () => {
    signout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>WorkBuddy</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          )}

          {!user && (
            <div>
              <Link to="/signin">Sign In</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
