"use client"
import { FC, use, useEffect, useState } from "react";
import Link from "next/link";

import profilePhoto from "@/assets/images/logoSample.jpg"

import '../profilePage.scss'
import MarkedList from "../components/markedList/markedList";
import GiftCard from "@/components/giftCard/giftCard";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Gift, RootState } from "@/interfaces/interface";
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getAllGiftsByCreatorId } from "@/api/gifts";
import { getUserBio, getUserById, getUserTags } from "@/api/user";
import tick from '@/assets/images/tick.svg'
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface ProfilePageProps  {
  params: Promise<{ user_id: string }>
}

const ProfilePage: FC <ProfilePageProps>= ({params}) => {

    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)

    const { user_id } = use(params)
    const type:string = "anyUser"
    
    const {data: gifts, isFetched: giftsFetched} = useGetRequest<Gift[] | undefined>({fetchFunc:  () => getAllGiftsByCreatorId(type === "anyUser"? Number(user_id) : user.user_id, user.user_id !== null? user.user_id : 0), enabled: true, key: [1]})

    const {data: bio, isFetched: bioFetched} = useGetRequest<any>({fetchFunc:  () => getUserBio({user_id: (type === "anyUser"? Number(user_id) : user.user_id)}), enabled: true, key: [1]})
    const {data: tags, isFetched: tagsFetched} = useGetRequest<any>({fetchFunc:  () => getUserTags({user_id: (type === "anyUser"? Number(user_id) : user.user_id)}), enabled: true, key: [1]})

    // для захода пользователя на чужой аккаунт
    const {data: account, isFetched: accountFetched} = useGetRequest<any>({fetchFunc: ()=> getUserById({user_id: user_id}), enabled: (type == "anyUser"? true: false), key: [1]})

    // ------------------------------------
    // DropDown список для мобильной версии
    // ------------------------------------

    const [dropMenu, setDropMenu] = useState<boolean>(false)

    const handleDropMenu = () => {
        setDropMenu(!dropMenu)
    }

    return(
        <div className="profilePage">
            <div className="profilePage_leftColumn">

                <div className="profilePage_leftColumn_avatar_container">
                    {type === "privateUser" && <Image className="profilePage_leftColumn_avatar" src={user.user_imgUrl? 'http://localhost:1000/' + user.user_imgUrl :profilePhoto} alt="profile photo" />}
                    {type !== "privateUser" && accountFetched && <Image className="profilePage_leftColumn_avatar" src={account[0].imgPath? 'http://localhost:1000/' + account[0].imgPath :profilePhoto} alt="profile photo" fill/>}
                </div>

                {type === "privateUser" && <div className="profilePage_leftColumn_nickname">{user.user_nickName}</div>}
                {type !== "privateUser" && accountFetched && <div className="profilePage_leftColumn_nickname">{account[0].nickname}</div>}

                {bioFetched && bio[0].bio !== null && <div className="profilePage_leftColumn_description">
                    <div className="profilePage_leftColumn_description_heading">Біо:</div>
                    <div className="profilePage_leftColumn_description_text">{bio[0].bio}</div>
                </div>}

                {tagsFetched && tags !== null && tags.length > 0 && <div className="profilePage_leftColumn_usedTags">
                        <div className="profilePage_leftColumn_usedTags_heading">Використані теги</div>

                        <div className="profilePage_leftColumn_usedTags_tags">
                            {tags.map((tag: string, index: number) => (
                                <div key={index}>{tag}</div>
                            ))}
                        </div>
                    </div>}

                {type == 'privateUser' && <Link className="link_button" href={'/settings'}>Налаштування</Link>}
                {type == 'privateUser' && <Link href={'/suggest'} className="link_button">Запропонувати</Link>}
                {type == 'privateUser' && <Link className="link_button" href={'/adminPanel/suggests'}>Адмін панель</Link>}
                {type == 'privateUser' && <Link className="link_button" href={'/profile/bookmarks'}>Закладки</Link>}
                
            </div>

            <div className="profilePage_rightColumn">
                
                <div className="profilePage_rightColumn_info">
                
                    <div className="profilePage_rightColumn_accountInfo">
                        <Image src={user.user_imgUrl? 'http://localhost:1000/' + user.user_imgUrl :profilePhoto} alt="avatar" />

                        <div className="profilePage_rightColumn_accountInfo_info">
                            <div>{user.user_nickName}</div>
                        </div>
                    </div>
                        
                        <div className={`profilePage_rightColumn_drop ${dropMenu ? 'open' : ''}`}>

                            <div className="profilePage_rightColumn_description">
                                <div className="profilePage_rightColumn_description_heading">Біо:</div>

                                {bioFetched && bio && <div className="profilePage_rightColumn_description_text">{bio[0].bio}</div>}
                            </div>

                            {tagsFetched && tags.length > 0 && <div className="profilePage_rightColumn_usedTags">
                                <div className="profilePage_rightColumn_usedTags_heading">Використані теги</div>

                                <div className="profilePage_rightColumn_usedTags_list">
                                    {tags.map((tag: string, index: number) => (
                                        <div key={index}>{tag}</div>
                                    ))}
                                </div>
                            </div>}

                            <div className="profilePage_rightColumn_addedTags">
                                <div className="profilePage_rightColumn_addedTags_heading">Додані теги:</div>

                                <div className="profilePage_rightColumn_addedTags_tags">
                                    <div>#Гітара</div>
                                    <div>#Велосипед</div>
                                    <div>#ЗадняДупа</div>
                                    <div>#Мешуга</div>
                                    <div>#Переднядупа</div>
                                    <div>#ПередняДупа</div>
                                    <div>#Комп'ютери</div>
                                    <div>#Робота</div>
                                    <div>#РоботаДупою</div>
                                    <div>#Дупа</div>
                                    <div>#Погода</div>
                                    <div>#Погода</div>
                                </div>
                            </div>
                        </div>

                        <div className="profilePage_rightColumn_addedTags">
                                <div className="profilePage_rightColumn_addedTags_heading">Додані теги:</div>

                                <div className="profilePage_rightColumn_addedTags_tags">
                                    <div>#Гітара</div>
                                    <div>#Велосипед</div>
                                    <div>#ЗадняДупа</div>
                                    <div>#Мешуга</div>
                                    <div>#Переднядупа</div>
                                    <div>#ПередняДупа</div>
                                    <div>#Комп'ютери</div>
                                    <div>#Робота</div>
                                    <div>#РоботаДупою</div>
                                    <div>#Дупа</div>
                                    <div>#Погода</div>
                                    <div>#Погода</div>
                                </div>
                        </div>

                    <div className="profilePage_rightColumn_tick" onClick={handleDropMenu}>
                        <Image src={tick} alt="tick" style={dropMenu? {rotate: '-180deg', transition: '0.5s'} : { transition: '0.5s'}}/>
                    </div>
                </div>


                <div className="profilePage_rightColumn_gifts">
                    {type == 'privateUser' && <Link href={'/suggest'} className="link_button">Запропонувати</Link>}

                    <div className="profilePage_rightColumn_gifts_list">
                        {gifts && giftsFetched && gifts.map((data, index) => (
                            
                            <GiftCard data = {data} key={index} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProfilePage