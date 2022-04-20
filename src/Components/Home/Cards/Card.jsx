import s from "./Card.module.css";
import { BsTrash } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { useState } from "react";

export default function Card({ image, title, close, diets, id, toggleModal, add, vegan}) {

    const [showBox , setShowBox] = useState(false);

    function handleToggle(){
        setShowBox(!showBox);
    }

    return (
        <div style={{ backgroundImage: `url(${image})` }} className={s.card}>
            <div className={s.bottom}>
                <div onMouseEnter={handleToggle} onMouseLeave={handleToggle} className={s.boxContainer}>
                    <span className={s.boxTitle}>🍝 Diets</span>
                    {
                        showBox ? diets && diets.length > 0 ? diets.map(diet => (
                            <span className={s.diet} key={diet}>✔{diet}</span>
                        )) : "" : ""
                    }
                </div>  
                <div className={s.buttonsContainer}>
                   {close && <button className={s.detail} onClick={()=> toggleModal(id)} type="button">{<span className={s.icon}><BiDetail className={s.closeIcon} /><span className={s.tooltip}>Detalles</span></span>}</button> }
                   {close && <button className={s.close} onClick={()=> close({id})} type="button">{<span className={s.icon}><BsTrash className={s.closeIcon} /><span className={s.tooltip}>Borrar plato</span></span>}</button> }
                   {add && <button className={s.add} onClick={() => add(vegan, id)} type="button">Agregar</button>}
                </div>
            </div>
            <span className={s.title}>{title}</span>
        </div>
    )
}