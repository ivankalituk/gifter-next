import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_URL

// получить все подарки по тегам
export async function createSuggest(data: any) {
    try{
        return await axios.post(serverUrl + '/suggest', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
          }).then(({data}) => data);
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}

export async function getAllSuggests() {
    try{
        const response = await axios.get(serverUrl + '/suggest');
        return response.data
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}

export async function getSuggestById(data: any) {
    try{
        const response = await axios.get(serverUrl + '/suggest/' + data.suggest_id);
        return response.data
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}

export async function deleteSuggest(data: any) {
    try{
        const response = await axios.delete(serverUrl + '/suggest/' + data.suggest_id);
        return response.data
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}