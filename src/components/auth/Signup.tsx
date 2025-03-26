import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        navigate("/login", {
          state: { message: "Registration successful! Please log in." },
        });
      } else {
        // Registration failed
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Create Admin Account</h1>
        <p>Register to access the delivery management dashboard</p>

        {error && <div className="error-alert">{error}</div>}

        <RegistrationForm onSubmit={handleSignup} />

        <div className="login-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
