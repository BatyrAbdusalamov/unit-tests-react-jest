import { useRef } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios, { CancelTokenSource } from "axios";
import SERVER from "../../dataServer";
import Users from "./oneUser";
import styles from './user.module.css';
import { User } from "../pageOnePost/types/types";
import { Query } from "../../types";

export default function FindUser(){
    const TIMER_QUERY = 2000;
    const queryClient = useQueryClient();
    const filterUser = useRef<HTMLInputElement>(null);
    let source: CancelTokenSource;
    const { data , isError, isLoading}:Query<User[]> = useQuery('users', fetchUsers);
    async function fetchUsers(){
        if(filterUser.current)
            return axios.get(SERVER.GET.userByLogin(filterUser.current.value))
        return new Promise<void>((resolve) => {
            setTimeout(()=>{
                if (source) 
                    source.cancel('Operation canceled by the user.');

                source = axios.CancelToken.source();
                if (filterUser.current){
                resolve(axios.get(SERVER.GET.userByLogin(filterUser.current.value),{
                    cancelToken: source.token
                }))}
            },TIMER_QUERY)
        })       
    }
    function filter(){
        queryClient.invalidateQueries(['users']);
    }

    if (isError) return <main>Ошибка Сервера</main>; 

    return (
        <main>
            <section className={styles.findUser}>
                <div className={styles.input}>
                    <input type="text" ref={filterUser} onKeyDown={filter} placeholder="Для подтверждения нажми Enter" className={styles.input} maxLength={20}/>
                </div>
                <div className="users">
                    {data && data.data && <Users users = {data.data}></Users>}
                    {data && !data.data && <div>Введите логин пользователя для поиска</div>}
                    {isLoading && <>Поиск...</>}
                </div>
            </section>
        </main>
    )
}