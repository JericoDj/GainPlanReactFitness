const API_URL = "https://fitness-app-api-j7a0.onrender.com/users";

class UserController {
  // Login user
  static async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      return await response.json();
    } catch (error) {
      throw error.message ? error : { message: "Login failed" };
    }
  }

  // Register user
  static async register(userData) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Ensure message is structured
        const errorMessage = responseData.message || "Registration failed";
        throw new Error(errorMessage);
      }

      return responseData;
    } catch (error) {
      // If backend throws a message
      throw new Error(error.message || "Registration failed");
    }
  }

  // Forgot password
  static async forgotPassword(email) {
    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      return await response.json();
    } catch (error) {
      throw error.message ? error : { message: "Request failed" };
    }
  }
}

export default UserController;
