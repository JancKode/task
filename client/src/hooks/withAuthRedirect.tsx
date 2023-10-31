// withAuthRedirect.tsx
import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const withAuthRedirect = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated) {
      navigate("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};
