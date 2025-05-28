import './selector.scss'
import Image from 'next/image';
import { FC, useState } from "react";

import tick from '@/assets/images/tick.svg'

interface SelectorInterface {
    handleFiltersOpen: ()=> void
    selecrotCallBack: (selectredSelector: string) => void
}

const Selector: FC<SelectorInterface>= ({handleFiltersOpen, selecrotCallBack}) => {

    const options: string[] = ["За датою", "За рейтингом", "За переглядами"]

    const [open, setOpen] = useState<boolean>(false)                //открытие селектора
    const [selected, setSelected] = useState<string>(options[0])    //сохранение опшина


    // функция для выбора опшина
    const handleSelector = (option: string) => {
        setSelected(option)         //для отображения изменений
        selecrotCallBack(option)    //для запроса
        setOpen(false)
        
        // СДЕЛАТЬ КОЛБЕК
    }

    // функция для открытия селектора
    const handleOpen = () =>{
        setOpen(!open)
    }


    return (
        <div className="selectors">

            <button className='selectors_filters' onClick={handleFiltersOpen}>Фільтри</button>



            <div className="main_selector">
                <button className={open? "selector_selectedOption open" : "selector_selectedOption close"} onClick={handleOpen}>
                    <span>{selected}</span>
                    <Image src={tick} alt="tick" className={open? "selector_tick open" : "selector_tick close"}/>
                </button>


                <div className={open? "selector_options open" :"selector_options close"}>
                    {options.map((option, index) => (
                        <button className="selection_option" key={index} onClick={() => handleSelector(option)}>{option}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Selector