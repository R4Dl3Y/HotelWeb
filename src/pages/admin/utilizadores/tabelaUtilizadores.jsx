import { NavLink } from "react-router-dom";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { api } from "../../../Shared/api";

export const TabelaUtilizadores = (props) => {
  const data = props.data;

  const [User, setUser] = useState({ "_Id": null, "admin": null, "nome":"", "apelido":"" });

  const [showDelete, setshowDelete] = useState(false);
  const openshowDelete = (id, nome, apelido) => { setshowDelete(true); setUser({ "_Id": id, "nome":nome, "apelido":apelido }) }
  const closeshowDelete = () => setshowDelete(false)

  const [ShowAdmin, setShowAdmin] = useState(false);
  const openShowAdmin = (id, admin, nome, apelido) => { setShowAdmin(true); setUser({ "_Id": id, "admin": admin, "nome":nome, "apelido":apelido })}
  const closeShowAdmin = () => setShowAdmin(false)

  
  

  const Delete = () => {

    //codigo para apagar

    api.delete("utilizadores/"+User._Id).then((res)=>{
      window.location.reload(false)
      closeshowDelete()
    }).catch((err)=>{
      console.log(err)
    })

  }

  const Admin = () => {

    //codigo para retirar ou adicionar admin

    let admin ={"admin":null}

    if(User.admin === true){
      admin = {"admin":false}
    }else{
      admin = {"admin":true}
    }

    

    api.patch("utilizadores/"+User._Id, admin).then((res)=>{
      console.log(admin)
      window.location.reload(false)
      closeShowAdmin()
    }).catch((err)=>{
      console.log(err)
    })

  }
  


  return (
    <>

      <Modal show={showDelete} onHide={closeshowDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to delete the user ? </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> {`O Utilizador ${User.nome} ${User.apelido} será apagado permanentemente? `} </p>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" className="btn btn-secondary" onClick={closeshowDelete}>
            Cancel
          </button>
          <button variant="primary" className="btn btn-danger" onClick={Delete}>
            Yes and Exit
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={ShowAdmin} onHide={closeShowAdmin}>
        <Modal.Header closeButton>
          <Modal.Title> {User.admin === true ? <p>Remove admin</p> : <p>Add admin</p>}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {User.admin === true ? <p>{`Do you want to remove the admin role of the user ${User.nome} ${User.apelido} ?` }</p> : 
          <p>{`Do you want to give the admin role to the user ${User.nome} ${User.apelido} ? `}</p>}
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" className="btn btn-secondary" onClick={closeShowAdmin}>
            Cancel
          </button>
          <button variant="primary" className="btn btn-danger" onClick={Admin}>
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
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Type</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr>
                    <td>{item._id}</td>
                    <td>{item.nome}</td>
                    <td>{item.apelido}</td>
                    <td>{item.email}</td>
                    <td>{item.telefone}</td>
                    <td>{item.admin === true ? "Admin" : "Utilizador"}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => openshowDelete(item._id,item.nome, item.apelido)}> Delete</button>
                      {item.admin === true ? <button className="btn btn-danger mx-2" onClick={() => openShowAdmin(item._id, item.admin, item.nome, item.apelido)}>Remove Admin Role</button>
                        : <button className="btn btn-danger mx-2" onClick={() => openShowAdmin(item._id, item.admin, item.nome, item.apelido)}>Add Admin Role</button>}
                      <NavLink to={`/backoffice/users/${item._id}`}><button className="btn btn-danger">Edit</button></NavLink>
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
