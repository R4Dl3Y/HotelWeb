import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../../../Shared/api";
import { useParams } from "react-router";
import { ScreenLoader } from "../../../components/loader/loader";

export const EditarCriarReservas = () => {

    const params = useParams();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [isCorrect, setIsCorrect] = useState(true)

    const [formData, setFormData] = useState({});

    const [hoteis, setHoteis] = useState([]);

    const [quartos, setQuartos] = useState([]);

    const [utilizadores, setUtilizadores] = useState([]);

    useEffect(() => {

        api.get("hoteis").then((res) => {
            setHoteis(res.data)
        }).catch(err => {
            console.log(err);
        })

        api.get("utilizadores").then((res) => {
            setUtilizadores(res.data)
        }).catch(err => {
            console.log(err);
        })

        if (params.id !== undefined) {
            api.get("reservas/" + params.id).then((res) => {
                setFormData(res.data);
                setIsLoading(false);
            }).catch((err) => {
                setIsLoading(false);
                console.log(err)
            })
        } else {
            setFormData({
                _id: null,
                hotel_id: null,
                quarto_id: null,
                utilizador_id: null,
                data_entrada: "",
                data_saida: "",
                preco: null,
                numero_pessoas: null,
                estado: "",
                
            })
            setIsLoading(false);
        }

        api.get("quartos/hotel/"+formData.hotel_id).then((res) => {
            setQuartos(res.data)
        })
        .catch((err) => {
            console.log(err);
            })

    }, []);

    useEffect(() => {
        setIsLoading(true);
      
        api.get("quartos/hotel/"+formData.hotel_id).then((res) => {
            setQuartos(res.data)
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        })

        console.log(quartos)
    }, [formData.hotel_id])
    

    const handleChange = (event) => {
        setFormData((reservaj) => ({
            ...reservaj,
            [event.target.name]: event.target.value,
        }));
    };

    useEffect(() => {
        register("id", { value: formData._id });
    }, []);


    const submitForm = (reservaa, event) => {

        setIsLoading(true);
        event.preventDefault();

        setFormData(reservaa);

        const reserva = {
            hotel_id: reservaa.hotel_id,
            quarto_id: reservaa.quarto_id,
            utilizador_id: reservaa.utilizador_id,
            data_entrada: reservaa.data_entrada,
            data_saida: reservaa.data_saida,
            preco: reservaa.preco,
            numero_pessoas: reservaa.numero_pessoas,
            servicos:reservaa.servicos,
            estado: reservaa.estado
        }

        if (formData._id !== null) {
            console.log(reserva)
            api.patch("reservas/" + params.id, reserva)
                .then((res) => {
                    console.log(res.data)
                    navigate("/backoffice/reservas")
                    setIsLoading(false);
                }
                )
                .catch((err) => {
                    setIsLoading(false);
                    setIsCorrect(false)
                    console.log(err)
                })
        } else {

            api.post("reservas", reserva)
                .then((res) => {
                    console.log(res.data)
                    navigate("/backoffice/reservas")
                    setIsLoading(false);
                })
                .catch((err) => {
                    setIsLoading(false);
                    setIsCorrect(false)
                    console.log(err)


                })
        }

    }

    

    return (
        <>
            {isLoading ? <ScreenLoader /> :
                <div className="containerForm">
                    <h1 className="ms-lg-4 mb-4">{formData._id != null ? `Editar Reserva` : "Criar Reserva"} </h1>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(submitForm)}>
                                        <div className="form-group">
                                            <label htmlFor="hotel_id">Hotel</label>
                                            <select
                                                className="form-control"
                                                {...register("hotel_id", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.hotel_id,
                                                })}
                                            >
                                                <option value="">Pick an hotel</option>
                                                {hoteis.map((hotel) => {
                                                    return (
                                                        <option value={hotel._id}>{hotel.nome}</option>
                                                    )
                                                }
                                                )}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="quarto_id">Room</label>
                                            <select
                                                className="form-control"
                                                {...register("quarto_id", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.quarto_id,
                                                })}
                                            >
                                                <option value="">Selecione um quarto</option>
                                                {quartos.map((quarto) => {
                                                    return (
                                                        <option value={quarto._id}>{quarto.numero_quarto}</option>
                                                    )
                                                }
                                                )}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="utilizador_id">User</label>
                                            <select
                                                className="form-control"
                                                {...register("utilizador_id", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.utilizador_id,
                                                })}
                                            >
                                                <option value="">Pick an user</option>
                                                {utilizadores.map((utilizador) => {
                                                    return (
                                                        <option value={utilizador._id}>{utilizador.nome + " " + utilizador.apelido}</option>
                                                    )
                                                }
                                                )}
                                            </select>

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="data_entrada">Check in Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                {...register("data_entrada", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.data_entrada,
                                                })}
                                            />
                                            {errors.data_entrada && <span className="text-danger">Mandatory Field!</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="data_saida">Check out Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                {...register("data_saida", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.data_saida,
                                                })}
                                            />
                                            {errors.data_saida && <span className="text-danger">Mandatory Field!</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="preco">Price</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                {...register("preco", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.preco,
                                                })}
                                            />
                                            {errors.preco && <span className="text-danger">Mandatory Field!</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="numero_pessoas">Guests Number</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                {...register("numero_pessoas", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.numero_pessoas,
                                                })}
                                            />
                                            {errors.numero_pessoas && <span className="text-danger">Mandatory Field!</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="estado">State</label>
                                            <select
                                                className="form-control"
                                                {...register("estado", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.estado,
                                                })}
                                            >
                                                <option value="">Pick a state</option>
                                                <option value="negada">Denied</option>
                                                <option value="pendente">Pending</option>
                                                <option value="confirmada">Confirmed</option>
                                                <option value="cancelada">Canceled</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="observacoes">Observations</label>
                                            <textarea
                                                className="form-control"
                                                {...register("observacoes", {
                                                    onChange: handleChange,
                                                    value: formData.observacoes,
                                                })}
                                            />
                                        </div>

                                        
                                        

                                        <div className="form-group">
                                        {!isCorrect ? <h6>Ups! Something went wrong...</h6> : ""}
                                            <button type="submit" className="btn btn-danger">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}