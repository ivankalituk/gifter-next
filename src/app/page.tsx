"use client"
import styles from '@/app/main.module.scss'
import Image from 'next/image';
import file from '../../public/file.svg'
import Header from '@/components/header/header';
import { useState } from 'react';
import Filters from './components/filters/filters';
import Selector from './components/selector/selector';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@/interfaces/interface';
import { useGetRequest } from '@/hooks/useGetReuquest';
import { Gift } from '@/interfaces/interface';
import { getAllGiftsByTags } from '@/api/gifts';
import GiftCard from '@/components/giftCard/giftCard';

interface MainPageInterface {
    scrollCallback: (block: boolean)=> void
    nameSearch: string
    deleteSearchCallBack: () => void
}

export default function Home() {

    // блокировка скролла
  const [blockScroll, setBlockScroll] = useState<boolean>(false)

  const scrollCallback = (block: boolean) =>{
    setBlockScroll(block)
  }

  // для поиска по названию подарка
  const [nameSearch, setNameSearch] = useState<string>('')

  const nameSearchCallBack = (name: string) => {
    setNameSearch(name)
  }

    const [filtersOpen, setFiltersOpen] = useState<boolean>(true)

    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)

    const handleFiltersOpen = () =>{
        setFiltersOpen(!filtersOpen)
        // scrollCallback(filtersOpen)
    }

    const [page, setPage] = useState<number>(1)         //номер страницы

    const [giftKey, setGiftKey] = useState<number>(1)
    const [giftTags, setGiftTags] = useState<string[]>([])

    const [selector, setSelector] = useState<string>('За датою')              //селектор за датой, за названием, за рейтингом

    // НЕ ТОЛЬКО ТЕГИ НО И ФИЛЬТРЫ И ТЕКСТ
    const {data: gifts, isFetched: giftsFetched} = useGetRequest<Gift[] | undefined>({fetchFunc: () => getAllGiftsByTags(giftTags, selector, 'nameSearch', user.user_id !== null? user.user_id : 0, page), key: [giftKey], enabled: true})

    // следующая страица
    const handleNextPage = () => {
        setPage(page + 1)
        setGiftKey(giftKey + 1)
    }

    // предьидущая страница
    const handlePrevPage = () => {
        if (page !== 1){
            setPage(page - 1)
            setGiftKey(giftKey + 1)
        }
    }

    // колбек для селектора
    const selecrotCallBack = (selectedSelector: string) => {
        setSelector(selectedSelector)
        setPage(1)
        setGiftKey(giftKey + 1)
    }

    // колбек на применение фильтров
    const filtersCallBack = (tags: string[]) => {
        // сначала добавить новые фильтры, потом обновить ключ
        setGiftTags(tags)
        setPage(1)
        setGiftKey(giftKey + 1)
    }
  

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
    console.log(serverUrl)

  return (
    <div className={styles.app}>
      <Header scrollCallback = {scrollCallback} nameSearchCallBack={nameSearchCallBack}/>
          <div className={styles.mainPage}>
            <div className={styles.mainPage_container}>

                <Filters filtersOpen = {filtersOpen} handleFiltersOpen ={handleFiltersOpen} filtersCallback = {filtersCallBack} nameSearch = {nameSearch}/>

                <div className={styles.mainPage_giftContent}>

                    <Selector handleFiltersOpen ={handleFiltersOpen}  selecrotCallBack = {selecrotCallBack}/>

                    {giftsFetched && <div className={styles.mainPage_giftContent_giftList}>
                        {gifts !== null && gifts !== undefined && gifts.map((data: any, index:number) => (<GiftCard scrollCallback = {scrollCallback} key={index} data={data}/>))}
                    </div>}

                    <div className={styles.mainPage_giftContent_pageSwich}>
                        <button className="button_preset" onClick={handlePrevPage}>Назад</button>
                        <div>{page}</div>
                        <button className="button_preset"onClick={handleNextPage}>Вперед</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
