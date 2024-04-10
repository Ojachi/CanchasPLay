import React, { useEffect, useState } from "react";
import axios from "axios";
import CharacterList from "../components/CharacterList";
import RICK from "../img/rick.png";

const API = () => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesToShow, setPagesToShow] = useState(5);
  const url = "https://rickandmortyapi.com/api/character";

  const fetchCharacters = (url) => {
    axios
      .get(url)
      .then((data) => {
        setCharacters(data.data.results);
        setInfo(data.data.info);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNextPage = () => {
    if (info.next) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (info.prev) {
      setCurrentPage(currentPage - 1);
    }
  };

  const fetchCharactersByPage = (pageNumber) => {
    fetchCharacters(`${url}?page=${pageNumber}`);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchCharactersByPage(pageNumber);
  };

  useEffect(() => {
    fetchCharactersByPage(currentPage);
  }, [currentPage]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let start = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
    let end = start + pagesToShow - 1;
    if (end > info.pages) {
      end = info.pages;
    }

    for (let i = start; i <= end; i++) {
      const activeClass = i === currentPage ? 'active' : '';

      pageNumbers.push(
        <li key={i} className="page-item">
          <button className={`page-link ${activeClass}`} onClick={() => handlePageClick(i)}>
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(info.pages);
  };

  return (
    <div className="Contenedor_API">
      <div className="Contenedor_Img_API">
        <img src={RICK} alt="Logo" className="API_Logo" />
      </div>

      <CharacterList characters={characters} />

      <div className="container pb-5">
        <nav>
          <ul className="pagination justify-content-center">

		  	<li className="page-item">
              <button id="customPreviousBtn" onClick={handleFirstPage}>
                First
              </button>
            </li>

            {info.prev ? (
              <li className="page-item">
                <button id="customPreviousBtn" onClick={handlePreviousPage}>
                  Previous
                </button>
              </li>
            ) : null}
            {renderPageNumbers()}
            {info.next ? (
              <li className="page-item">
                <button id="customNextBtn" onClick={handleNextPage}>
                  Next
                </button>
              </li>
            ) : null}

			<li className="page-item">
              <button id="customNextBtn" onClick={handleLastPage}>
                Last
              </button>
            </li>

          </ul>
        </nav>
      </div>
    </div>
  );
};

export default API;
