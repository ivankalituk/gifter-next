"use client"
import { FC } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, UserState } from '@/interfaces/interface';
import { setUser } from '@/redux/userSlice';
import axios from 'axios';
import './authPage.scss'
import { useRouter } from "next/navigation";

const AuthPage: FC = () => {

    const dispatch = useDispatch()
    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)
    const router = useRouter()

    const login = useGoogleLogin({
        onSuccess: async (data) =>{
            localStorage.setItem('access_token', data.access_token)

            const response = await axios.post('http://localhost:1000/user', {access_token: data.access_token});
            const res = response.data

            // получение инфы и занос её в редакс
            const  newUser: UserState = {
                user_nickName: res[0].nickname,
                user_imgUrl: res[0].imgPath,
                user_role: res[0].role,
                user_id: res[0].id,
                user_email: res[0].email,
                user_blocked: res[0].blocked
            }

            dispatch(setUser(newUser))
            // window.location.assign('/')
            router.push('/profilePage')
        },

        onError: (error) => {
            console.error(error)
        }
    })

    const handleLogIn = () => {
        login()
    }

    return(
        <div className="authPage">
            <div className="authPage_container">
                <div className="authPage_auth">
                    <button onClick={handleLogIn} disabled = {user.user_email? true : false}>Авторизація</button>
                </div>
            </div>
        </div>
    )
}

export default AuthPage