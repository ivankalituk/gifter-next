import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './giftCard.scss'

import sampleGiftPhoto from '@/assets/images/Sample Gift Photo.png'
import dots from '@/assets/images/three dots.svg'
import mark from '@/assets/images/markGrey.svg'
import starGrey from '@/assets/images/StarGrey.svg'
import starYellow from '@/assets/images/StarYellow.svg'

import ModalReport from "@/components/giftCard/components/modalReport/modalReport";
import ModalGift from "@/components/modalGift/modalGift";
import Modal from "@/components/modal/modal";
import { useUpdateRequest } from "@/hooks/useUpdateRequest";
import { toggleBookmark } from "@/api/bookmarks";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@/interfaces/interface";

interface GiftCardInterface  {
    scrollCallback: (block: boolean) => void
    data: any
}

const GiftCard: FC <GiftCardInterface> = ({scrollCallback, data}) =>{

    const [additional, setAditional] = useState<boolean>(false)                     //для отображение доп функций (три точки)
    const [report, setReport] = useState<boolean>(false)                            //для открытия модального репорта
    const [giftModal, setGiftModal] = useState<boolean>(false)                      //отображение модального окна подарка

    // открытие модального подарка
    const handleGiftModalOpen = () =>{
        setGiftModal(true)
        scrollCallback(true)
    }

    // колбек для закрытия модального подарка
    const handleGiftModalClose = () =>{
        setGiftModal(false)
        scrollCallback(false)
    }

    // открытие модального репорта
    const handleReportOpen = () =>{
        setReport(true)
        scrollCallback(true)
        handleAdditional()
    }

    // колбек для закрытия модального репорта
    const handleReportClose = () => {
        setReport(false)
        scrollCallback(false)
    }


    // для отображения дополнительных (три точки)
    const handleAdditional = () => {
        setAditional(!additional)
    }

    // ----------------------------
    // тогл для отмеченных подарков
    // ----------------------------

    const {mutatedFunc: setBookmark} = useUpdateRequest({fetchFunc: toggleBookmark})

    const [marked, setMarked] = useState<boolean>(data.marked)      //Отмеченный подарок

    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)

    // отметить подарок (марк)
    const handleMarked = async () => {
        if(user.user_email !== null){
            await setBookmark({user_id: user.user_id, gift_id: data.id})
            setMarked(!marked)
        } else {
            alert("Ви не зареєстровані!!!")
        }
        
    }

    return(
        <div className="giftCard">

            <div className="giftCard_container">

                <div className="giftCard_inner">
                    <img src={data.photoPath? 'http://localhost:1000/' + data.photoPath : sampleGiftPhoto} alt="Gift photo" />
                    
                    <div className="giftCard_name" onClick={handleGiftModalOpen}>{data.name}</div>

                    <div className="giftCard_reating" onClick={handleGiftModalOpen}>
                        <div className="giftCard_reating_stars">
                            <img src={starGrey} alt="star" />
                            <img src={starGrey} alt="star" />
                            <img src={starGrey} alt="star" />
                            <img src={starGrey} alt="star" />
                            <img src={starGrey} alt="star" />
                        </div>

                        <div className="giftCard_reating_reating" style={data.reating !== null? {width: data.reating*20 +'%'} : {width: '0%'}} >
                            <img src={starYellow} alt="star" />
                            <img src={starYellow} alt="star" />
                            <img src={starYellow} alt="star" />
                            <img src={starYellow} alt="star" />
                            <img src={starYellow} alt="star" />
                        </div>
                    </div>

                    <div className="giftCard_views">{data.userViews} перегляди</div>

                    <div className="giftCard_tags">
                        {data.tags.length > 0 && data.tags && data.tags.map((tag: string, index:number) => (
                            <div className="giftCard_tags_tag" key={index}>{tag}</div>
                        ))}
                    </div>

                </div>

                <div className="giftCard_additional">
                    <div className="giftCard_additional_container">
                        <img src={dots} alt="dots" onClick={handleAdditional} />

                        <button className={additional? 'active' : 'disabled'} onClick={handleReportOpen}>Поскаржтись</button>
                    </div>
                </div>

                <div className="giftCard_mark"><img src={mark}  alt="mark" className={marked? "active": ""} onClick={handleMarked}/></div>
            </div>

            {report && <Modal onClose = {handleReportClose} Component={ModalReport} modalProps={{gift_id: data.id}} scrollCallback = {scrollCallback}/>}

            {giftModal && <Modal onClose = {handleGiftModalClose} Component={ModalGift} modalProps={{gift_id: data.id}} scrollCallback = {scrollCallback}/>}
        </div>
    )
}

export default GiftCard