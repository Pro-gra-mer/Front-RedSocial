import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";

export const Register = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not-sended");

  const saveUser = async (e) => {
    // Prevenir actualización de pantalla
    e.preventDefault();

    // Recoger datos del formulario
    let newUser = form;

    // Guardar usuario en el backend mediante el endpoint establecido
    const request = await fetch(Global.url + "user/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      setSaved("saved");
    } else {
      setSaved("error");
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Registro</h1>
      </header>

      <div className="content__posts">
        {saved == "saved" ? (
          <strong className="alert alert-success">
            "Usuario registrado correctamente"
          </strong>
        ) : (
          ""
        )}

        {saved == "error" ? (
          <strong className="alert alert-danger">
            "Usuario no se ha registrado"
          </strong>
        ) : (
          ""
        )}

        <form className="register-form" onSubmit={saveUser}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="given-name"
              onChange={changed}
            />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Apellidos</label>
            <input
              type="text"
              id="surname"
              name="surname"
              autoComplete="family-name"
              onChange={changed}
            />
          </div>

          <div className="form-group">
            <label htmlFor="nick">Nick</label>
            <input
              type="text"
              id="nick"
              name="nick"
              autoComplete="nickname"
              onChange={changed}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              onChange={changed}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={changed}
            />
          </div>

          <input type="submit" value="Registrar" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};
