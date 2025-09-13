"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "UPDATE_PROFILE"; payload: Partial<User> }

const AuthContext = createContext<{
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
} | null>(null)

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true }

    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      }

    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
      }

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
      }

    case "UPDATE_PROFILE":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      }

    default:
      return state
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: false,
    isAuthenticated: false,
  })

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        dispatch({ type: "LOGIN_SUCCESS", payload: user })
      } catch (error) {
        localStorage.removeItem("user")
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in real app, this would be an API call
    if (email && password.length >= 6) {
      const user: User = {
        id: "1",
        name: email.split("@")[0],
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }

      localStorage.setItem("user", JSON.stringify(user))
      dispatch({ type: "LOGIN_SUCCESS", payload: user })
      return true
    } else {
      dispatch({ type: "LOGIN_FAILURE" })
      return false
    }
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock signup - in real app, this would be an API call
    if (name && email && password.length >= 6) {
      const user: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }

      localStorage.setItem("user", JSON.stringify(user))
      dispatch({ type: "LOGIN_SUCCESS", payload: user })
      return true
    } else {
      dispatch({ type: "LOGIN_FAILURE" })
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    dispatch({ type: "LOGOUT" })
  }

  return <AuthContext.Provider value={{ state, dispatch, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
