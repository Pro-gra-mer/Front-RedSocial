import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Header } from "./Header";

export const PublicLayout = () => {
  const { auth } = useAuth();

  return (
    <>
      {/*Layout*/}
      <Header />

      {/*Contenido principal*/}
      <section className="layout_content">
        {/* Si el usuario no está autenticado (!auth._id), se muestra el contenido 
        público definido por las rutas de login y registro. Si el usuario está 
        autenticado (auth._id), se redirige a la ruta /social. */}
        {!auth || !auth._id ? <Outlet /> : <Navigate to="/social" />}
        {/* el contenido que se renderiza dentro del Outlet depende de la URL actual
         del navegador */}
      </section>
    </>
  );
};
