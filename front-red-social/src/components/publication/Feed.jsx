import React from "react";
import avatar from "../../assets/img/user.png";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { PublicationList } from "../publication/PublicationList";

export const Feed = () => {
  const { auth } = useAuth();
  const [publications, setPublications] = useState([]); // [2
  const [page, setPage] = useState(1); // [3
  const [more, setMore] = useState(true); // [4
  const params = useParams();

  useEffect(() => {
    setMore(true);
    getPublications(1, false);
  }, [params.userId]); // Agrega params.userId a las dependencias

  const getPublications = async (nextPageNumber = 1, showNews = false) => {
    if (showNews) {
      setPublications([]);
      setPage(1);
      nextPageNumber = 1;
    }
    const request = await fetch(
      Global.url + "publication/feed/" + nextPageNumber,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = await request.json();

    if (data.status === "success") {
      let newPublications = data.publications;

      if (!showNews && publications.length >= 1) {
        newPublications = [...publications, ...data.publications];
      }

      setPublications(newPublications);
      // Actualizar la página
      setPage(nextPageNumber);

      if (
        !showNews &&
        publications.length >= data.total - data.publications.length
      ) {
        setMore(false);
      }
      if (data.pages <= 1) {
        setMore(false);
      }
    }
  };
  return (
    <section className="layout__content">
      <header className="content__header">
        <h1 className="content__title">Timeline</h1>
        <button
          className="content__button"
          onClick={() => getPublications(1, true)}
        >
          Mostrar nuevas
        </button>
      </header>
      <PublicationList
        publications={publications}
        page={page}
        setPage={setPage}
        more={more}
        setMore={setMore}
        getPublications={getPublications}
      />
    </section>
  );
};
