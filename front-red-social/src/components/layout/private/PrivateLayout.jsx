import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    <h1>Cargando...</h1>;
  } else {
    return (
      <>
        {/*Layout*/}
        <Header />

        {/*Contenido principal*/}
        <section className="layout_content">
          {/* Si el usuario está autenticado (auth._id), se muestra el contenido de las 
          rutas privadas (como la sección social). Si el usuario no está autenticado 
          (!auth._id), se redirige al usuario a la ruta de inicio de sesión (/login). */}
          {auth._id ? <Outlet /> : <Navigate to="/login" />}
          {/* el contenido que se renderiza dentro del Outlet depende de la URL actual
           del navegador */}
        </section>

        {/*Barra lateral*/}
        <Sidebar />
      </>
    );
  }
};
