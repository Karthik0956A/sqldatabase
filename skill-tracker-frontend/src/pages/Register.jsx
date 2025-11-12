import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [err,setErr]=useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await register(name, email, password);
      nav("/");
    } catch (e) { setErr(e?.response?.data?.message || "Register failed"); }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="w-full max-w-md card">
        <h1 className="text-2xl font-semibold mb-4">Create your account</h1>
        {err && <div className="mb-3 text-red-600">{err}</div>}
        <form onSubmit={onSubmit} className="grid gap-3">
          <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn bg-indigo-600 text-white border-indigo-600">Register</button>
        </form>
        <p className="mt-3 text-sm text-gray-600">
          Already have an account? <Link className="text-indigo-600" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
