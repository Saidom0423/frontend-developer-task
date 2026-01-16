import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto mt-32 space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input className="border p-2 w-full" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input className="border p-2 w-full" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 w-full">Login</button>
    </form>
  );
}
