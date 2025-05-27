import { FC, useState, KeyboardEvent, ChangeEvent } from "react";
import { giftName } from "@/interfaces/interface";
import './searchBarBig.scss'

import search from '@/assets/images/Search.svg'
import random from '@/assets/images/Random.svg'


interface SearchBarBigInterface {
    handleSearchSubmitCallBack: (text: string) => void,
    handleSearchInputCallBack: (text: string) => void,
    giftNames: giftName[] | undefined,
    searchInput: string,
    handleRandomGiftCallBack: () => void
}

const SearchBarBig: FC <SearchBarBigInterface> = ({handleSearchSubmitCallBack, handleSearchInputCallBack, giftNames, searchInput, handleRandomGiftCallBack}) =>{

    // const results: string [] = ['name1', 'randomName gay sex', 'sescs', 'sdadadasdadcva', 'vavasdfwa']

    const [inputFocus, setInputFocus] = useState<boolean>(false)
    const [inputShow, setInputShow] = useState<boolean>(false)          //для назначения z-index
    
    const handleInputFocus = () => {
        setInputFocus(true)
        setInputShow(true)      //добавляем класс, который увеличивает z-index
    }

    const handleUnFocus = () => {
        setInputFocus(false)

        // убираем z-index после анимации затухания фона
        setTimeout(() => {
            setInputShow(false)
        }, 500);
    }

    const [chosenResultIndex, setChosenResultIndex] = useState<number>(-1)

    // const [searchInput, setSearchInput] = useState<string>('')

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        handleSearchInputCallBack(event.target.value)
    }


    // отлавливание нажатия на кнопку
    const handleSpecialKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key === 'Enter'){
            
            //если выбран тег из резалтов и после нажат энтер 
            if(chosenResultIndex > -1 && giftNames){
                handleSearchInputCallBack(giftNames[chosenResultIndex].name)
                setChosenResultIndex(-1)
            } else {
                handleSubmit()
                handleSearchInputCallBack('')
            }
        } else {

            if(event.key === 'ArrowUp' || event.key === 'ArrowDown'){
                if (!giftNames) {
                    // console.error('Массив tags пуст или равен null');
                    return;
                }

                let newIndex = chosenResultIndex;
            
                switch (event.key) {
                    case 'ArrowUp':
                        if (newIndex > 0) {
                            newIndex = newIndex - 1;
                        } else {
                            newIndex = giftNames.length - 1;
                        }
                        setChosenResultIndex(newIndex);
                        break;
                    case 'ArrowDown':
                        if (newIndex < giftNames.length - 1) {
                            newIndex = newIndex + 1;
                        } else {
                            newIndex = 0;
                        }
                        setChosenResultIndex(newIndex);
                        break;
                    default:
                        break;
                }
            }
        }
    };

    // по нажатию на результат, вносить его в инпут
    const handleResultClick = (index: number) => {
        if(giftNames){
            handleSearchInputCallBack(giftNames[index].name)
        }
    }

    // начать поиск по слову
    const handleSubmit = () => {
        handleSearchSubmitCallBack(searchInput)
    }


    // задержка для добавления z-index
    

    return(
        <div className="searchBarBig">
            <div className={inputShow? "searchBarBig_bar show" : "searchBarBig_bar"}>
                <img src={search} alt="search" />

                <input type="text" placeholder='Введіть назву подарунку' value={searchInput} onFocus={handleInputFocus} onBlur={handleUnFocus} onKeyDown={(event) => {handleSpecialKeyDown(event)}} onChange={(event) => handleChangeInput(event)}/>

                <button onClick={handleSubmit}>Пошук</button>

                {inputFocus && giftNames && giftNames.length > 0 && <div className="searchBarBig_results">
                    {giftNames && giftNames.length > 0 && giftNames.map((data, index) => (
                        <button key={index} className={index === chosenResultIndex? "active": ""} onMouseDown={() => handleResultClick(index)}>{data.name}</button>
                    ))}

                </div>}

            </div>

            <div className={inputFocus? "searchBig_bar_Background show" : "searchBig_bar_Background"}></div>

            <button onClick={handleRandomGiftCallBack}><img src={random} alt="random"/></button>
        </div>
    )
}

export default SearchBarBig