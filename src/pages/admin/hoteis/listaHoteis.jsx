import { Paginacao } from "../../../Shared/paginacao";
import { useState, useEffect } from "react";
import { api } from "../../../Shared/api";
import { TabelaHoteis } from "./tabelaHoteis";
import { ScreenLoader } from "../../../components/loader/loader";
import { NavLink } from "react-router-dom";

export const ListaHoteis = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    api.get("hoteis")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);

  return (
    <>
      {loading ? <ScreenLoader /> : (
        <div className="container mt-5 mb-3">
          <div className="row align-baseline">
            <div className="col-10">
              <h2> Lista de Hoteis</h2>
            </div>
            <div style={{ display: "flex" }} className="col-2 justify-content-end align-content-end">
              <NavLink to={"/backoffice/hoteis/add"}> <button className="btn btn-primary">Criar Hotel</button></NavLink>
            </div>
          </div>
        </div>)}
        
      <TabelaHoteis data={currentRecords} />
      <Paginacao
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

    </>
  );
};
