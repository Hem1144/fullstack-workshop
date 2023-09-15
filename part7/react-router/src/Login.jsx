import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.username.value);
    setUser(event.target.username.value);
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" />
      <button>Submit</button>
    </form>
  );
};

export default Login;
