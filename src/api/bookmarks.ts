import axios from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

// тогл для отмеченных подарков
export async function toggleBookmark(data: any){
    try{
        const response = await axios.post(serverUrl + '/bookmark/toggle', {user_id: data.user_id, gift_id: data.gift_id});
        return response.data
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}

// получение всех отмеченных подарков пользователя
export async function getUserBookmarks(data: any){
    try{
        const response = await axios.get(serverUrl + '/bookmarks/' + data.user_id);
        return response.data
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}