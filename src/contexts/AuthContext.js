import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const VERIFY_SUCCESS = "AUTH.VERIFY_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case UPDATE_PROFILE:
      const { firstName, lastName, profilePictureUrl, favoriteProjects } =
        action.payload;

      return {
        ...state,
        user: {
          ...state.user,
          firstName,
          lastName,
          profilePictureUrl,
          favoriteProjects,
        },
      };
    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialState });

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updatedProfile = useSelector((state) => state.user.updatedProfile);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await apiService.get("users/me");
          const user = response.data;

          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user },
          });
        } else {
          setSession(null);

          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (error) {
        setSession(null);

        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated: false, user: null },
        });
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    if (updatedProfile)
      dispatch({ type: UPDATE_PROFILE, payload: updatedProfile });
  }, [updatedProfile]);

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/auth/login", { email, password });
    const { user, accessToken } = response.data;

    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });

    callback();
  };

  const loginWithGoogle = async (
    {
      email,
      firstName,
      lastName,
      profilePictureUrl,
      isGoogleVerified,
      googleId,
    },
    callback
  ) => {
    const response = await apiService.post("/auth/login/google", {
      email,
      firstName,
      lastName,
      profilePictureUrl,
      isGoogleVerified,
      googleId,
    });

    const { user, accessToken } = response.data;

    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });

    callback();
  };

  const register = async (
    { firstName, lastName, email, password },
    callback
  ) => {
    const response = await apiService.post("/users", {
      firstName,
      lastName,
      email,
      password,
    });

    const user = response.data;

    setSession(null);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user },
    });
    toast.success("Register success! Please verify your account through email");

    callback();
  };

  const verify = async ({ verificationCode }, callback) => {
    const response = await apiService.put(`/verifications/${verificationCode}`);
    const { user, accessToken } = response.data;

    setSession(accessToken);
    dispatch({ type: VERIFY_SUCCESS, payload: { user } });
    callback();
  };

  const updateUserPassword = async (
    { userId, currentPassword, newPassword },
    callback
  ) => {
    const response = await apiService.put(`/users/${userId}/password`, {
      currentPassword,
      newPassword,
    });

    callback();
    setSession(null);
  };

  const logout = (callback) => {
    setSession(null);
    dispatch({
      type: LOGOUT,
    });
    callback();
  };

  const requestPasswordReset = async ({ email }, callback) => {
    await apiService.post("/verifications/requestPasswordReset", { email });
    callback();
    setSession(null);
  };

  const resetUserPassword = async (
    { verificationCode, resetPasswordToken, newPassword },
    callback
  ) => {
    await apiService.post(`users/resetPassword`, {
      verificationCode,
      resetPasswordToken,
      newPassword,
    });

    callback();
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        loginWithGoogle,
        register,
        verify,
        updateUserPassword,
        logout,
        requestPasswordReset,
        resetUserPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
