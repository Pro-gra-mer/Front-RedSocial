import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

export const Login = () => {
  const { form, changed } = useForm({});
  const [saved, setLoged] = useState("not-sended");
  const { setAuth } = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();

    // Recogemr datops formulario
    let userToLogin = form;

    // Petición de datos al backend mediante el endpoint establecido.
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      // Persistir los datos del navegador durante toda la sesión
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setLoged("loged");

      // Establecer datos del auth
      setAuth(data.user);

      // Redirección a la url privada
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      setLoged("error");
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Login</h1>
      </header>

      <div className="content__posts">
        {saved == "loged" ? (
          <strong className="alert alert-success">
            "Usuario identificado correctamente"
          </strong>
        ) : (
          ""
        )}

        {saved == "error" ? (
          <strong className="alert alert-danger">
            "No se ha identificado"
          </strong>
        ) : (
          ""
        )}
        <form className="form-login" onSubmit={loginUser}>
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

          <input
            type="submit"
            value={"Identifícate"}
            className="btn btn-success"
          />
        </form>
      </div>
    </>
  );
};
