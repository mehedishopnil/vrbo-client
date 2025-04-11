import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const { login, googleLogin, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Handle Google Login
  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await googleLogin();
      Swal.fire({
        title: "Successfully Signed In with Google",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/hosting-dashboard/listings");
    } catch (error) {
      console.error("Google Login Failed:", error);
      Swal.fire({
        title: "Google Login Failed",
        text: "An error occurred during Google login. Please try again.",
        icon: "error",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Email/Password Login
  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoggingIn(true);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await login(email, password);
      Swal.fire({
        title: "Successfully Signed In",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      Swal.fire({
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
        icon: "error",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900">Log In</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#D1A054] focus:border-[#D1A054]"
              required
              disabled={isLoggingIn || loading}
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#D1A054] focus:border-[#D1A054]"
              required
              disabled={isLoggingIn || loading}
              autoComplete="current-password"
            />
            <div className="mt-2 text-right">
              <Link to="/forgot-password" className="text-sm text-[#D1A054] hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-[#D1A054] rounded-md hover:bg-[#b18441] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D1A054] disabled:opacity-50"
              disabled={isLoggingIn || loading}
              aria-disabled={isLoggingIn || loading}
            >
              {isLoggingIn || loading ? "Logging In..." : "Login"}
            </button>
          </div>
        </form>

        {/* Google Login Button */}
        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D1A054] disabled:opacity-50"
            disabled={isLoggingIn || loading}
            aria-disabled={isLoggingIn || loading}
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google Logo"
              className="w-5 h-5 mr-2"
            />
            {isLoggingIn || loading ? "Logging In..." : "Continue with Google"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/registration"
            className="font-medium text-[#D1A054] hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;