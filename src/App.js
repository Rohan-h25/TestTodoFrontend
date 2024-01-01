import Layout from "./components/Layout";
import Todo from "./components/todo/Todo";
import Home from "./components/home/Home";
import LoginPage from "./components/login/LoginPage";
import { LoginFailedPage } from "./components/login/LoginFailedPage";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      // fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login/success`, {
      // // fetch("http://localhost:4000/auth/login/success", {
      //   method: "GET",
      //   credentials: "include",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Credentials": true,
      //   },
      // })
      //   .then((response) => {
      //     if (response.status === 200) return response.json();
      //     throw new Error("authentication has been failed!");
      //   })
      //   .then((resObject) => {
      //     // console.log("resObject: ", resObject);
      //     // console.log("user data received from backend: ", resObject.user);
      //     setUser(resObject.user);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      const islogin = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/auth/login/success`, {
          withCredentials: true,
        })
        .catch((err) => {
          console.log(err);
        });

      if (islogin.status === 200) {
        //auth successful now setUser
        // console.log("get login user", islogin.data.user);
        setUser(islogin.data.user);
      }
    }
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/login"
            element={user ? <Navigate to={"/todo"} /> : <LoginPage />}
          />
          <Route path="/todo" element={user ? <Todo /> : <LoginPage />} />
          <Route
            path="/loginfailed"
            element={user ? <Navigate to={"/todo"} /> : <LoginFailedPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
