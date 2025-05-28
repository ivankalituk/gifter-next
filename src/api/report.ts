import axios from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

export async function getReportById(data: any) {
    try{
        const response = await axios.get(serverUrl + '/report/' + data.report_id);
        return response.data
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}

export async function postReport(data: any) {
    try{
        await axios.post(serverUrl + '/report', data);
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}

export async function getAllReports() {
    try{
        const response = await axios.get(serverUrl + '/report');
        return response.data
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}

export async function deleteReport(data: any) {
    try{
        const response = await axios.delete(serverUrl + '/report/' + data.report_id);
        return response.data
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}

export async function deleteReportGift(data: any) {
  try {
    await axios.delete(serverUrl + '/report-gift', {
      data: {
        gift_id: data.gift_id,
        report_id: data.report_id
      }
    });
  } catch (error) {
    console.error("ERROR WHITE GETTING DATA " + error)
  }
}

export async function getGiftByReport(data: any) {
    try{
        const response = await axios.get(serverUrl + '/report/gift/' + data.report_id);
        return response.data
    } catch (error){
        console.error("ERROR WHITE GETTING DATA " + error)
    }
}