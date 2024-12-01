import "./App.css";

import Layout from "./layouts/Layout";

import Hero from "./layouts/Hero";
import Titlebar from "./layouts/Titlebar";

const App = () => {
  return (
    <>
      <Layout>
        <Titlebar />
        <Hero />
      </Layout>
    </>
  );
};

export default App;
