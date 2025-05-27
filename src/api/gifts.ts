import { Gift, giftName } from "@/interfaces/interface";
import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_URL

// получить все подарки по тегам
export async function getAllGifts(): Promise<Gift[]> {
    try {
        const response = await axios.get<{ data: Gift[] }>(serverUrl + '/gift').then(({data}) => data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("ERROR WHITE GETTING DATA " + error)
        } else {
            console.error("ERROR WHITE GETTING DATA " + error)
        }
        return [];
    }
}

// получение массива имён по фрагменту имени подарка
export async function getGiftNameByName(name: string): Promise<giftName[]> {
    try {
        const response = await axios.post<giftName[]>(serverUrl + '/gift/name', {name: name});

        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error getting data:", error.message);
        } else {
            console.error("ERROR WHITE GETTING DATA " + error)
        }
        return [];
    }
}

// получение всех подарков по массиву тегов (если массив пуст, то любые подарки)
export async function getAllGiftsByTags(tags: string[], sort: string, byName: string, user_id: number, page: number):Promise<Gift[] | undefined> {
    try{
        return await axios.post<Gift[] | undefined>(serverUrl + '/gift/tags', {tags: tags, sort: sort, byName: byName, user_id: user_id, page: page}).then(({data}) => data);
    } catch (error){
        if (axios.isAxiosError(error)){
            console.error("ERROR WHITE GETTING DATA:", error.message)
        } else {
            console.error("UNEXPECRED ERROR:", error)
        }
    }
}

// получение всех данных по айди создателя
export async function getAllGiftsByCreatorId(creator_id: number | null, user_id: number): Promise<Gift[]> {
    try {
        const response = await axios.get<Gift[]>(`${serverUrl}/gift/creator/${creator_id}/${user_id}`);
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Ошибка при получении данных:", error.message);
        } else {
            console.error("Неожиданная ошибка:", error);
        }
        return [];
    }
}

// получение подарка по его айди
export async function getGiftById(data: any) {
    try{
        const response = await axios.get(serverUrl + '/gift/' + data.gift_id);
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

// создание подарка 
export async function postGift(data: any) {
    try{
        await axios.post(serverUrl + '/gift', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

// получение айди рандомного подарка
export async function gerRandomGiftId() {
    try {
        const response = await axios.get(serverUrl + '/gift-random');
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Ошибка при получении данных:", error.message);
        } else {
            console.error("Неожиданная ошибка:", error);
        }
        return [];
    }
}

// получение пользовательской оценки подарка
export async function getUserGiftMark(data: any) {
    try {
        const response = await axios.post(serverUrl + '/gift-reating', data);
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Ошибка при получении данных:", error.message);
        } else {
            console.error("Неожиданная ошибка:", error);
        }
        return [];
    }
}

// добавление рейтинга подарку
export async function setUserGiftMark(data: any) {
    try {
        const response = await axios.put(serverUrl + '/gift-reating', data);
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Ошибка при получении данных:", error.message);
        } else {
            console.error("Неожиданная ошибка:", error);
        }
        return [];
    }
}

// получение массива имён по фрагменту имени подарка
export async function putGift(data: any){
    try {
        await axios.put(serverUrl + '/gift', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error getting data:", error.message);
        } else {
            console.error("Unexpected error:", error);
        }
        return [];
    }
}