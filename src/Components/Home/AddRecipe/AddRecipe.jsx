import s from "./AddRecipe.module.css";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import Card from "../Cards/Card";
import Swal from 'sweetalert2';

export default function AddRecipe({ data, close, setData }) {

    const [search, setSearch] = useState([]);


    useEffect(()=>{
        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden';
        return ()=> document.body.style.overflow = 'unset';
    },[]);

    const addRecipe = (veg, id) => {
        let vegan = 0;
        let primal = 0;

        for (let i = 0; i < data.length; i++) {
            if (data[i].vegan === true) {
                vegan = vegan + 1
            } else {
                primal = primal + 1
            }
        }

        const newRecipe = search.find(data => data.id === id);


        if (veg) {
            if (vegan < 2) {
                setData(data => {
                    return [
                        ...data,
                        newRecipe
                    ]
                })
            } else {
                Swal.fire({
                    text: 'Ya hay 2 recetas veganas en el menú',
                    icon: 'error',
                    title: 'Oops...',
                    background: "black",
                    color: "white",
                    confirmButtonColor: '#A04668',
                  });
            }
        } else {

            if (primal < 2) {
                setData(data => {
                    return [
                        ...data,
                        newRecipe
                    ]
                })
            } else {
                Swal.fire({
                    text: 'Ya hay 2 recetas primales en el menú',
                    icon: 'error',
                    title: 'Oops...',
                    background: "black",
                    color: "white",
                    confirmButtonColor: '#A04668',
                  });
            }
        }


    }

    return (
        <div className={s.background}>
            <div className={s.card}>
                <div className={s.top}>
                    <button className={s.close} onClick={close} type="button">X</button>
                    <h3 className={s.title}>Add recipe</h3>
                </div>
                <Formik
                    initialValues={{
                        search: ""
                    }}
                    validate={(val) => {
                        let errors = {};

                        if (val.search.length > 2) {
                            axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${val.search}&addRecipeInformation=true&apiKey=6afbda1e2fac4cba90d423927938f394`)
                                .then(res => setSearch(res.data.results))
                                .catch(e => console.log(e))
                        } else {
                            setSearch([]);
                            errors.search = "Ingrese mas de 2 caracteres"
                        }
                        return errors;
                    }}
                    onSubmit={(val) => {
                        console.log("Formulario enviado nazi");
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <form className={s.form} onSubmit={handleSubmit}>
                            <input type="search" className={s.inputSearch} placeholder="Buscar" onChange={handleChange} value={values.search} name="search" id="search" />
                            {errors.search && <div className={s.error}>{errors.search}</div>}
                        </form>
                    )
                    }
                </Formik>
                <div className={s.cardsContainer}>
                    {
                        search.length > 0 ? search.map(data => (
                            <Card
                                image={data.image}
                                title={data.title}
                                id={data.id}
                                key={data.id}
                                add={addRecipe}
                                vegan={data.vegan}
                                diets={data.diets}
                            />
                        )) : ""
                    }
                </div>

            </div>
        </div>
    )

}