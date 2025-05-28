import { useState } from "react"

// T: то что получаем, F: то, что отправляем
interface useUpdateRequest <T,F> {
    fetchFunc: (data: F) => Promise<T>
}

export const useUpdateRequest = <T,F>({fetchFunc}:useUpdateRequest<T,F>) =>{
    const[data, setData] = useState<any | null>(null)
    const[isFetched, setIsFetched] = useState<boolean>(false)

    const mutatedFunc = (data: any) => fetchFunc(data).then((fechedData: T) =>{
        setData(fechedData)
        setIsFetched(true)
    })

    return {mutatedFunc, isFetched, data}
}
