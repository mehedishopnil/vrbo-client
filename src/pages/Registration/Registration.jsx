import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';

const Registration = () => {
  const { registration, googleLogin, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    photoUrl: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      await googleLogin();
      Swal.fire({
        title: "Registration Successful!",
        text: "You've been registered with Google",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/');
    } catch (error) {
      console.error("Google Registration Failed:", error);
      Swal.fire({
        title: "Registration Failed",
        text: error.message || "An error occurred during Google registration",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Email/Password Registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await registration(formData.email, formData.password, formData.name, formData.photoUrl);
      Swal.fire({
        title: "Registration Successful!",
        text: "Your account has been created",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      Swal.fire({
        title: "Registration Failed",
        text: error.message || "Please check your details and try again",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link 
            to="/login" 
            className="font-medium text-[#D1A054] hover:text-[#b18441]"
          >
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Google Sign Up Button */}
          <div className="mb-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center gap-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D1A054] disabled:opacity-50"
              disabled={isSubmitting || loading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.152-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.496 10-10 0-0.67-0.069-1.325-0.189-1.955h-9.811z"/>
              </svg>
              {isSubmitting || loading ? "Processing..." : "Sign up with Google"}
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#D1A054] focus:border-[#D1A054] sm:text-sm"
                  placeholder="John Doe"
                  disabled={isSubmitting || loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">
                Photo URL (Optional)
              </label>
              <div className="mt-1">
                <input
                  id="photoUrl"
                  name="photoUrl"
                  type="url"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#D1A054] focus:border-[#D1A054] sm:text-sm"
                  placeholder="https://example.com/photo.jpg"
                  disabled={isSubmitting || loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#D1A054] focus:border-[#D1A054] sm:text-sm"
                  placeholder="you@example.com"
                  disabled={isSubmitting || loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#D1A054] focus:border-[#D1A054] sm:text-sm"
                  placeholder="••••••••"
                  disabled={isSubmitting || loading}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Use at least 8 characters with a mix of letters, numbers & symbols
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D1A054] hover:bg-[#b18441] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D1A054] disabled:opacity-50"
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : 'Create account'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="font-medium text-[#D1A054] hover:text-[#b18441]">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="font-medium text-[#D1A054] hover:text-[#b18441]">
                Privacy Policy
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;