import React from "react";
import { useParams } from "react-router-dom";

const Categories = () => {
  const { category } = useParams();

  console.log("Category", category);

  // fetch("/api/get-tools")

  return <div>Categories</div>;
};

export default Categories;
