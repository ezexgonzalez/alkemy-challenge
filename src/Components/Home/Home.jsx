import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./Cards/Card";
import s from "./Home.module.css";
import Detail from "./Detail/Detail";
import AddRecipe from "./AddRecipe/AddRecipe";
import {BiMessageSquareAdd} from "react-icons/bi";
import {FiLogOut} from "react-icons/fi";

export default function Home(){
    
    const navigate = useNavigate();

    function logOut(){
        window.localStorage.removeItem("token");
        navigate("/login");
    }

    const [data, setData] = useState([]);
    const [info, setInfo] = useState({
        precio: 0,
        tiempo: 0,
        healthScore: 0
    });
    const [showModal, setShowModal] = useState({
        open: false,
        id: ""
    });

    const [showAddRecipe, setShowAddRecipe] = useState(false);

    useEffect(() =>{
        if(data.length === 0){
            axios.get("https://api.spoonacular.com/recipes/random?number=2&tags=vegan&apiKey=6afbda1e2fac4cba90d423927938f394")
            .then(res =>{
                const recipes = res.data
                return recipes;
            })
            .then(res=>{
                axios.get("https://api.spoonacular.com/recipes/random?number=2&tags=primal,meat&apiKey=6afbda1e2fac4cba90d423927938f394")
                .then(res1 =>{
                    const recipes = [...res.recipes, ...res1.data.recipes];
                    setData(recipes);
                    console.log(recipes);
                }); 
            })
            .catch(e=>{
                console.log(e);
            })
        }else{
            totalPrice();
        }
    },[data]);

    function close(id){
        setData(data.filter(recipe => recipe.id !== id.id));
    } 

    function toggleModal(id){
        setShowModal(data =>{
            return{
                ...data,
                open: !showModal.open,
                id: id
            }
        });
    }

    function totalPrice (){
        const obj = {
            precio: 0,
            tiempo: 0,
            healthScore: 0
        }
        data.forEach(data =>{
            obj.precio = obj.precio + data.pricePerServing;
            obj.tiempo = obj.tiempo + data.readyInMinutes;
            obj.healthScore = obj.healthScore + data.healthScore;
        });

        obj.tiempo = Math.ceil(obj.tiempo / data.length);
        obj.healthScore = Math.ceil(obj.healthScore / data.length);
        obj.precio = Math.ceil(obj.precio);

        setInfo(obj);
    }

    return(
        <main className={s.home}>
            {showModal.open ? <Detail id={showModal.id} close={toggleModal}/> : ""}
            {showAddRecipe ? <AddRecipe setData={setData} close={() => setShowAddRecipe(!showAddRecipe)} data={data}/> : ""}
            <div className={s.top}>
                <div className={s.buttonsContainer}>
                    <button className={s.logout} onClick={logOut} type="button">Log Out</button>
                    <button className={s.addRecipe} onClick={() => setShowAddRecipe(!showAddRecipe)} type="button">Add Recipe</button>
                    <BiMessageSquareAdd onClick={() => setShowAddRecipe(!showAddRecipe)} className={s.addIcon}/>
                    <FiLogOut onClick={logOut} className={s.logoutIcon}/>
                </div>
                 <h1 className={s.title}>Menú 📖</h1>
            </div>
            <div className={s.infoContainer}>
                <span className={s.price}>Precio total 💵: ${info.precio}</span>
                <span className={s.time}>Tiempo de preparación ⌚: {info.tiempo} minutos</span>
                <span className={s.health}>Health Score 💚: {info.healthScore}</span>
            </div>
            <div className={s.cards}>
                {
                     data.length > 0 ? data.map(recipe =>(
                        <Card key={recipe.id} vegan={recipe.vegan} toggleModal={toggleModal} image={recipe.image} id={recipe.id} title={recipe.title} diets={recipe.diets} close={close} />
                    )) : "" 
                }
            </div>
        </main>
    )
}