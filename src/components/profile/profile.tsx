import { useMutation, useQuery, useQueryClient } from "react-query"
import SERVER from "../../dataServer"
import { useDispatch, useSelector } from "react-redux"
import { States } from "../../store"
import styles from './profile.module.css'
import Button from "../simplyComponents/button/button"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Filter, Page } from "../../types"
import Setting from "./settingComponent"
import Prof from "./showingProf"
import EditProf from "./editprof"

export default function Profile( ){
    const queryClient = useQueryClient()
    const {data, isError, isLoading} = useQuery('user', getUser, {
        refetchOnWindowFocus: false,
    })
    const mutation = useMutation( (data:FormData) => patchUser(data), {
        onSuccess: () => queryClient.invalidateQueries(['user'])
    })
    const JWT = useSelector( (state:States) => state.JWT)

    const inpName = useRef(null)
    const inpSerName = useRef(null)
    const [file, setFile] = useState()
    const [editStatus, setEditStatus] = useState(false)

    const navitage = useNavigate()
    const disaptch = useDispatch()

    const initial = getId(location.pathname)
    function getId(path: string ): number {
        const id = +path.slice(path.lastIndexOf('/')+1 )
        return id
    }
    
    async function getUser(){
        let url = SERVER.GET.myProfile;
        if (initial) url = SERVER.GET.user(initial)
        const response = await fetch(url ,{
            headers:{
                'Authorization': `Bearer ${JWT}`
            }
        })
        let user = await response.json()
        const response2 = await fetch(SERVER.GET.img(user.avatarId) ,{
            headers:{
                'Authorization': `Bearer ${JWT}`
            }
        })
        const img = await response2.json()
        user = {
            ...user,
            imgPath: img.path
        }
        return user
    }

    function showNewsPage(){
        disaptch({
            type:'Filter',
            buffer:data.login,
            typeFilter: Filter.User,
        })
        navitage('/'+Page.AllPost);
    }

    function saveUser() {
        if (!(inpName.current && inpSerName.current)) return;

        const formData = new FormData();
        formData.append('name', inpName.current.value);
        formData.append('sername', inpSerName.current.value);

        if (file) formData.append('img', file);

        mutation.mutate(formData)
        setEditStatus( (prev) => !prev)
    }

    async function patchUser(body:FormData) {
        fetch(SERVER.PATCH.user, {
            method: 'PATCH',
            headers:{
                'Authorization': `Bearer ${JWT}`
            },
            body,
        })
    }

    function openEdit() {
        setEditStatus( (prev) => !prev)
    }

    function changeFile(event){
        setFile(event.target.files[0])
    }

    function Cancel() {
        setEditStatus( (prev) => !prev)
    }
    if (isLoading) return (<main> Загрузка ...</main>)
    if (isError) return( <main> {data.message} </main>)
    if(!data) return (<main> Нет пользователя -_- </main>)
    return (
        <main>
            <div className={styles.profile}>
                <section className={styles.profile}>
                    {!editStatus && <Prof user={data}/>}
                    {editStatus && <EditProf user={data} file={file}changeFile={changeFile} inpName={inpName} inpSerName={inpSerName}/>}
                </section>
            <Setting 
                status = {editStatus} 
                initial= {initial} 
                saveUser = {saveUser} 
                Cancel= {Cancel} 
                openEdit = {openEdit} 
                showNewsPage ={showNewsPage}
            />
            </div>
        </main>
    )
}
