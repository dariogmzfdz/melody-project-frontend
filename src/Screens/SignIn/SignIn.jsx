import React from 'react';
import './SignIn.css'

const SignIn = () => {
  return (
    <div>
    <h1>        MELODY    </h1>
    <form>
        <h3>Registro</h3>
        <label>Correo electronico</label>
        <input className="signinInput" type="email"></input>
        <label>Confimar correo electronico</label>
        <input className="signinInput" type="email"></input>
        <label>Contraseña</label>
        <input className="signinInput" type="password"></input>
        <label>Confirma contraseña</label>
        <input className="signinInput" type="password"></input>
        <label>Nombre de usuario</label>
        <input className="signinInput"></input>
    <label>Fecha de nacimiento</label>
        <div className='birthDate'>
        <label></label>
        <input className="signinInput signinDay" type="option">

        </input>
        <label></label>
        <select className="signinInput">
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>

        </select>
        <label></label>
        <input className="signinInput"></input>
        </div>
        <button className='registerButton' type='submit'>Registrarse</button>
    </form>
    </div>
  )
}

export default SignIn