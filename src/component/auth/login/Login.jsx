import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Base_Url } from '../../Api/BaseUrl';
import { Login_Middle_Point } from '../../Api/MiddlePoint';
import { Login_End_Point } from '../../Api/EndPoint';
import { fetchData } from '../../Api/axios';
import { toast } from "react-toastify";   

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      const url = Base_Url + Login_Middle_Point + Login_End_Point;
      const method = "POST";
      const data = { email, password };
      const response = await fetchData(url, method, data);

      console.log("login response", response);

      if (response.status === 200 || response.status === 201) {
        console.log("response data", response.data);
        localStorage.setItem('token', response.data.token);

        toast.success("Login Successful! Redirecting...");
        navigate("/home");
      } else {
        toast.error("Login failed. Please check credentials.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
