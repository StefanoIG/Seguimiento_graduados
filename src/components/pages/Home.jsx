import React, { useState, useEffect } from 'react';
import Logo from "../../../public/logouleam.png";
import { NavLink,useNavigate  } from "react-router-dom";
import toast from "react-hot-toast";
import './home.css';

const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
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

  return (
    <div className='main'>
      <header>
        <div>
          <img src={Logo} alt="" id="logo" />
        </div>
        <ul>
      <li><NavLink className={"text-black"} to={"/"}>Inicio</NavLink></li>
      <li><NavLink className={"text-black"} to={"/buscargraduado"}>Buscar Graduado</NavLink></li>
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
      <main>
        <h1 className='text-white'>Bienvenidos al sistema de seguimiento de Graduados
        </h1>
        <p className='text-white'>Mantente conectado con los graduados de la ULEAM</p>
      </main>
      <footer>
        <h3>Universidad Laica Eloy alfaro de Manabi</h3>
      </footer>
    </div>
  )
}

export default Home