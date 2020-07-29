import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";


const InputTodo = ({ setTodosChange }) => {

  const [inputs, setInputs] = useState({
    description: "",
    imagen: ""

  });
  const {description, imagen } = inputs;
  const onChange = e => {
    setInputs ({ ...inputs, [e.target.name]: e.target.value });
  }



  const addTodo = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { description };
      const response = await fetch("http://localhost:5000/dashboard/todos", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();


      // if(!parseResponse == ""){
      //   setTodosChange(true);
      //   setDescription("");
      //   toast.success("Register Successfully");
      
      // } else {
      //   toast.error(parseResponse);
      //   setTodosChange(false);
       
      // }
       console.log(parseResponse);


      setTodosChange(true);
      setInputs ({ description: "" });
      //setDescription("");

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">Input</h1>
      <div className="btn-modal">
        <button
          type="button"
          className="btn btn-warning"
          data-toggle="modal"
          data-target={`#id1`}
        >
          Add
        </button>
      </div>


      <div
        class="modal"
        id={`id1`}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Add Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"

              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              Description
              <input
                type="text"
                className="form-control"
                name="description"
                value={description}
                onChange={ e => onChange(e)}
                autoFocus
              />
              
            </div>
            <div class="modal-body">
              Image
              <input
                  type="text"
                  className="form-control"
                  name="imagen"
                  value={imagen}
                  onChange={ e => onChange(e)}
                />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={e => addTodo(e)}
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InputTodo;
