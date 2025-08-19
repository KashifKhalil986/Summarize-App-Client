import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-100 shadow-md relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/home" className="text-xl font-bold text-blue-600">Summarize App</Link>
            </div>

            {/* Middle Links */}
            <ul className="hidden md:flex space-x-6 mx-auto font-medium">
              <li>
                <Link to="/home" className="text-blue-600 font-semibold">Home</Link>
              </li>
              <li>
                <Link to="/summary" className="text-blue-600 font-semibold">Summary</Link>
              </li>
            </ul>

            {/* User/Logout Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/profile" className="mx-2">
                <FontAwesomeIcon icon={faUser} className="text-blue-600 text-2xl cursor-pointer" />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-600 cursor-pointer"
              >
                Logout
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-2 space-y-2">
              <ul className="flex flex-col items-start space-y-2 border-t pt-3">
                <li>
                  <Link to="/home" className="text-gray-700 hover:text-blue-600 mx-2">Home</Link>
                </li>
                <li>
                  <Link to="/summary" className="text-gray-700 hover:text-blue-600 mx-2">Summary</Link>
                </li>
                <li>
                  <Link to="/profile" className="mx-2">
                    <FontAwesomeIcon icon={faUser} className="text-gray-600 hover:text-blue-600 cursor-pointer" />
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-blue-600 text-white px-3 py-1 rounded mx-2 hover:bg-blue-600"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
