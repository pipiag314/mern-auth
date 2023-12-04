import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


type DataType = {
  email: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<DataType>({
    email: "",
    password: "",
  });

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = data;
    try {
      const {data} = await axios.post("/login", {
        email, password
      })
      if(data.error) {
        toast.error(data.error)
      } else {
        // toast.success(data)
        setData({
          email: "",
          password: "",
        })
        navigate("/dashboard")
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input type="email" placeholder="Enter your Email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
        <label>Password</label>
        <input type="password" placeholder="Enter password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};
