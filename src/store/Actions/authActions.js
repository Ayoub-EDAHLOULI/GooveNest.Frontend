import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
} from "../Slices/authSlice";
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
      const errorData = await response.json();
      dispatch(
        loginFailure({
          error: errorData.message || "Login failed. Please try again.",
        })
      );
      throw new Error(errorData.message || "An error occurred during login");
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

export const register = (userData) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const response = await fetch(`${API_BASE_URL}authentication/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        registerFailure({
          error: "Registration failed. Please try again.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred during registration"
      );
    }

    const newUser = await response.json();
    dispatch(
      registerSuccess({
        user: newUser.data,
      })
    );
  } catch (error) {
    dispatch(
      registerFailure({
        error: error.message || "An error occurred during registration",
      })
    );
    throw new Error(error.message || "An error occurred during registration");
  }
};
