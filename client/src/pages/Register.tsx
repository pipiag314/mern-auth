import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


type DataType = {
  name: string;
  email: string;
  password: string;
}


export const Register = () => {

  const navigate = useNavigate();

  const [data, setData] = useState<DataType>({
    name: "",
    email: "",
    password: "",
  });
    
  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {name, email, password} = data;
    try {
      const { data } = await axios.post("/register", {
        name, email, password
      })
      if(data.error) {
        toast.error(data.error)
      } else {
        setData({name: "", email: "", password: ""})
        toast.success("Registered succesfully");
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input type='text' placeholder='Enter your name' value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
        <label>Email</label>
        <input type='email' placeholder='Enter your Email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
        <label>Password</label>
        <input type='password' placeholder='Enter password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
