import { NavLink } from "react-router-dom";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { api } from "../../../Shared/api";

export const TabelaQuartos = (props) => {
  const data = props.data;

  const [Quarto, setQuarto] = useState({ "_Id": null, "hotel_id": null, "numero_quarto":null,"disponivel":null });

  const [showDelete, setshowDelete] = useState(false);
  const openshowDelete = (id, hotel_id, numero_quarto) => { setshowDelete(true); setQuarto({ "_Id": id, "hotel_id": hotel_id, "numero_quarto":numero_quarto }) }
  const closeshowDelete = () => setshowDelete(false)

  const [ShowDisponivel, setShowDisponivel] = useState(false);
  const openShowDisponivel = (id, hotel_id, numero_quarto, disponivel)=> {setShowDisponivel(true);setQuarto({ "_Id": id, "hotel_id": hotel_id, "numero_quarto":numero_quarto, "disponivel":disponivel })}
  const closeShowDisponivel = () => setShowDisponivel(false)

  const Delete = () => {

    //codigo para apagar

    api.delete("quartos/" + Quarto._Id).then((res) => {
      window.location.reload(false)
      closeshowDelete()
    }).catch((err) => {
      console.log(err)
    })

  }

  const Disponivel = () => {

    //codigo para retirar ou adicionar disponivel

    let disponivel = { "disponivel": null }

    if (Quarto.disponivel === true) {
      disponivel = { "disponivel": false }
    } else {
      disponivel = { "disponivel": true }
    }

    api.patch("quartos/" + Quarto._Id, disponivel).then((res) => {
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
          <Modal.Title>Delete Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you want to delete the room {Quarto.numero_quarto} from the hotel with the id {Quarto.hotel_id}?</Modal.Body>
        <Modal.Footer>
        <button variant="secondary" className="btn btn-secondary" onClick={closeshowDelete}>
            Cancel
          </button>
          <button variant="primary" className="btn btn-danger" onClick={Delete}>
            Yes and Exit
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={ShowDisponivel} onHide={closeShowDisponivel}>
        <Modal.Header closeButton>
          <Modal.Title>
            {Quarto.disponivel===true? "Colocar indisponivel":"Colocar disponivel"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {Quarto.disponivel === true ? <p>Do you want to make the room unavailable {Quarto.numero_quarto} from the hotel with the id {Quarto.hotel_id}?</p>
            : <p>Do you want to make the room available {Quarto.numero_quarto} from the hotel with the id {Quarto.hotel_id}?</p>}
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
                  <th>Id Hotel</th>
                  <th>Room Number</th>
                  <th>Price</th>
                  <th>Available</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr>
                    <td>{item._id}</td>
                    <td>{item.hotel_id}</td>
                    <td>{item.numero_quarto}</td>
                    <td>{item.preco}</td>
                    <td>{item.disponivel===true? "Sim":"Não"}</td>
                    <td>
                      <button className="btn btn-danger" onClick={()=> openshowDelete(item._id, item.hotel_id, item.numero_quarto)}>Delete</button>
                      {item.disponivel!==true? <button className="btn btn-danger mx-2" onClick={()=> openShowDisponivel(item._id, item.hotel_id, item.disponivel)}>Make available</button>
                      :<button className="btn btn-danger mx-2" onClick={()=> openShowDisponivel(item._id, item.hotel_id, item.numero_quarto, item.disponivel)}>Make unavailable</button>}
                     <NavLink to={`/backoffice/quartos/${item._id}`}> <button className="btn btn-danger">Edit</button></NavLink>
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
