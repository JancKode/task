import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { Route, Routes } from "react-router-dom";

import AuthenticatedRoute from "./authenticatedRoute";
import { ROUTES } from "./routes";
import { AuthProvider } from "../context/authContext";
import { Toaster } from 'react-hot-toast';

const Login = React.lazy(() => import("../components/login/login"));

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
      <Toaster />
        <Routes>
          <Route path="*" element={<AuthenticatedRoute />} />
          <Route path={ROUTES.login} element={<Login />} />
        </Routes>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
