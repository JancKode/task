import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../app/routes";
import { useAuth } from "../../context/authContext";
import { LOGIN, REGISTER } from "../../graphql/queries/login";
import logo from '../../assets/whiteLogo2-min.webp'

export default function Login() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // New state for toggling between Login and Register

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      
      authLogin(data?.login?.userId, data?.login?.token);
      navigate(ROUTES.task);
    },
    onError: (err) => {
      setUsername("");
      setPassword("");
      toast.error("Error logging in");
      console.error(err);
    },
  });

  const [register, ] = useMutation(REGISTER, {
    onCompleted: (data) => {
      
      setIsRegistering(false);
      toast.success("Registration successful! You can now log in.");
    },
    onError: (err) => {
      setUsername("");
      setPassword("");
      toast.error("Error registering");
      console.error(err);
    },
});


  if (loading) return <div>Loading...</div>;

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isRegistering) {
      try {
        await register({ variables: { username, password } });
      } catch (err) {
        console.error("Error registering:", err);
        toast.error("Error registering");
      }
    } else {
        try {
            const response = await login({ variables: { username, password } });
      
            if (response.errors) {
              toast.error("Error logging in");
              return;
            }
          } catch (err) {
            console.error("Error logging in:", err);
            toast.error("Error logging in");
          }
    }
  };


  return (
    <>
      <div className="bg-carelulu flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src={logo}
            alt="Carelulu"
          />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {isRegistering ? "Register for an account" : "Sign in to your account"}
      </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="usename"
                    name="usename"
                    type="text"
                    required
                    className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="p-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
        {error && (
          <p className="text-sm text-red-600">{error.message}</p>
        )}
        <div className="text-sm leading-6">
          <label
            onClick={() => setIsRegistering(!isRegistering)}
            className="font-semibold text-indigo-600 hover:text-indigo-500 hover:cursor-pointer"
          >
            {isRegistering ? "Already have an account? Sign in" : "Register for an account here"}
          </label>
        </div>
      </div>

              <div>
                <button
                  className="flex w-full justify-center rounded-md bg-carelulu px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={(e: any) => handleSubmit(e)}
                >
                    {isRegistering ? "Register" : "Sign in"}
                </button>
              </div>
            </form>

            
          </div>
        </div>
      </div>
    </>
  );
}
