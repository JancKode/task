import React, { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Layout from "../components/layout/layout";
import { ROUTES } from "./routes";

interface IProps {
  path: string;
  element: any;
}

const ProtectedRoute: React.FC<IProps> = ({ path, element: Element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.base} />;
  }

  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>
        <Element />
      </Suspense>
    </Layout>
  );
};

export default ProtectedRoute;
