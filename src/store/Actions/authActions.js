import { loginStart, loginSuccess, loginFailure } from "../Slices/authSlice";
import { API_BASE_URL } from "../../config";

export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await fetch(`${API_BASE_URL}authentication/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    const userData = data.data;
    const token = data.data.token;
    dispatch(loginSuccess({ user: userData, token: token }));
  } catch (error) {
    dispatch(
      loginFailure({ error: error.message || "An error occurred during login" })
    );
    throw new Error(error.message || "An error occurred during login");
  }
};
