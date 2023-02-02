import { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <form className="signup">
      <h3>Sign Up, create new account</h3>
      <label>Email</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Email"
      />
      <label>Password</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
      />
      <button disabled={isLoading} onClick={handleSubmit}>
        Signup
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignUpPage;
