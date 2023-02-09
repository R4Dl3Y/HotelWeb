import { NavLink } from "react-router-dom";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { api } from "../../../Shared/api";

export const TabelaHoteis = (props) => {
  const data = props.data;

  const [Hotel, setHotel] = useState({ "_Id": null, "disponivel": null, "nome": "" });

  const [showDelete, setshowDelete] = useState(false);
  const openshowDelete = (id, nome) => { setshowDelete(true); setHotel({ "_Id": id, "nome": nome }) }
  const closeshowDelete = () => setshowDelete(false)

  const [ShowDisponivel, setShowDisponivel] = useState(false);
  const openShowDisponivel = (id, disponivel, nome) => { setShowDisponivel(true); setHotel({ "_Id": id, "disponivel": disponivel , "nome":nome}) }
  const closeShowDisponivel = () => setShowDisponivel(false)

  const Delete = () => {

    //codigo para apagar

    api.delete("hoteis/" + Hotel._Id).then((res) => {
      window.location.reload(false)
      closeshowDelete()
    }).catch((err) => {
      console.log(err)
    })

  }

  const Disponivel = () => {

    //codigo para retirar ou adicionar disponivel

    let disponivel = { "disponivel": null }

    if (Hotel.disponivel === true) {
      disponivel = { "disponivel": false }
    } else {
      disponivel = { "disponivel": true }
    }


    api.patch("hoteis/" + Hotel._Id, disponivel).then((res) => {
      window.location.reload(false)
      closeShowDisponivel()
    }).catch((err) => {
      console.log(err)
    })

  }



  return (
    <>
      <Modal show={showDelete} onHide={closeshowDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Hotel ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure that you want to delete the Hotel {Hotel.nome} ?</p>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" className="btn btn-secondary" onClick={closeshowDelete}>
            Cancel
          </button>
          <button variant="danger" className="btn btn-primary" onClick={Delete}>
            Yes and Exit
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={ShowDisponivel} onHide={closeShowDisponivel}>
        <Modal.Header closeButton>
          <Modal.Title>
            {Hotel.disponivel === true ? "Retirar Disponibilidade" : "Colocar Disponibilidade"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {Hotel.disponivel === true ? <p>Make hotel unavailable {Hotel.nome}</p>
            : <p>Make hotel available {Hotel.nome} ?</p>}
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" className="btn btn-secondary" onClick={closeShowDisponivel}>
            Cancel
          </button>
          <button variant="primary" className="btn btn-danger" onClick={Disponivel}>
            Yes and Exit
          </button>
        </Modal.Footer>
      </Modal>


          <div className="container">
            <div className="row">
              <div className="col-12">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Available</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr>
                        <td>{item._id}</td>
                        <td>{item.nome}</td>
                        <td>{item.endereco}</td>
                        <td>{item.disponivel === true ? "Sim" : "Não"}</td>
                        <td>
                        <button className="btn btn-danger" onClick={()=> openshowDelete(item._id)}>Delete</button>
                        {item.disponivel !== true ? <button className="btn btn-danger mx-2" onClick={()=> openShowDisponivel(item._id, item.disponivel, item.nome)}>Make available</button>
                          : <button className="btn btn-danger mx-2" onClick={()=> openShowDisponivel(item._id, item.disponivel, item.nome)}>Make Unavailable</button>}
                          <NavLink to={`/backoffice/hoteis/${item._id}`}><button className="btn btn-danger">Update</button></NavLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
        );
};
