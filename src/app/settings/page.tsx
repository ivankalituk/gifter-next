"use client"

import React, { FC, useEffect, useState } from "react";
import './settingsPage.scss'

import insertPhoto from '@/assets/images/insertPhoto.svg'
import editPen from '@/assets/images/editPen.svg'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, Tag } from "@/interfaces/interface";
import { clearUser, setUser, setUserImgPath, setUserNickname } from "@/redux/userSlice";
import SearchBar from "@/components/searchBar/searchBar";
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getTagByInput } from "@/api/tags";
import { useUpdateRequest } from "@/hooks/useUpdateRequest";
import { getUserTags, putUserBio, putUserNickname, putUserPhoto, putUserTags } from "@/api/user";
import { createSuggest } from "@/api/suggest";
import { useRouter } from "next/navigation";
import Image from "next/image";
// СМЕНА НИКА +
// СМЕНА АВЫ +
// СМЕНА ТЕГОВ ПОЛЬЗОВАТЕЛЯ 
// СМЕНА БИО
// МОЖНО ЛИ ОТОБРАЖАТЬ ИСПОЛЬЗОВАННЫЕ ТЕГИ (МБ УБРАТЬ) -
// ВЫХОД ИЗ АККАУНТА



const SettingsPage: FC = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)


    // ---------------
    // IMAGE UPLOAD
    // ---------------

    const [selectedImgFile, setSelectedImgFile] = useState<any>(null)           //сохранение файла фото
    const [selectedImg, setSelectedImg] = useState<any>(null)                   //сохранение ссылки на файл фото

    const {mutatedFunc: changeUserPhoto} = useUpdateRequest({fetchFunc: putUserPhoto})

    const handleImageUpload = async(event: any) => {
        const file = event.target.files[0]
        setSelectedImgFile(file)
    
        const reader = new FileReader()
        reader.onload = () => {
            setSelectedImg(reader.result)
        }
        reader.readAsDataURL(file)

    
        const imgData = new FormData()
        imgData.append('user_id', String(user.user_id))
        imgData.append('image', file) // Используй `file`, а не `selectedImgFile`
    
        await changeUserPhoto(imgData) // Ожидаем завершения запроса
    }
    
    // ---------------
    // NICKNAME CHANGE
    // ---------------

    const [nichnameChange, setNicknameChange] = useState<boolean>(false)
    const [nicknameInput, setNicknameInput] = useState<string>('')

    const {mutatedFunc: changeName} = useUpdateRequest({fetchFunc: putUserNickname})

    const handleNicknameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNicknameInput(event.target.value)
    }

    const handleNicknameChange = () => {
        setNicknameChange(true)
    }

    const handleNicknameSubmit = async () => {
        changeName({nickname: nicknameInput, user_id: user.user_id})
        dispatch(setUserNickname({user_nickName: nicknameInput}))
        setNicknameChange(false)
    }

    // ---------------
    // BIO CHANGE
    // ---------------

    const [bioArea, setBioArea] = useState<string>('')
    
    const {mutatedFunc: changeBio} = useUpdateRequest({fetchFunc: putUserBio})

    const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBioArea(event.target.value)
    }

    const handleBioSubmit = () => {
        setBioArea('')
        changeBio({bio: bioArea, user_id: user.user_id})
    }

    // ---------------
    // ACCOUNT EXIT
    // ---------------

    const handleAccountExit = () =>{
        localStorage.setItem('access_token', '')
        dispatch(clearUser())
        router.push('/')
    }

    // ---------------
    // USER TAG LIST
    // ---------------

    // получение уже созданных тегов
    const {data: initialTags, isFetched: initialTagsFetched} = useGetRequest({fetchFunc: ()=> getUserTags({user_id: user.user_id}), enabled: true, key: [1]})

    const [tagInput, setTagInput] = useState<string>('')
    const [tagInputEnabled, setTagInputEnabled] = useState<boolean>(true)
    const [tagInputKey, setTagInputKey] = useState(1)

    const {data: tags, isFetched: tagsFetched} = useGetRequest<Tag[]>({fetchFunc: () => getTagByInput({text: tagInput}), enabled: tagInputEnabled, key: [tagInputKey]})

    const handleTagInputCallBack = (text: string) => {
        setTagInput(text)
        setTagInputKey(tagInputKey + 1)
    }

    const handleTagInputSubmitCallBack = (text: string) =>{
        handleAddUserTag(text)
    }
    
    const [userTags, setUserTags] = useState<string[]>(initialTags || [])

    // Обновляем состояние tags, когда initialTagsFetched становится true и initialTags меняются
    useEffect(() => {
        if (initialTagsFetched && initialTags) {
            setUserTags(initialTags); // Устанавливаем начальные теги
        }
    }, [initialTagsFetched, initialTags]); 

    const handleAddUserTag = (tag: string) => {
        if (!userTags.includes(tag)){
            setUserTags(prevTags => [... prevTags, tag])
        }
    }

    const handleRemoveUserTag = (tag: string) =>{
        setUserTags(prevTags => userTags.filter(filtredTag => filtredTag !== tag) )
    }

    const {mutatedFunc: changeTags} = useUpdateRequest({fetchFunc: putUserTags})

    const handleTagsSubmit = () => {
        changeTags({tags: userTags, user_id: user.user_id})
    }

    return(
        <div className="settingsPage">
            <div className="settingsPage_container">
                <div className="settingsPage_settingsPanel">

                    <div className="settingsPage_settingsPanel_imgUpload">
                        
                        <Image src={selectedImg? selectedImg : user.user_imgUrl? 'http://localhost:1000/' + user.user_imgUrl : null} alt="insertPhoto" fill />

                        <div className="settingsPage_settingsPanel_imgUpload_inputGroup">
                            <Image src={insertPhoto} alt="insertPhoto" />
                            <input type="file" onChange={handleImageUpload} />
                        </div>
                    </div>

                    <div className="settingsPage_nameChange">
                        
                        {!nichnameChange && <div className="settingsPage_nameChange_initial">
                            <span>{user.user_nickName}</span>
                            <button onClick={handleNicknameChange}><Image src={editPen} alt="edit" /></button>
                        </div>}

                        {nichnameChange && <div className="settingsPage_nameChange_change">
                            <input type="text" className="inputText_preset" placeholder="Введіть нікнейм" value={nicknameInput} onChange={(event) => handleNicknameInput(event)}/>
                            <button className="button_preset" onClick={handleNicknameSubmit}>Submit</button>
                        </div>}

                    </div>

                    <div className="settingsPage_bioChange">
                        
                        <textarea  className="textArea_preset" placeholder="Біо" value={bioArea} onChange={handleBioChange}></textarea>

                        <button className="button_preset" onClick={handleBioSubmit}>Підтвердити</button>
                    </div>

                    <div className="settingsPage_tagsChange">
                        <SearchBar searchInput={tagInput} handleSearchInputCallBack = {handleTagInputCallBack} results = {tags} resultsFetched = {tagsFetched} handleSearchInputSubmitCallBack = {handleTagInputSubmitCallBack}/>
                        
                        <div className="settingsPage_tagsChange_tagList">
                            {initialTagsFetched && userTags.length > 0 && userTags.map((tag: string, index: number) => (
                                <button key={index} onClick={() => handleRemoveUserTag(tag)}>{tag}</button>
                            ))}
                        </div>

                        <button className="button_preset" onClick={handleTagsSubmit}>Підтвердити</button>
                    </div>

                    <div className="settingsPage_accountExit">
                        <button className="button_preset" onClick={handleAccountExit}>ВИЙТИ З АККАУНТУ</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SettingsPage