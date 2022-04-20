import { useEffect, useState } from "react";
import s from "./Detail.module.css";
import axios from "axios";

export default function Detail({close, id}){

    const [data, setData] = useState({
        title: "",
        summary: "",
        healthScore: 0,
        time: 0,
        price: 0,
        diets: [],
        dishTypes: []
    })

    useEffect(()=>{
        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden';
        if(!data.title){
            axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=6afbda1e2fac4cba90d423927938f394`)
            .then(res =>{
                console.log(res);
                setData({
                    title: res.data.title,
                    summary: res.data.summary,
                    healthScore: res.data.healthScore,
                    time: res.data.readyInMinutes,
                    price: res.data.pricePerServing,
                    diets: res.data.diets,
                    dishTypes: res.data.dishTypes
                })
            })
            .catch(e =>{
                console.log(e);
            })
        }
        return ()=> document.body.style.overflow = 'unset';
    },[]);

    return(
        <div onClick={close} className={s.background}>
           <div className={s.card}>
                <h3 className={s.title}>{data.title}</h3>
                {/* <div dangerouslySetInnerHTML={{__html: data.summary}} /> */}
                <div>
                    <span className={s.health}>HealScore: {data.healthScore} 💚</span>
                    <span className={s.time}>Tiempo de preparación: {data.time} ⌚</span>
                </div>
                <span className={s.price}>Precio: ${data.price}</span>
                <div className={s.listContainer}>
                    <div className={s.list}>
                        {
                            data.diets.length > 0 ? data.diets.map(diet =>(
                                <span>✔ {diet}</span>
                            )) : ""
                        }
                    </div>
                    <div className={s.list}>
                        {
                            data.dishTypes.length > 0 ? data.dishTypes.map(type =>(
                                <span>🍝 {type}</span>
                            )) : ""
                        }
                    </div>
                </div>
                <span className={s.textClose}>Click en cualquier sitio para cerrar</span>
           </div>
        </div>
    )
}