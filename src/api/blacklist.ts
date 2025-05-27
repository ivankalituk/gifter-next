import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL

// получение всех пользователей в чёрном списке
export async function getBlacklist() {
    try{
        const response = await axios.get(serverUrl + '/blacklist');
        return response.data
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}


// получение пользователей для поиска за почтой
export async function getUsersByEmailPiece(data:any) {
    try{
        const response = await axios.post(serverUrl + '/blacklist/email', {email: data.email});
        return response.data
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}

export async function getUsersByEmail(data:any) {
    try{
        const response = await axios.post(serverUrl + '/blacklist/users/email', {email: data.email});
        return response.data
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}

export async function deleteUserBlacklist(data:any) {
    try{
        const response = await axios.delete(serverUrl + '/blacklist/user/' + data.user_id);
        return response.data
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}

// добавить в чёрный список
export async function insertBlacklist(data:any) {
    try{
        await axios.post(serverUrl + '/blacklist-add', {user_id: data.user_id});
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}