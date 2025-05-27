"use client"
import styles from '@/app/main.module.scss'
import Image from 'next/image';
import file from '../../public/file.svg'
import Header from '@/components/header/header';
import { useState } from 'react';

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


  return (
    <div className={styles.app}>
      <Header scrollCallback = {scrollCallback} nameSearchCallBack={nameSearchCallBack}/>
    </div>
  );
}
