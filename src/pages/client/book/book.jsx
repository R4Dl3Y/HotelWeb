import './book.css';
import Accordion from 'react-bootstrap/Accordion';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { api } from '../../../Shared/api';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";


export const Reservar = (props) => {


    const [progress, setProgress] = useState(0);
    const [CheckInOut, setCheckInOut] = useState({
        CheckIn: null,
        CheckOut: null,
        numberPeople: null
    });



    const params = useParams();
    const HotelId = params.hotelId;
    const QuartoID = params.quartoId;

    const [Hotel, setHotel] = useState({});
    const [Quarto, setQuarto] = useState({})

    useEffect(() => {
        api.get("hoteis/" + HotelId).then((res) => {
            setHotel(res.data);
            api.get("quartos/" + QuartoID).then((res) => {
                setQuarto(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })


    }, []);


    const User = props.user

    const handleChange = (novoValor, CheckInDate, CheckOutDate, numberPeople) => {
        setProgress(novoValor);
        setCheckInOut({ CheckIn: CheckInDate, CheckOut: CheckOutDate, numberPeople: numberPeople });
    };



    return (
        <div className='container-main-main'>
            <div className='container-main'>
                <div id='container'>


                    {progress === 0 ? <UserData User={User} onChange={handleChange} Hotel={Hotel}> </UserData> : ""}
                    {progress === 33 ? <QuartoData Quarto={Quarto} Hotel={Hotel} onChange={handleChange}> </QuartoData> : ""}
                    {progress === 66 ? <DataData User={User} Quarto={Quarto} Hotel={Hotel} onChange={handleChange}> </DataData> : ""}
                    {progress === 99 ? <Fim Quarto={Quarto} Hotel={Hotel} User={User} Data={CheckInOut} onChange={handleChange}> </Fim> : ""}
                    {progress === 100 ? <Sucesso></Sucesso> : ""}
                </div>
                {console.log(CheckInOut)}
                <div className='Container-progress'>
                    <ProgressBares progress={progress}></ProgressBares>
                </div>
            </div>
        </div>
    )
}
const UserData = (props) => {

    const User = props.User;
    const Hotel = props.Hotel;
    console.log(Hotel)

    const { register, handleSubmit } = useForm();

    const handleClick = () => {
        props.onChange(33);
    };

    const submitForm = (usera, event) => {

        console.log(usera)

        event.preventDefault();

        const user = {
            nome: usera.nome,
            apelido: usera.apelido,
            email: usera.email,
            nif: usera.nif,
            telefone: usera.telefone,
            data_nascimento: usera.data_nascimento,



        }

        console.log(user)
        api.patch("utilizadores/" + User._id, user)
            .then((res) => {
                console.log(res.data)
                handleClick()
            }
            )
            .catch((err) => {

                console.log(err)
            })


    }

    return (
        <div>
            <h1> Dados do Cliente </h1>
            <Form onSubmit={handleSubmit(submitForm)}>
                <Form.Group className="mb-3" >
                    <Form.Label>Name </Form.Label>
                    <div id='nome'>
                        <Form.Control type="text" placeholder="Nome" defaultValue={User.nome}
                            {...register("nome", {
                                required: true,
                            })}
                        />
                        <Form.Control type="text" placeholder="Apelido" defaultValue={User.apelido}
                            {...register("apelido", {
                                required: true,
                            })}
                        />
                    </div>

                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control type="email" placeholder="email" defaultValue={User.email}
                        {...register("email", {
                            required: true,
                        })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Phone Number </Form.Label>
                    <Form.Control type="number" placeholder="Numero de Telefone" defaultValue={User.telefone}
                        {...register("telefone", {
                            required: true,
                        })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Birth Date</Form.Label>
                    <Form.Control type="date" placeholder="Data de Nascimento" defaultValue={User.data_nascimento}
                        {...register("data_nascimento", {
                            required: true,
                        })}
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>NIF </Form.Label>
                    <Form.Control type="number" placeholder="Nif" defaultValue={User.nif}
                        {...register("nif", {
                            required: true,
                        })}
                    />
                </Form.Group>


                <div id='Botoes'>

                    <Button variant="dark" type="submit">
                        Check and Next
                    </Button>

                    <Button variant="danger" >
                        <Link to={`/hotel/${Hotel._id}`} className="text-white text-decoration-none">
                            Cancel
                        </Link>
                    </Button>


                </div>
            </Form>
        </div>
    )
}
const QuartoData = (props) => {
    const handleClick = () => {
        props.onChange(66);
    };
    const Quarto = props.Quarto;
    const Hotel = props.Hotel;
    console.log(Hotel);
    return (
        <div>
            <div>
                <h1> Hotel Information </h1>
                <h3>Hotel name :  {Hotel.nome} </h3>
                <h5>Location : {Hotel.cidade} - {Hotel.endereco}</h5>
            </div>
            <div>
                <h1> Room Information </h1>
                <div>
                    <h5>{Quarto.tipo} - {Quarto.preco} €</h5>

                    <div className='serviços'>
                        <h5>Services: </h5>


                        {Quarto.servicos.map(serviço => <p>{serviço} ,</p>)}

                    </div>
                </div>
            </div>

            <div id='Botoes'>
                <Button variant="dark" type="submit" onClick={handleClick}>
                    Confirm and Next
                </Button>

                <Button variant="danger" >
                    <Link to={`/hotel/${Hotel._id}`} className="text-white text-decoration-none">
                        Cancel
                    </Link>
                </Button>
            </div>
        </div>
    )
}
const DataData = (props) => {
    const Hotel = props.Hotel;


    const handleClick = () => {


        const checkInInput = document.getElementById("formBasicCheckIN");
        const checkOutInput = document.getElementById("formBasicCheckOUT");
        const numberPeople = document.getElementById("formBasicNumberPeople");

        if (!checkInInput.value) {
            alert("Data de check-in é obrigatória");
        } else if (!checkOutInput.value) {
            alert("Data de check-out é obrigatória");
        } else {
            const checkInDate = new Date(document.getElementById("formBasicCheckIN").value);
            const checkOutDate = new Date(document.getElementById("formBasicCheckOUT").value);
            const today = new Date();

            if (checkInDate < today) {
                alert("Data de check-in não pode ser inferior a hoje");
            } else if (checkOutDate < checkInDate) {
                alert("Data de check-out não pode ser inferior a data de check-in");
            } if (checkInDate === checkOutDate) {
                alert("Data de check-out não pode ser igual a data de check-in");
            } else {

                props.onChange(99, checkInDate, checkOutDate, numberPeople.value);
            }
        }
    }

    return (
        <div>
            <Form>


                <Form.Group className="mb-3" controlId="formBasicCheckIN">
                    <Form.Label>Check-in Date</Form.Label>
                    <Form.Control type="date" placeholder="Data de Check-in" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckOUT">
                    <Form.Label>Check-out Date</Form.Label>
                    <Form.Control type="date" placeholder="Data Check-out" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicNumberPeople">
                    <Form.Label>Guests Number</Form.Label>
                    <Form.Control type="number" placeholder="Numero de pessoas" />
                </Form.Group>



                <div id='Botoes'>

                    <Button variant="dark" type="submit" onClick={handleClick}>
                        Confirm and Next
                    </Button>

                    <Button variant="danger" >
                        <Link to={`/hotel/${Hotel._id}`} className="text-white text-decoration-none">
                            Cancelar
                        </Link>
                    </Button>


                </div>
            </Form>
        </div>
    )
}
const Fim = (props) => {
    const handleClick = () => {

        const reserva = {
            hotel_id: props.Hotel._id,
            quarto_id: props.Quarto._id,
            utilizador_id: props.User._id,
            data_entrada: `${new Date(Data.CheckIn).toLocaleDateString("PT-pt")}`,
            data_saida: `${new Date(Data.CheckOut).toLocaleDateString("PT-pt")}`,
            preco: precoTotal,
            estado: "pendente",
            numero_pessoas: props.Data.numberPeople
        }

        const disponivel = {
            disponivel: false
        }


        api.post("/reservas", reserva).then((res) => {
            console.log(res);
            api.patch("/quartos/" + props.Quarto._id, disponivel).then((res) => {
                console.log(res);
                props.onChange(100);
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })



    };
    const Hotel = props.Hotel;
    const preco = props.Quarto.preco;
    const User = props.User;
    const Data = props.Data;

    const checkIn = new Date(Data.CheckIn);
    const checkOut = new Date(Data.CheckOut);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    const precoTotal = preco * diffDays;


    console.log(preco);
    return (
        <div>
            <h1>Confirm total payment of {precoTotal} € per {diffDays} day/s ? </h1>
            <div>
                <Accordion defaultActiveKey="1" flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Client Information </Accordion.Header>
                        <Accordion.Body>
                            <p>Name: {User.nome} {User.apelido}</p>
                            <p>Email: {User.email}</p>
                            <p>Phone Number: {User.telefone}</p>
                            <p>NIF : {User.nif}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Room Information</Accordion.Header>
                        <Accordion.Body>
                            <p>Hotel Name : {Hotel.nome}</p>
                            <p>Location : {Hotel.cidade} - {Hotel.endereco}</p>
                            <p>Room : {props.Quarto.tipo}</p>
                            <p>Price ( por noite ): {props.Quarto.preco} €</p>
                            <p>Check in Date : {`${new Date(Data.CheckIn).toLocaleDateString("PT-pt")}`}</p>
                            <p>Check out Date : {`${new Date(Data.CheckOut).toLocaleDateString("PT-pt")}`}</p>
                            <p>Number of Guests : {Data.numberPeople}</p>
                            <p>Number of Nights : {diffDays}</p>
                            <p>Total Price : {precoTotal} €</p>

                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

            <div id='Botoes'>
                <Button variant="dark" onClick={handleClick}> Yes </Button>


                <Button variant="danger"> <Link to={`/hotel/${Hotel._id}`} className="text-white text-decoration-none">
                    Não e Cancelar
                </Link> </Button>
            </div>
        </div >
    )
}
const Sucesso = (props) => {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate("/");
    }, 1000);

    return (
        <div>
            <h1> Reserved Successfully </h1>
        </div>)

}
const ProgressBares = (props) => {
    const progress = props.progress;
    return (
        <div>
            <ProgressBar now={progress} />
        </div>
    )
}