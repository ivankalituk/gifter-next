import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import './account.scss'

import sampleAvatar from '@/assets/images/logoSample.jpg'
import options from '@/assets/images/three dots.svg'
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getUserById } from "@/api/user";
import { useUpdateRequest } from "@/hooks/useUpdateRequest";
import { insertAdmin } from "@/api/admins";
import { insertBlacklist } from "@/api/blacklist";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@/interfaces/interface";

interface Account {
    user_id: number,
    date: string
}

const Account: FC <Account>= ({user_id, date}) => {

    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const admin = useTypeSelector((state) => state.user)

    // -------------------
    // данные пользователя
    // -------------------

    const {data: user, isFetched: userFetched} = useGetRequest({fetchFunc: () => getUserById({user_id: user_id}), enabled: true, key: []})
    
    // --------------------------------------------------------
    // открыть дополнительные настройки (добавление админа, чс)
    // --------------------------------------------------------
    
    const [additional, setAditional] = useState<boolean>(false)

    const handleAdditional = () => {
        setAditional(!additional)
    }

    // ----------------------------------------------------------------
    // отловить нажатие для создания админа и занесения в чёрный список
    // ----------------------------------------------------------------

    const {mutatedFunc: createAdmin} = useUpdateRequest({fetchFunc: insertAdmin})

    const {mutatedFunc: createBlacklist} = useUpdateRequest({fetchFunc: insertBlacklist})

    const handleBlacklist = () => {
        if(admin.user_role && admin.user_role >= 1){
        handleAdditional()
        createBlacklist({user_id: user_id})
        } else {
            alert("Ви не маєте достатнього рівня допуску")
        }
    }

    const handleAdminPromote = () => {
        if(admin.user_role && admin.user_role == 3){
            handleAdditional()
            createAdmin({user_id: user_id})
        } else {
            alert("Ви не маєте достатнього рівня допуску")
        }
    }

    return(
        <>
            {userFetched && user.length > 0 &&<div className="account">
                {userFetched && user && <Link href={'/account/' + user_id} className="account_profile">
                    <Image src={user[0].imgPath !== null? 'http://localhost:1000/' + user[0].imgPath : sampleAvatar} alt="avatar" />

                    <div className="account_profile_info">
                        <div className="account_profile_nickname">{user[0].nickname}</div>
                        <div className="account_profile_data">{date}</div>
                    </div>
                </Link>}

                <div className="account_additional">
                        <div className="account_additional_container">
                            <img src={options} alt="dots" onClick={handleAdditional} />
                            
                            <div className={additional? "account_additional_buttons active" : 'account_additional_buttons disabled'}>
                                <button className={additional? 'active' : 'disabled'} onClick={handleAdminPromote}>Зробити адміном</button>
                                <button className={additional? 'active' : 'disabled'} onClick={handleBlacklist}>Додати в ЧС</button>
                            </div>
                        </div>
                    </div>
            </div>}
        </>
    )
}

export default Account