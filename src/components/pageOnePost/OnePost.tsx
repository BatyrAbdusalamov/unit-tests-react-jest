import { Link, useLocation } from "react-router-dom";
import Button from "../simplyComponents/button/button";
import styles from './OnePost.module.css'
import { lazy, useEffect, useState } from "react";
import Comment from "./comments/comments";
import { Posts } from "./types/types";
import SERVER from "../../dataServer";
import { useQuery } from "react-query";



export default function Post(){
    const {data, isError, isLoading} = useQuery('post',()=> getPost( getId( location.pathname )))
    const location = useLocation()
    const [showingComment , setshowingComment] = useState(false)

    function getId(path: string ): number {
        const id = +path.slice(path.lastIndexOf('/')+1 )
        return id
    }

    async function getPost(id: number): Promise<Posts>{
        const url = SERVER.GET.oneNews+id;
        const response = await fetch(url);
        const post:Posts = await response.json()
        return post
        //setPost(post)
    }

    function showComment () {
        setshowingComment(( value ) => !value )
    }

    if (isError) return (<main> Ошибка работы сервера </main>)
        
    if (isLoading) return (<main> Загрузка </main>)

    if (!data) return (
        <main> 
            <Link to="/">
                <Button>Назад</Button>
            </Link>
            Данного поста не существует 
        </main>
    )

    return (
        <main className={styles.main}>
            <Link to="/">
                <Button>Назад</Button>
            </Link>

            <Button onClick = {showComment}>Показать комментарий</Button>


            <div className={styles.post_content_full}>
                <img src={SERVER.base+data.image?.path} alt="SOME img" className={styles.post_image}/>
                <h2 className={styles.post_title_full}> {data.article}</h2>
                <p className={styles.post_text_full}>
                    {data.text}
                </p>
            </div>

            {showingComment && <Comment idPost = {data.id} key={data.id}/>}
            

        </main>
    )
}