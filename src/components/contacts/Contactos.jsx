import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export const Contactos = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = (data) => {
        setIsSubmitted(true);
    };

    return (
        <>
            <div className="container mt-2" style={{alignItems:"center", alignSelf:"center", justifyContent:"center", display:"flex", flexDirection:"column"}}>
                    <h1>Contacts</h1>
                    <p>If you have any question or doubt, you just need to write here.</p>
                    <div className="containerForm">
                        <form onSubmit={handleSubmit(onSubmit)} style={{height:"100%", width:"100%"}}>
                            <div className="form-group">
                                <label htmlFor="nome">Name</label>
                                <input type="text" className="form-control" id="nome" placeholder="Name" {...register("nome", { required: true })} />
                                {errors.nome && <span className="error">Mandatory Field</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Email" {...register("email", { required: true })} />
                                {errors.email && <span className="error">Mandatory Field</span>}
                            </div>
                            <div className="form-group">

                                <label htmlFor="mensagem">Message</label>
                                <textarea className="form-control" id="mensagem" rows="3" {...register("mensagem", { required: true })}></textarea>
                                {errors.mensagem && <span className="error">Mandatory Field</span>}
                            </div>
                            <div style={{ alignSelf:"center", justifyContent:"center", alignItems:"center", display:"flex"}}>
                            <button type="submit" className="btn btn-danger mt-3" style={{height:"42px", width:"90px", alignSelf:"center", justifyContent:"center", alignItems:"center", display:"flex"}}>Enviar</button>
                            </div>
                        </form>
                    </div>
            </div>
        </>


    )
}
