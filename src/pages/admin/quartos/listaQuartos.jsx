import { Paginacao } from "../../../Shared/paginacao";
import { useState, useEffect } from "react";
import { api } from "../../../Shared/api";
import { TabelaQuartos } from "./tabelaQuartos";
import { ScreenLoader } from "../../../components/loader/loader";
import { NavLink } from "react-router-dom";

export const ListaQuartos = () => {

  // inicializa o state para armazenar os dados de utilizadores
const [data, setData] = useState([]);
// inicializa o state para armazenar o status de carregamento
const [loading, setLoading] = useState(true);

// inicializa o state para armazenar a página atual
const [currentPage, setCurrentPage] = useState(1);
// inicializa o state para armazenar a quantidade de records por página
const [recordsPerPage] = useState(10);

  useEffect(() => {
    api.get("quartos")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // calcula o índice do último record na página atual
  const indexOfLastRecord = currentPage * recordsPerPage;
  // calcula o índice do primeiro record na página atual
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // seleciona os records atuais baseado no índice calculado
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  // calcula o número total de páginas baseado na quantidade de records e a quantidade por página
  const nPages = Math.ceil(data.length / recordsPerPage);

  return (
    <>
    {loading? <ScreenLoader /> : (
    <div className="container mt-5 mb-3">
    <div className="row align-baseline">
      <div className="col-10" >
        <h2 className="m-0"> Room List</h2>
      </div>
      <div style={{ display: "flex" }} className="col-2 justify-content-end align-content-end">
        <NavLink to={"/backoffice/quartos/add"}><button className="btn btn-danger ">Create Room</button></NavLink>
      </div>
    </div>
  </div> )}

      <TabelaQuartos data={currentRecords} />
      <Paginacao
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

    </>
  );
};
