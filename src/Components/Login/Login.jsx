import s from "./Login.module.css";
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Login(){

    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        email:"",
        password:""
    });

    const [loading, setLoading] = useState(false);

    const [inputError, setInputError] = useState(false);
    const [response , setResponse] = useState("");

    useEffect(()=>{
        if(response && window.localStorage.getItem("token")){
            navigate("/home");
        }
        if(response.error){
            setLoading(false);
            Swal.fire({
                text: 'Usuario y/o contraseña incorrectos',
                icon: 'error',
                title: 'Oops...',
                background: "black",
                color: "white",
                confirmButtonColor: '#A04668'
              });
        }

    },[response]);

    function handleOnChange (e){
        setFormState(data =>{
            const newState = {
                ...data,
                [e.target.name]:e.target.value
            }
            return newState
        });
    }

    function submit(e){
        e.preventDefault();
        if(formState.email.length > 0 && formState.password.length > 0 && !loading){
            setInputError(false);
            setLoading(true);
            axios.post("http://challenge-react.alkemy.org/",formState)
            .then(res => {
                setResponse(true);
                window.localStorage.setItem("token", res.data.token);
            })
            .catch(e =>{
                setResponse({error: e});
            })
        }else if(!loading){
            setInputError(true);
        }
    }

    return(
        <div className={s.login}>
            <div className={s.card}>
                <div className={s.top}>
                    <span className={s.emoji}>👋</span>
                    <span className={s.title}>¡Bienvenido!</span>
                    <span>Inicia sesion para ver el menú</span>
                </div>
                <form onSubmit={submit} className={s.form}>
                    <label>Dirección Email</label>
                    <input onChange={handleOnChange} value={formState.email} type="email" name="email" placeholder="Su dirección de email" />
                    <label>Contraseña</label>
                    <input onChange={handleOnChange} value={formState.password} type="password" name="password" placeholder="Contraseña" />
                    {inputError ? <span className={s.error}>*Los dos campos son obligatorios!</span> : ""}
                    <button className={s.submitButton} type="submit">{loading ? <AiOutlineLoading3Quarters className={s.loading}/> : "Ingresar"}</button>
                </form>
            </div>
        </div>
    )
}