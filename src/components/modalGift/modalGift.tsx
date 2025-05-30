import { getGiftById, getUserGiftMark, setUserGiftMark } from '@/api/gifts';
import './modalGift.scss'

import sampleGiftPhoto from '@/assets/images/Sample Gift Photo.png'
import sampleAvatar from '@/assets/images/logoSample.jpg'
import { useGetRequest } from '@/hooks/useGetReuquest';

import { FC, useEffect, useState } from "react";
import { getUserById } from '@/api/user';

import starYellow from '@/assets/images/StarYellow.svg'
import starGrey from '@/assets/images/StarGrey.svg'
import starRed from '@/assets/images/StarRed.svg'
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@/interfaces/interface';
import { useUpdateRequest } from '@/hooks/useUpdateRequest';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ModalGiftInterface {
    handleGiftModalClose: () => void
    modalProps: any
}

const ModalGift: FC <ModalGiftInterface>= ({modalProps}) => {

    const serverUrl = process.env.REACT_APP_API_URL

    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)

    // -----------------
    // получение подарка
    // -----------------

    const {data: gift, isFetched: giftFetched} = useGetRequest({fetchFunc: () => getGiftById({gift_id: modalProps.gift_id}), enabled: true, key: []})

    // ---------------------------
    // получение создателя подарка 
    // ---------------------------

    const [user_id, setUser_id] = useState<number>(-1)
    const [userKey, setUserKey] = useState<number>(1)
    const [userEnabled, setUserEnabled] = useState<boolean>(false)

    // получение рейтинга пользователя
    const [userReatingKey, setUserReatingKey] = useState<number>(1)
    const [userReatingEnabled, setUserReatingEnabled] = useState<boolean>(false)
    const {data: userReating, isFetched: userReatingFetched} = useGetRequest({fetchFunc: ()=> getUserGiftMark({gift_id: modalProps.gift_id, user_id: user.user_id}), key: [userReatingKey], enabled: userReatingEnabled})

    useEffect(() => {
        if(gift && giftFetched){
            setUser_id(gift[0].creatorId)
            setUserEnabled(true)
            setUserKey(userKey + 1)
            setUserReatingEnabled(true)
            setUserReatingKey(userReatingKey + 1)
        }
    }, [gift, giftFetched])

    const {data: creator, isFetched: creatorFetched} = useGetRequest({fetchFunc: () => getUserById({user_id: user_id}), enabled: userEnabled, key: [userKey]})

    // ----------------------
    // ссылка на пользователя
    // ----------------------

    const router = useRouter()

    const handleLinkToUser = () => {
        router.push('/profilePage/' + creator[0].id)
    }

    // --------------
    // смена рейтинга
    // --------------

    const [hoverStarIndex, setHoverStarIndex] = useState<number | null>(null)
    const [starReating, setStarReating] = useState<number>(0)

    const {mutatedFunc: setReating} = useUpdateRequest({fetchFunc: setUserGiftMark})

    const handleMouseEnter = (index: number) => {
        setHoverStarIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverStarIndex(null);
    };


    useEffect(() => {
        if (userReating && userReatingFetched){
            setStarReating(userReating.mark)
        }
    }, [userReating, userReatingFetched])

    const handleNewReating = (index: number) => {
        if(user.user_email !== null){
            if(user.user_blocked){
                alert('ВИ ЗАБЛОКОВАНІ !!!')
            } else {
                setReating({old_reating: starReating, new_Reating: index + 1, gift_id: modalProps.gift_id, user_id: user.user_id})
        
                setStarReating(index + 1)
            }
        } else {
            alert('Ви не зареєстровані')
        }
    }


    return (
        <div className="modalGift">
            {giftFetched && <div className="modalGift_container">
                <img src={'http://localhost:1000/' + gift[0].photoPath} alt="giftPhoto" />
                
                <div className="modalGift_content customScrollbar">
                    <div className="modalGift_name">{gift[0].name}</div>

                    {creatorFetched && creator.length >  0 && <div onClick={handleLinkToUser} className="modalGift_creator">
                        <img src={'http://localhost:1000/' + creator[0].imgPath} alt="userAvatar" />
                        
                        <div className="modalGift_creator_name">{creator[0].nickname}</div>
                    </div>}

                    <div className="modalGift_reating">
                        <div className="modalGift_reating_stars">
                            <Image src={starGrey} alt="star" />
                            <Image src={starGrey} alt="star" />
                            <Image src={starGrey} alt="star" />
                            <Image src={starGrey} alt="star" />
                            <Image src={starGrey} alt="star" />
                        </div>

                        <div className="modalGift_reating_reating" style={gift[0].reating !== null? {width: gift[0].reating*20 +'%'} : {width: '0%'}} >
                            <Image src={starYellow} alt="star" />
                            <Image src={starYellow} alt="star" />
                            <Image src={starYellow} alt="star" />
                            <Image src={starYellow} alt="star" />
                            <Image src={starYellow} alt="star" />
                        </div>
                            
                        <div className="modalGift_reating_change">
                            {[...Array(5)].map((_, index: number) => (
                                <Image
                                    src={starRed}
                                    alt="star"
                                    key={index}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                    style={{opacity: hoverStarIndex !== null? (index <= hoverStarIndex? 1 : 0) : (index < starReating? 1 : 0)}}
                                    onClick={() => handleNewReating(index)}
                                />
                            ))}
                        </div>
                    </div>
                    
                    <div className="modalGift_views">{gift[0].userViews} переглянуло</div>

                    <div className="modalGift_tags">
                        {gift[0].tags.length > 0 && gift[0].tags.map((tag: string, index: number) =>(
                            <div className="modalGift_tags_tag" key={index}>{tag}</div>
                        ))}
                    </div>


                </div>


            </div>}
        </div>
    )
}

export default ModalGift