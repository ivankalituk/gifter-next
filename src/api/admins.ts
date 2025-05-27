import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL

// получение пользователей для поиска за почтой
export async function getAdminsByEmailFragment(data:any) {
    try{
        const response = await axios.post(serverUrl + '/admins', {email: data.email});
        return response.data
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}

export async function getAdminsDataByEmailFragment(data:any) {
    try{
        const response = await axios.post(serverUrl + '/admins/email', {email: data.email});
        return response.data
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}

export async function patchAdminLevel(data:any) {
    try{
        const response = await axios.put(serverUrl + '/admins/leveling', {user_id: data.user_id, operation: data.operation});
        return response.data
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}

// добавить админа
export async function insertAdmin(data:any) {
    try{
        await axios.post(serverUrl + '/admin', {user_id: data.user_id});
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}