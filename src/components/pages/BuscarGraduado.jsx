import React, { useState, useEffect } from 'react';
import Logo from "../../../public/logouleam.png";
import { NavLink,useNavigate  } from "react-router-dom";
import toast from "react-hot-toast";

const BuscarGraduado = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [formData, setFormData] = useState({ cedula: "" });

  const [graduadoEncontrado, setGraduadoEncontrado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const signedIn = localStorage.getItem("isSignedIn") === "true";
    setIsSignedIn(signedIn);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("isSignedIn"); // Eliminar el indicador de inicio de sesión
    setIsSignedIn(false);
    toast.success("Sesión cerrada con éxito");
    navigate('/login'); // Redirige al usuario a la página de inicio tras cerrar sesión
  }


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const graduados = JSON.parse(localStorage.getItem("graduados")) || {};
    const graduado = graduados[formData.cedula];
    if (graduado) {
      setGraduadoEncontrado(graduado);
      toast.success("Graduado encontrado");
    } else {
      toast.error("Graduado no encontrado");
      setGraduadoEncontrado(null);
    }
  };
  return (
    <div className="main">
      <header>
        <div>
          <img src={Logo} alt="" id="logo" />
        </div>
        <ul>
          <li><NavLink className={"text-black"} to={"/"}>Inicio</NavLink></li>
          <li><NavLink className={"text-black"} to={"/registrar"}>Registrar Graduado</NavLink></li>
          {isSignedIn ? (
            <li onClick={handleSignOut}>Desconectar</li>
          ) : (
          <>
            <li><NavLink className={"text-black"} to={"/register"}>Registrarse</NavLink></li>
            <li><NavLink className={"text-black"} to={"/login"}>Login</NavLink></li>
          </>
          )}
        </ul>
      </header>
      <div className="content">
        <h1>Buscar Graduado</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Cedula</label>
            <input type="text" id="cedula" name="cedula" value={formData.cedula} onChange={handleChange} />
          </div>
          <div>
            <button type="submit">Buscar</button>
          </div>
        </form>
        {graduadoEncontrado && (
          <div>
            <h2>Detalles del Graduado</h2>
            <p>Nombre: {graduadoEncontrado.name}</p>
            <p>Apellido: {graduadoEncontrado.lastname}</p>
            <p>Email: {graduadoEncontrado.email}</p>
            {/* Otros datos del graduado */}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuscarGraduado;
