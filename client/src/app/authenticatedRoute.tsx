import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import { ROUTES } from "./routes";
import { useAuth } from "../context/authContext";

const DashboardPage = React.lazy(() => import("../components/task/task"));

const routes = {
  [ROUTES.base]: {
    path: ROUTES.task,
    element: DashboardPage,
  },
  [ROUTES.task]: {
    element: DashboardPage,
  },
};

const AuthenticatedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    localStorage.clear();

    return <Navigate replace to={ROUTES.login} state={{ from: location }} />;
  }

  return (
    <Routes>
      {Object.keys(routes).map((key) => {
        const route = routes[key];
        return (
          <Route
            key={key}
            path={key}
            element={
              <ProtectedRoute
                path={route.path ?? key}
                element={route.element}
              />
            }
          />
        );
      })}
    </Routes>
  );
};

export default React.memo(AuthenticatedRoute);
