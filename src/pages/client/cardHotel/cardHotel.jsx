import { NavLink } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import "./cardHotel.css"

export const CardHotel = (props) => {

  const hotel = props.hotela
  return (
    <>
      <div className="card">
        <img src={hotel.imagens[0]} className="card-img-top" alt=''/>
        <div className="card-body">
          <h5 className="card-title">{hotel.nome}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{hotel.endereco}</h6>
          <p className="card-text">{hotel.descricao}</p>
          <p className="card-text">
            <strong>Available:</strong> {hotel.disponivel ? "Yes" : "No"}
          </p>
         {hotel.servicos && (
            <p className="card-text">
              {hotel.servicos.map(s => <ul id='ul'><li className='serviços-list'><h4><Badge bg="dark" >{s}</Badge></h4></li></ul>)}
            </p>
          )}
          
        </div>
        <div className='ver'><NavLink to={`/hotel/${hotel._id}`}> <button className='btn btn-danger'> Take a Look</button></NavLink> </div>
      </div>
    </>
  );
};


