import React from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { JWT_STORAGE_KEY } from "./auth";

export default function UseLogOut() {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const LogOut = () => {
    dispatch({ type: "userOffline" });
    localStorage.removeItem(JWT_STORAGE_KEY);
    navigate("/");
  };
  return LogOut;
}
