import {  useEffect, useState } from 'react';
import Navbar from '../../component/Navbar/Navbar';
import { Base_Url } from '../../component/Api/BaseUrl';
import { Change_Password_Middle_Point } from '../../component/Api/MiddlePoint';
import { Change_Password_End_Point } from '../../component/Api/EndPoint';
import { fetchData } from '../../component/Api/axios';
import { toast } from 'react-toastify';
const Profile = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (formData.newPassword !== formData.confirmNewPassword) {
      // setMessage("Password and confirm password should be the same");
       toast.error("Password and confirm password should be the same");
      return;
    }

    const Url = Base_Url + Change_Password_Middle_Point + Change_Password_End_Point;
    const method = "PUT";
    const data = {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      confirmNewPassword: formData.confirmNewPassword
    };

    const response = await fetchData(Url, method, data);

    if (!response || response.status !== 200) {
      // setMessage(response?.data?.error || "Failed to update password");
        toast.error(response?.data?.error || "Failed to update password");
      return;
    }
toast.success("Password updated successfully");
    // setMessage("Password updated successfully");
  } catch (error) {
    console.error("Error while changing password:", error);
    // setMessage("Something went wrong while updating password. Please try again.");
  }
};

useEffect(()=>{
  
})


  return (
    <>
    <Navbar/>
 <div className="w-2/6 bg-gray-100 flex flex-col mx-auto p-4 mt-20 rounded shadow border border-gray-100">      <h2 className="text-lg font-semibold mb-4">Change Password</h2>
      {/* {message && <p className="mb-3 text-sm text-red-500">{message}</p>} */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Update Password
        </button>
      </form>
    </div>
  </>
  );
};

export default Profile;
