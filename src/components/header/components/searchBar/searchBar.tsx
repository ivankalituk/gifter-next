import './searchBar.scss'

import { ChangeEvent, FC, useState } from "react";

import search from '@/assets/images/Search.svg'
import random from '@/assets/images/Random.svg'
import { useGetRequest } from '@/hooks/useGetReuquest';
import { getGiftNameByName } from '@/api/gifts';
import { giftName } from '@/interfaces/interface';

interface SearchBarInterface{
    nameSearchCallBack: (name: string) => void
}

const SearchBar: FC<SearchBarInterface> = ({nameSearchCallBack}) =>{

    const [searchInput, setSearchInput] = useState<string>('')

    // получение готовых названий 
    const [namesKey, setNamesKey] = useState<number>(1)

    const {data: names, isFetched: namesFetched} = useGetRequest<giftName[] | undefined>({fetchFunc: () => getGiftNameByName(searchInput), key: [namesKey], enabled: true})

    // сохранение результата поиска
    const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value)
        setNamesKey(namesKey + 1)
    }

    // применение поиска
    const handleSearchInput = () => {
        nameSearchCallBack(searchInput)
    }

    // заполнение в сёрчбар по нажатию на возможный результат
    const handleSearchResult = (text: string) => {
        setSearchInput(text)
    }

    return(
        <div className="searchBar">
            <div className="searchBar_bar">
                <img src={search} alt="search" />

                <input type="text" placeholder='Введіть назву подарунку' value={searchInput} onChange={(event) => handleSearchInputChange(event)}/>

                <button onClick={handleSearchInput}>Пошук</button>

                {names && names.length > 0 && <div className="searchBar_results">
                    {names && names.length > 0 && namesFetched && names.map((data, index) => (
                        <button key={index} onClick={() => handleSearchResult(data.name)}>{data.name}</button>
                    ))}

                </div>}
            </div>

            <button><img src={random} alt="random"/></button>
        </div>
    )
}

export default SearchBar