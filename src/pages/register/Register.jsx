import axios from "axios";
import React, { useState } from "react";
import { object, string } from "yup";
import { Bounce, Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  let [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });
  const [error, setError] = useState([]);
  const [loader, setLoader] = useState(false);

  const validateData = async () => {
    let RegisterSchema = object({
      userName: string().min(5).max(20).required(),
      email: string().email().required(),
      password: string().min(8).max(20),
      image: string().required(),
    });
    try {
      await RegisterSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      console.log("error validate", error.errors);
      setError(error.errors);
      for (let i = 0; i < error.errors.length; i++) {
        toast.error(error.errors[i], {
          position: "bottom-right",
          autoClose: 30000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }

      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validate = await validateData();
    console.log(validate);

    if (validate) {
      try {
        const formData = new FormData();
        formData.append("userName", user.userName);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("image", user.image);
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/signup`,
          formData
        );
        console.log(data);
        setUser({ userName: "", email: "", password: "", image: "" });
        setLoader(true);

        if (data.message == "success") {
          toast.success("account created succesfully !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          });
          navigate("/login");
        }
      } catch (error) {
        console.log(error.response);
        toast.error(error.response.data.message, {
          position: "bottom-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "dark",
          transition: Slide,
        });
      } finally {
        setLoader(false);
      }
    } else {
      console.log("error requesr", error);
      setLoader(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };

  return (
    <>
      {/*<div className="container p-5 fs-4">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group p-3">
            <label htmlFor="exampleInputUserName">User Name</label>
            <input
              type="text"
              placeholder="Enter userName"
              value={user.userName}
              className="form-control"
              id="exampleInputUserName"
              name="userName"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group p-3">
            <label htmlFor="exampleInputEmail1">Email </label>
            <input
              type="email"
              value={user.email}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group p-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              value={user.password}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              autoComplete="on"
            />
          </div>
          <div className="mb-3 p-3">
            <label htmlFor="formFile" className="form-label">
              Image
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          

          <button
            type="submit"
            className="btn btn-danger m-3 p-3"
            disabled={loader ? "disabled" : null}
          >
            {!loader ? "Register" : "wait..."}
          </button>
        </form>
      </div>
    */}

      <div className='container pt-5 w-75'>
    <div className="card text-center m-auto w-50" style={{width: 300}}>
  <div className="card-header h5 text-white bg-main">Register</div>
  <div className="card-body px-5">
    <p className="card-text py-2">
      Enter your information to create account in our page.
    </p>
    <form onSubmit={handleSubmit}>
    <div className="form-outline">
    <input type="text" name='userName' value={user.userName} onChange={handleInputChange} className="form-control my-3" placeholder='Enter your Name'/>
      <input type="email" name='email' value={user.email} onChange={handleInputChange} className="form-control my-3" placeholder='Enter email'/>
      <input type="password" name="password" value={user.password} onChange={handleInputChange} autoComplete="on" className="form-control my-3" placeholder='Enter password'/>
      <input type="file" name="image"  onChange={handleImageChange} autoComplete="on" className="form-control my-3" placeholder='Enter image'/>
      
    </div>
    <button type='submit' className="btn bg-main w-100 border-danger" disabled={loader?'disabled':null}>{!loader?'Register' :'wait...'}</button>

    </form>
  
    
  </div>
</div>

    </div>
    </>
  );
}

export default Register;
