import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import Titlebar from "./layouts/Titlebar";

import { ToastContainer } from "react-toastify";

import {
  Hero,
  Login,
  Manual,
  Playground,
  Signup,
  About,
  Testimonials,
} from "./pages/index";

const App = () => {
  const withTitlebar = (Component) => (
    <>
      <Titlebar />
      <Component />
    </>
  );

  return (
    <>
      <ToastContainer />
      <Router>
        <Layout>
          <Routes>
            <Route path="/signup" element={withTitlebar(Signup)} />
            <Route path="/login" element={withTitlebar(Login)} />
            <Route path="/" element={withTitlebar(Hero)} />
            <Route path="/playground" element={withTitlebar(Playground)} />
            <Route path="/manual" element={withTitlebar(Manual)} />
            <Route path="/about" element={withTitlebar(About)} />
            <Route path="/testimonials" element={withTitlebar(Testimonials)} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
