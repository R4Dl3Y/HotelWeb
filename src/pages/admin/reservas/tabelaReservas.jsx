import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { api } from '../../../Shared/api';

export const TabelaReservas = (props) => {
  const data = props.data;

  const estados = ["Cancelada", "Pendente", "Confirmada", "Negada"]

  const [Reserva, setReserva] = useState({ "_Id": null });

  const [showDelete, setshowDelete] = useState(false);
  const openshowDelete = (id) => { setshowDelete(true); setReserva({ "_Id": id }) }
  const closeshowDelete = () => setshowDelete(false)

  const alterarEstado = (id, estado) => {
    //codigo para alterar estado

    const estadoFinal = { "estado": estado }

    api.patch("reservas/" + id, estadoFinal).then((res) => {
      console.log(res)
      window.location.reload(false)
    }).catch((err) => {
      console.log(err)
    })
  }

  const Delete = () => {
    //codigo para apagar

    api.delete("reservas/" + Reserva._Id).then((res) => {
      window.location.reload(false)
      closeshowDelete()
    }
    ).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Modal show={showDelete} onHide={closeshowDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Reservation ? </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> Reservation with id {Reserva._Id} will be permanently deleted </p>
        </Modal.Body>
        <Modal.Footer>
        <button variant="secondary" className="btn btn-secondary" onClick={closeshowDelete}>
            Cancelar
          </button>
          <button variant="primary" className="btn btn-primary" onClick={Delete}>
            Sim e Sair
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
                  <th>Hotel Id</th>
                  <th>Room Id</th>
                  <th>User Id</th>
                  <th>Check In Date</th>
                  <th>Check Out Date</th>
                  <th>Price</th>
                  <th>Guests Number</th>
                  <th>State</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr>
                    <td>{item._id}</td>
                    <td>{item.hotel_id}</td>
                    <td>{item.quarto_id}</td>
                    <td>{item.utilizador_id}</td>
                    <td>{item.data_entrada}</td>
                    <td>{item.data_saida}</td>
                    <td>{item.preco}</td>
                    <td>{item.numero_pessoas}</td>
                    <td><Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {item.estado}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {estados.map((estado) => (
                          <Dropdown.Item onClick={() => alterarEstado(item._id, estado)} >{estado}</Dropdown.Item>
                        ))}

                      </Dropdown.Menu>
                    </Dropdown>
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => openshowDelete(item._id)}>Delete</button>
                      <NavLink to={`/backoffice/reservas/${item._id}`}> <button className="btn btn-danger">Edit</button></NavLink>
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
