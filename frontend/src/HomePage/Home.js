// HomePage.jsx
import React from "react";
import Layout from "./Layout";
import Content1 from "./Content1";
import Content2 from "./Content2";
import Content3 from "./Content3";
import Content4 from "./Content4";
import Content5 from "./Content5";
import Content6 from "./Content6";

const HomePage = () => {
  return (
    <Layout>     

      <Content1 />
      <div className="mt-10">
        <Content2 />
      </div>
      <div className="mb-10 mt-10">
        <Content3 />
      </div>
      <div className="mb-10 mt-10">
        <Content5 />
      </div>
      <Content4 />
      <Content6 />
    </Layout>
  );
};

export default HomePage;
