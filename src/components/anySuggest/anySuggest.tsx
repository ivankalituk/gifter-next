import { FC } from "react";

import './anySuggest.scss'
import Link from "next/link";

import sampleAvatar from '@/assets/images/logoSample.jpg'
import sampleGift from '@/assets/images/Sample Gift Photo.png'
import Account from "../account/account";
import { useUpdateRequest } from "@/hooks/useUpdateRequest";
import { deleteSuggest } from "@/api/suggest";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@/interfaces/interface";
import { useRouter } from "next/router";

interface AnySuggestInterface{
    data: any,
    handleDeleteSuggestCallBack: (id: number) => void
}

const AnySuggest: FC <AnySuggestInterface>= ({data, handleDeleteSuggestCallBack}) => {

    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)

    const router = useRouter()

    const {mutatedFunc: deleteSuggestFunc} = useUpdateRequest({fetchFunc: deleteSuggest})

    // лень переделывать стили ссылки
    const handleChangeLink = () =>{
        router.push('/adminPanel/suggests/submit/' + data.id)
    }

    const handleDelete = () => {
        if(user.user_role && user.user_role >= 2){
            handleDeleteSuggestCallBack(data.id)
            // также сделать удаление 
            deleteSuggestFunc({suggest_id: data.id})
        } else {
            alert("Ви не маєте достатнього рівня допуску")
        }
    }

    return(
        <div className="suggest">

            <Account user_id={data.user_id} date={data.addDate}/>

            <div className="suggest_comment">{data.content}</div>

            <div className="suggest_gift">
                {/* тут должен быть имедж, название подарка и теги */}

                {data.photoPath !== null && <img src={'http://localhost:1000/' + data.photoPath} alt="giftPhoto" />}

                <div className="suggest_gift_name">{data.name}</div>

                {data.tags !== null && data.tags.length > 0 &&<div className="suggest_gift_tags">
                    {data.tags.map((tag: string, index: number) => (
                        <div className="suggest_gift_tag" key={index}>{tag}</div>
                    ))}

                </div>}

            </div>

            <div className="suggest_buttons">
                <button className="button_preset" onClick={handleChangeLink}>Редактор</button>
                <button className="button_preset" onClick={handleDelete}>Відмовити</button>
            </div>
        </div>
    )
}

export default AnySuggest