import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

//components

import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";
import ListProducts from "./todolist/ListProducts";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [productsChange, setProductsChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      //console.log(parseData);
      //setAllTodos(parseData);

      setName(parseData[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

   const getTodos = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      //to catch error      
      //console.log(res);
      const parseData = await res.json();
      setAllProducts(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    getTodos();
    setProductsChange(false);
  }, [productsChange]);

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h2>Hello {name}</h2>
        <button onClick={e => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div>

      <InputTodo setProductsChange={setProductsChange} />
      {/* <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} /> */}
      <ListProducts allProducts={allProducts} setProductsChange={setProductsChange}/>
    </div>
  );
};

export default Dashboard;
