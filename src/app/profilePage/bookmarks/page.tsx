"use client"
import { FC } from "react";
import './bookmarksPage.scss'
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getUserBookmarks } from "@/api/bookmarks";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@/interfaces/interface";
import GiftCard from "@/components/giftCard/giftCard";



// Сделать сетку подарков, которые были отмеченныеми, если подарку убрать отмеченность, то он остаётся до обновления страницы

const BookmarksPage: FC = () =>{

    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)

    const{data: bookmarks, isFetched: bookmarksFetched} = useGetRequest({fetchFunc: () => getUserBookmarks({user_id: user.user_id}), key: [], enabled: true})

    return(
        <div className="bookmarksPage">
            <div className="bookmarksPage_heading">Відмічені подарунки</div>

            <div className="bookmarksPage_list">
                {bookmarksFetched && bookmarks.length > 0 && bookmarks.map((data: any, index: number) => (
                    <GiftCard data = {data} key = {index}/>
                ))}    
            </div>
        </div>
    )
}

export default BookmarksPage