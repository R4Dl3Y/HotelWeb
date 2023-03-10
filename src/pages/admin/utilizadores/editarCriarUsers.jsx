import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../../../Shared/api";
import { useParams } from "react-router";
import { ScreenLoader } from "../../../components/loader/loader";


export const EditarCriarUsers = () => {

    const params = useParams();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [isCorrect, setIsCorrect] = useState(true)

    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (params.id === undefined) {
            console.log("nao tem id")
            setFormData({
                _id: null,
                nome: "",
                apelido: "",
                email: "",
                password: "",
                data_nascimento: "",
                nif: "",
                genero: "",
                telefone: "",
                admin: null

            })
            setIsLoading(false)
        } else {
            console.log("tem id")
            api.get("utilizadores/" + params.id).then((res) => {
                setIsLoading(false)
                setFormData(res.data)
            }).catch(err => {
                setIsLoading(false)
                console.log(err);
            })
        }
    }, [])



    const handleChange = (event) => {
        setFormData((userj) => ({
            ...userj,
            [event.target.name]: event.target.value,
        }));
    };

    useEffect(() => {
        register("id", { value: formData._id });
    }, []);


    const submitForm = (usera, event) => {

        setIsLoading(true);
        event.preventDefault();

        setFormData(usera);

        const user = {
            nome: formData.nome,
            apelido: formData.apelido,
            email: formData.email,
            password: formData.password,
            data_nascimento: formData.data_nascimento,
            nif: formData.nif,
            genero: formData.genero,
            telefone: formData.telefone,
            admin: formData.admin
        }

        const birthdate = new Date(user.data_nascimento);
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

        if (birthdate > eighteenYearsAgo) {
            alert("You must be 18 or older to register.");
            setIsLoading(false);
            setIsCorrect(false)
        } else {

            if (formData._id !== null) {
                console.log(user)
                api.patch("utilizadores/" + params.id, user)
                    .then((res) => {
                        console.log(res.data)
                        navigate("/backoffice/users")
                        setIsLoading(false);
                    }
                    )
                    .catch((err) => {
                        setIsLoading(false);
                        setIsCorrect(false)
                        console.log(err)
                    })
            } else {

                api.post("utilizadores", user)
                    .then((res) => {
                        console.log(res.data)
                        navigate("/backoffice/users")
                        setIsLoading(false);
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        setIsCorrect(false)
                        console.log(err)


                    })
            }
        }

    }

    return (
        <>
            {isLoading ? <ScreenLoader></ScreenLoader> :
                <div className="containerForm">
                    <h1 className="ms-lg-4 mb-4" >{formData.nome != null || formData.apelido != null ? `Editar ${formData.nome} ${formData.apelido}` : "Criar Utilizador"}</h1>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(submitForm)}>
                                        <div className="form-group">
                                            <label htmlFor="nome">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                {...register("nome", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.nome,
                                                })}
                                            />
                                            {errors.nome && <span className="text-danger">Mandatory Field!</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="apelido">Last Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                {...register("apelido", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.apelido,
                                                })}
                                            />
                                            {errors.apelido && <span className="text-danger">Mandatory Field!</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                {...register("email", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.email,
                                                })}
                                            />
                                            {errors.email && <span className="text-danger">Mandatory Field!</span>}
                                        </div>
                                        {params.id === undefined ? <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                {...register("password", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.password,
                                                    minLength: {
                                                        value: 5,
                                                        message: "minimo de letras 5",
                                                    },
                                                })}
                                            />
                                            {errors.password && <span className="text-danger">Mandatory Field!</span>}
                                        </div> : ""}

                                        <div className="form-group">
                                            <label htmlFor="data_nascimento">Birth Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                {...register("data_nascimento", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.data_nascimento,
                                                })}
                                            />
                                            {errors.data_nascimento && <span className="text-danger">Mandatory Field!</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="nif">NIF</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                {...register("nif", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.nif,
                                                })}
                                            />
                                            {errors.nif && <span className="text-danger">Mandatory Field</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="telefone">Phone Number</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                {...register("telefone", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.telefone,
                                                    maxLength: {
                                                        value: 9,
                                                    },
                                                    pattern: /([9][1236])\d{7}/,
                                                })}
                                            />
                                            {errors.telefone && <span className="text-danger">Madnatory Field!</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="genero">Gender</label>
                                            <select
                                                className="form-control"
                                                {...register("genero", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.genero,
                                                })}
                                            >
                                                <option value="">Select</option>
                                                <option value="Feminino">Female</option>
                                                <option value="Masculino">Male</option>
                                                <option value="Outro">Other</option>
                                            </select>

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="admin">Type</label>
                                            <select
                                                className="form-control"
                                                {...register("admin", {
                                                    required: true,
                                                    onChange: handleChange,
                                                    value: formData.admin,
                                                })}
                                            >
                                                <option value="">Select</option>
                                                <option value="false">User</option>
                                                <option value="true">Admin</option>
                                            </select>

                                        </div>
                                        {!isCorrect ? <h6>Ups! Something went wrong...</h6> : ""}
                                        <button type="submit" className="btn btn-danger mt-3">Save</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}