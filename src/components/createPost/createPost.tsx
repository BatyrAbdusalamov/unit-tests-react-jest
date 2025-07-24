import { Link, useNavigate } from "react-router-dom";
import { Page } from "../../types";
import Button from "../simplyComponents/button/button";
import SERVER from "../../dataServer";
import styles from "./createPost.module.css"
import { useEffect, useRef, useState } from "react";
import { Tag } from "../pageOnePost/types/types";
import { useSelector } from "react-redux";
import { States } from "../../store";

export default function CreatePost(){
    const [ref, setRef] = useState(0);
    const [upload ,setUpload] = useState(false)
    const [file, setFile] = useState()
    const article = useRef(null)
    const text = useRef(null)
    const tags = useRef(null)
    const JWT = useSelector( (state:States) => state.JWT)
    const navitage = useNavigate()

    function loadPost (event:Event){
        event.preventDefault()
        if (!(file && article && article.current && text.current && tags.current)) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('article', article.current.value);
        formData.append('text', text.current.value);
        getTags(tags.current.value).forEach((item,i) => {
            formData.append(`Tags`, item.nametag);
        })

        sendPost(formData)
        navitage('/')
    }

    function getTags(string:string):Tag[]{
        const Arr:string[] = string.split(' ');
        const newArr = Arr.map( (text)=> {
            if (text)
            return {nametag: text}
        })
        return  newArr.filter((item) => item!==undefined )
    }

    async function sendPost(body:FormData){
        const response = await fetch(SERVER.POST.News.create, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${JWT}`
            },
            body:body,
        })
        return await response.json()
    }

    function addFile(e){
        setUpload(()=>true); 
        setRef((val)=>val+1)
        setFile(e.target.files[0])
    }
    return (
        <main>
            <Link to={'/'}> 
                <Button>На главную</Button>
            </Link>
            <div>
                <form action={SERVER.POST.News.create} method="post" className={styles.form}>
                    <div className={styles.article}>   
                        <label htmlFor="article" className={styles.article} >Заголовок</label>
                        <input type="text" name="article" maxLength={40} placeholder="" className={styles.article} ref={article}/>
                    </div>
                    <div className={styles.text}>
                        <div className={styles.label}>Текст</div>
                        <textarea name="text" placeholder=" " className={styles.text} ref={text} />
                    </div>
                    <div className={styles.tags}>
                        <label htmlFor="tags" className={styles.tags}>Теги</label>
                        <input type="text" name="tags" placeholder="tag1 tag2 tag3"  className={styles.tags} ref={tags} maxLength={40}/>
                    </div>
                    <div className={styles.file}>
                        <label htmlFor="file" className={upload? styles.file_upload : styles.file}>
                            {(upload && file)? `Загружен файл:${file.name}`: 'Загрузить файл(нажми на меня)'}
                            <input ref={file} type="file" name="file" className={styles.file} hidden onChange={addFile} onDrop={addFile}/>
                        </label>
                    </div>
                    <Button onClick={loadPost}>Создать</Button>
                </form>
            </div>
        </main>

    )
}