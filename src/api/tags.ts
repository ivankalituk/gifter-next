import axios from "axios"

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

export async function getTagByInput(data: any) {
    try{
        return await axios.post(serverUrl + '/tagName', data).then(({data}) => data);
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}