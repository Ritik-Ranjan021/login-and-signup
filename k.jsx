// Import React and Material-UI components
import React, { useState } from "react";
import { Container, Grid, Paper, TextField, Button, Typography } from "@material-ui/core";

// Define a custom component for the login form
function LoginForm(props) {
  // Use state hooks to store the input values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Define a function to handle the form submission
  const handleSubmit = (event) => {
    // Prevent the default browser behavior
    event.preventDefault();
    // Call the login API with the input values
    props.login(username, password);
  };

  // Return the JSX code for the login form
  return (
    <Paper elevation={3} style={{ padding: 20 }}>
      <Typography variant="h4" align="center">
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username or Email"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          fullWidth
          margin="normal"
          type="password"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Paper>
  );
}

// Define a custom component for the sign-up form
function SignUpForm(props) {
  // Use state hooks to store the input values
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Define a function to handle the form submission
  const handleSubmit = (event) => {
    // Prevent the default browser behavior
    event.preventDefault();
    // Check if the passwords match
    if (password === confirmPassword) {
      // Call the sign-up API with the input values
      props.signUp(username, email, password);
    } else {
      // Show an error message
      alert("Passwords do not match");
    }
  };

  // Return the JSX code for the sign-up form
  return (
    <Paper elevation={3} style={{ padding: 20 }}>
      <Typography variant="h4" align="center">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          fullWidth
          margin="normal"
          type="email"
        />
        <TextField
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          fullWidth
          margin="normal"
          type="password"
        />
        <TextField
          label="Confirm Password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          fullWidth
          margin="normal"
          type="password"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>
    </Paper>
  );
}

// Define a custom component for the main app
function App() {
  // Use state hooks to store the user data and the error message
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Define a function to call the login API
  const login = (username, password) => {
    // Use fetch to send a POST request to the login endpoint
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Check if the login was successful
        if (data.success) {
          // Set the user data to the state
          setUser(data.user);
          // Clear the error message
          setError(null);
        } else {
          // Set the error message to the state
          setError(data.message);
        }
      })
      .catch((error) => {
        // Set the error message to the state
        setError(error.message);
      });
  };

  // Define a function to call the sign-up API
  const signUp = (username, email, password) => {
    // Use fetch to send a POST request to the sign-up endpoint
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Check if the sign-up was successful
        if (data.success) {
          // Set the user data to the state
          setUser(data.user);
          // Clear the error message
          setError(null);
        } else {
          // Set the error message to the state
          setError(data.message);
        }
      })
      .catch((error) => {
        // Set the error message to the state
        setError(error.message);
      });
  };

  // Define a function to render the login and sign-up forms
  const renderForms = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <LoginForm login={login} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SignUpForm signUp={signUp} />
        </Grid>
      </Grid>
    );
  };

  // Define a function to render the user profile
  const renderProfile = () => {
    return (
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h4" align="center">
          Welcome, {user.username}
        </Typography>
        <Typography variant="h6" align="center">
          Your email is {user.email}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => setUser(null)}
        >
          Log Out
        </Button>
      </Paper>
    );
  };

  // Define a function to render the error message
  const renderError = () => {
    return (
      <Paper elevation={3} style={{ padding: 20, backgroundColor: "#fdd" }}>
        <Typography variant="h6" align="center" color="error">
          {error}
        </Typography>
      </Paper>
    );
  };

  // Return the JSX code for the main app
  return (
    <Container maxWidth="md" style={{ marginTop: 20 }}>
      {user ? renderProfile() : renderForms()}
      {error && renderError()}
    </Container>
  );
}

// Export the app component
export default App;