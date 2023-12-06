import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Importar useNavigate
import Logo from "../../../public/logouleam.png";
import "./regiser.css";
import Swal from 'sweetalert2'; // Importar SweetAlert2


const Register = () => {
  const navigate = useNavigate(); // Instancia para manejar la navegación

  const validarCampoPersonalizado = (campo) => /^[A-Za-z\s]+$/.test(campo); // Solo letras y espacios
  const validarCorreoElectronicoPersonalizado = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email); // Formato de email válido
  const verificarContraseñaPersonalizada = (password) => password.length >= 10; // Contraseña con al menos 10 caracteres
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    cedula: "",
    profesion: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    cedula: "",
    profesion: "",
    email: "",
    password: "",
  });


  const validarFormulario = () => {
    let esValido = true;
    const newErrors = {};
  
    // Valida el nombre
    if (!validarCampoPersonalizado(formData.name)) {
      esValido = false;
      newErrors.name = "Solo se permiten letras en el nombre.";
    }
  
    // Valida los apellidos
    if (!validarCampoPersonalizado(formData.lastname)) {
      esValido = false;
      newErrors.lastname = "Solo se permiten letras en los apellidos.";
    }
  
    // Valida la cédula
    const errorCedula = validarCedulaPersonalizada(formData.cedula);
    if (errorCedula) {
      esValido = false;
      newErrors.cedula = errorCedula;
    }
  
    // Valida la profesión
    if (!validarCampoPersonalizado(formData.profesion)) {
      esValido = false;
      newErrors.profesion = "Por favor, completa este campo con tu profesión.";
    }
  
    // Valida el email
    if (!validarCorreoElectronicoPersonalizado(formData.email)) {
      esValido = false;
      newErrors.email = "La dirección de correo electrónico no es válida.";
    }
  
    // Valida la contraseña
    if (!verificarContraseñaPersonalizada(formData.password)) {
      esValido = false;
      newErrors.password = "La contraseña debe tener al menos 10 caracteres.";
    }
  
    setErrors(newErrors);
    return esValido;
  };
  

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validarFormulario();
    if (isValid) {
      localStorage.setItem("userdata", JSON.stringify(formData));
      
      // Mostrar alerta con SweetAlert2
      Swal.fire({
        toast: true,
        position: 'top-start', // Posición superior izquierda
        showConfirmButton: false,
        timer: 3000, // Tiempo en milisegundos que se muestra el toast
        icon: 'success',
        title: 'Registro exitoso'
      }).then(() => {
        navigate('/login'); // Redirigir a /login tras cerrar la alerta
      });
    }
  };

 


  return (
    <div className="main">
      <header>
        <div>
          <img src={Logo} alt="" id="logo" />
        </div>
        <ul>
          <li>
            <NavLink className={"text-black"} to={"/"}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink className={"text-black"} to={"/buscargraduado"}>
              Buscar Graduado
            </NavLink>
          </li>
          <li>
            <NavLink className={"text-black"} to={"/registrar"}>
              Registrar Graduado
            </NavLink>
          </li>
          <li>
            <NavLink className={"text-black"} to={"/login"}>
              Inicar sesion
            </NavLink>
          </li>
        </ul>
      </header>
      <div className="content">
        <h1>Registro</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nombres</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="lastname">Apellidos</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            {errors.lastname && <p className="error-message">{errors.lastname}</p>}
          </div>
          <div>
            <label htmlFor="cedula">Cedula</label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              required
            />
            {errors.cedula && <p className="error-message">{errors.cedula}</p>}
          </div>
          <div>
            <label htmlFor="profesion">Profesion</label>
            <input
              type="text"
              id="profesion"
              name="profesion"
              value={formData.profesion}
              onChange={handleChange}
              required
            />
            {errors.profesion && <p className="error-message">{errors.profesion}</p>}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div>
            <button type="submit">Registrarse</button>
          </div>
          Ya tienes una cuenta? <NavLink to={"/login"}>Inicia sesion!</NavLink>
        </form>
      </div>
    </div>
  );
};

export default Register;
