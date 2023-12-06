import React, { useState, useEffect } from 'react';
import Logo from '../../../public/logouleam.png'
import { NavLink,useNavigate  } from "react-router-dom";
import { toast } from 'react-hot-toast'

const RegistrarGraduado = () => {
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


  const validarCampoTexto = (campo) => /^[A-Za-z\s]+$/.test(campo); // Solo letras y espacios
  const validarEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email); // Formato de email válido
  const validarTelefono = (telefono) => /^\d{10}$/.test(telefono); // Teléfono de 10 dígitos
  const validarCedulaPersonalizada = (cedula) => {
    if (cedula.length !== 10) {
      return "La cédula debe tener 10 dígitos.";
    }
  
    if (!/^[0-9]+$/.test(cedula)) {
      return "La cédula debe contener solo números.";
    }
  
    const provincia = Number(cedula.substring(0, 2));
    if (provincia < 1 || provincia > 24) {
      return "El primer número de la cédula debe estar entre 1 y 24.";
    }
  
    const coeficientesCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const digitoVerificadorCedula = Number(cedula[9]);
  
    let sumaCedula = 0;
    for (let i = 0; i < 9; i++) {
      let valorCedula = Number(cedula[i]) * coeficientesCedula[i];
      if (valorCedula > 9) {
        valorCedula -= 9;
      }
      sumaCedula += valorCedula;
    }
  
    const totalCedula = (Math.ceil(sumaCedula / 10) * 10);
    const digitoVerificadorCalculadoCedula = totalCedula - sumaCedula;
  
    if (digitoVerificadorCalculadoCedula !== (digitoVerificadorCedula === 10 ? 0 : digitoVerificadorCedula)) {
      return "La cédula es inválida.";
    }
  
    return ""; // Retornar un string vacío si la cédula es válida
  };




  const [formData, setFormData] = useState({
    cedula: "",
    name: "",
    lastname: "",
    direccion: "",
    telefono: "",
    email: "",
  });
 const handleSubmit = (e) => {
  e.preventDefault();

  if (!validarCampoTexto(formData.name) || !validarCampoTexto(formData.lastname)) {
    toast.error("Nombre y apellidos solo deben contener letras.");
    return;
  }
  
  const errorCedula = validarCedulaPersonalizada(formData.cedula);
  if (errorCedula) {
    toast.error(errorCedula);
    return;
  }

  if (!validarEmail(formData.email)) {
    toast.error("Correo electrónico inválido.");
    return;
  }
  if (!validarTelefono(formData.telefono)) {
    toast.error("Teléfono inválido.");
    return;
  }

  const graduados = JSON.parse(localStorage.getItem("graduados")) || {};
  if (graduados.hasOwnProperty(formData.cedula)) {
    toast.error("La cédula ya está registrada.");
    return;
  }

  // Almacenar el graduado
  graduados[formData.cedula] = formData;
  localStorage.setItem("graduados", JSON.stringify(graduados));
  toast.success("Graduado registrado exitosamente");
};

  const handleChange = (e) => {
    setFormData({
    ...formData,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <div>
      <header>
        <div>
          <img src={Logo} alt="" id="logo" />
        </div>
        <ul>
          <li><NavLink className={"text-black"} to={"/"}>Inicio</NavLink></li>
          <li><NavLink className={"text-black"} to={"/buscargraduado"}>Buscar Graduado</NavLink></li>          {isSignedIn ? (
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
        <h1>Registrar Graduado</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Cedula</label>
            <input type="text" id="cedula" name="cedula" value={formData.cedula} onChange={handleChange} required/>
          </div>
          <div>
            <label htmlFor="">Nombre</label>
            <input type="text" id="nombre" name="name"  value={formData.name} onChange={handleChange} required/>
          </div>
          <div>
            <label htmlFor="">Apellidos</label>
            <input type="text" id="apellidos" name="lastname" value={formData.lastname} onChange={handleChange} required/>
          </div>
          <div>
            <label htmlFor="">Direccion</label>
            <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} required/>
          </div>
          <div>
            <label htmlFor="">Telefono</label>
            <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required/>
          </div>
          <div>
            <label htmlFor="">Correo</label>
            <input type="text" id="correo" name="email" value={formData.email} onChange={handleChange} required/>
          </div>
          <div>
            <label htmlFor="">Fecha de graduo</label>
            <input type="date" id="date" name="date" />
          </div>
          <div>
            <button type="submit">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrarGraduado