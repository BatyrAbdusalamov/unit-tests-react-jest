import { useDispatch, useSelector } from "react-redux"
import { States } from "../../store"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import SERVER from "../../dataServer"
import cooks from "../../basefunction"


export default function Authorization(){
    const JWT = useSelector( (state:States) => state.JWT);
    const filter = useSelector( (state:States) => state.filter);
    const page = useSelector( (state:States) => state.selectedPage);
    const countErrorRef = useRef(0)
    const dispatch = useDispatch()

    axios.defaults.baseURL = SERVER.base;
    
    useEffect( ()=>{
        axios.defaults.headers.common['Authorization'] = `Bearer ${JWT}`;
        axios.interceptors.response.use(
            (response)=> {
                return response
            },
            async (error) => {
                const originalRequest = error.config
                if (countErrorRef.current>=5) {
                    cooks.LogOut()
                    return
                }
                if((error.response.data.statusCode === 401)&&(countErrorRef.current<5)){
                    countErrorRef.current+=1
                    const { data }:{data:string | undefined} = await axios.get(SERVER.GET.refreshToken(cooks.getRefreshToken()));
                    if (!data || data.includes('object')) {
                        dispatch({
                            type:'DelJwt',
                        });
                        return
                    }
                    cooks.setAccessToken(data)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${cooks.getJWT()}`;
                    dispatch({
                        type:'SetJWT',
                    });
                    return axios.request(originalRequest)
                }
                return error.response.data
            }
        );
    },[JWT, filter, page, countErrorRef.current])
    return (<></>)
}