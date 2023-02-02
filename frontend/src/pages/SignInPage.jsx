import { useState } from "react";
import { useSignIn } from "../hooks/useSignIn";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, isLoading, error } = useSignIn();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(email, password);
  };

  return (
    <form className="login">
      <h3>Welcome back, Sign In</h3>
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
        Login
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignInPage;
