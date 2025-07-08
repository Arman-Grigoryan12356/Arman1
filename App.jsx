import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("loginData");
    return saved ? JSON.parse(saved) : { email: "", password: "" };
  });

  const [errors, setErrors] = useState({});
  const [isTouched, setIsTouched] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Save form data to localStorage
  useEffect(() => {
    localStorage.setItem("loginData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validate({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setIsTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validate = (data) => {
    const newErrors = {};

    if (!data.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!data.password) {
      newErrors.password = "Password is required.";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
  };

  useEffect(() => {
    validate(formData);
  }, []);

  const isFormValid =
    formData.email && formData.password && Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login was successful ✅");
    setIsLoggedIn(true);
    fetchSpaceXHistory();
  };

  const fetchSpaceXHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.spacexdata.com/v3/history");
      const data = await res.json();
      setHistory(data);
    } catch (error) {
      console.error("Failed to load SpaceX data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="spacex-container">
        <h2>SpaceX Historical Events</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {history.map((event) => (
              <li key={event.id} style={{ marginBottom: "20px" }}>
                <h3>{event.title}</h3>
                <p>📅 {new Date(event.event_date_utc).toLocaleDateString()}</p>
                <p>{event.details}</p>
                {event.links?.article && (
                  <a
                    href={event.links.article}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Article
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // Before login → show form
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Sign in</h2>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your email"
        />
        {isTouched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your password"
        />
        {isTouched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
      </div>

      <button type="submit" disabled={!isFormValid}>
        Sign In
      </button>
    </form>
  );
}

export default App;
