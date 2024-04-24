import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { UserResponse } from "../typings";

export type StateContext = {
  userData: UserResponse;
  setUser: Dispatch<SetStateAction<UserResponse>>;
};

const defaultState = {
  userData: {
    user: {
      id: "",
      email: "",
      name: "",
    },
    token: "",
    isLoggedIn: false,
  },
  setUser: () => {},
} as StateContext;

export const UserContext = createContext(defaultState);

type ContextProviderProps = {
  children: ReactNode;
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const storedUserData = localStorage.getItem("userData");
  const initialUserData = storedUserData ? JSON.parse(storedUserData) : null;
  const [userData, setUser] = useState<UserResponse>(
    initialUserData || {
      user: {
        id: "",
        email: "",
      },
      token: "",
      isLoggedIn: false,
    }
  );
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  useEffect(() => {
    // Save userData to localStorage whenever it changes
    localStorage.setItem("userData", JSON.stringify(userData));

    // Set a timeout to clear localStorage after 30 minutes
    const newTimeoutId = setTimeout(clearLocalStorage, 30 * 60 * 1000);
    setTimeoutId(newTimeoutId);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(newTimeoutId);
  }, [userData]);

  const clearLocalStorage = () => {
    localStorage.removeItem("userData");
    localStorage.setItem("userData", JSON.stringify(userData));
    setTimeoutId(null);
  };

  const resetTimeout = () => {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // Set a new timeout for 30 minutes
    const newTimeoutId = setTimeout(clearLocalStorage, 30 * 60 * 1000);
    setTimeoutId(newTimeoutId);
  };

  // Listen for click and keydown events to reset the timeout
  useEffect(() => {
    document.addEventListener("click", resetTimeout);
    document.addEventListener("keydown", resetTimeout);

    // Clean up event listeners when the component unmounts
    return () => {
      document.removeEventListener("click", resetTimeout);
      document.removeEventListener("keydown", resetTimeout);
    };
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useStateContext = () => useContext(UserContext);
