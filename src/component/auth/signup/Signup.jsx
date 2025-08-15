import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Base_Url } from '../../Api/BaseUrl';
import { SignUp_Middle_Point } from '../../Api/MiddlePoint';
import { Sign_Up_End_Point } from '../../Api/EndPoint';
import { fetchData } from '../../Api/axios';
const Signup = () => {
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        password: '',
        confirmPassword: ''
    });
const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const {name,email,password,confirmPassword}=formData;
        
        // will be confirm
        const data = {
            name:name,
            email:email,
            password:password,
            confirmPassword:confirmPassword
        }
        
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
  
        try {
            const url =Base_Url +SignUp_Middle_Point +Sign_Up_End_Point;
            const method = "POST";
            const response = await fetchData(url,method,data)
            console.log("signup response",response)
             if(response.status === 200 || response.status === 201 ){
            setSuccess("SignUp successfully")
            navigate('/')
             }else{
alert("error",response.error)
    }
            // const response = await axios.post('http://localhost:3001/api/auth/register',data);
            // console.log("response",response);
            // setSuccess("SignUp successfully")
            // navigate('/')
        } catch (error) {
            console.log(error);
            setError("SignUp fails")
        }

       

    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

            {error && <p className="text-red-500 mb-3">{error}</p>}
            {success && <p className="text-green-500 mb-3">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="name"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
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

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Sign Up
                </button>
            </form>
            <p className="mt-4 text-sm text-center">
                <Link to="/" className="text-blue-600 hover:underline">
                    Go Back
                </Link>
            </p>
        </div>
    );
};

export default Signup;
