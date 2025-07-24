import { useEffect, useRef } from 'react'
import styles from '../OnePost.module.css'
import { Comment as COM, CreateCommentDto} from '../types/types'
import OneComment from './comment'
import { useDispatch, useSelector } from 'react-redux'
import { States } from '../../../store'
import { Page } from '../../../types'
import { Link } from 'react-router-dom'
import Button from '../../simplyComponents/button/button'
import SERVER from '../../../dataServer'
import { useMutation, useQuery, useQueryClient } from 'react-query'
interface props{
    idPost: number,
} 

export default function Comment({idPost}:props){
    const queryClient = useQueryClient()
    const {data, isError, isLoading} = useQuery('comments', refreshComment )
    const mutation = useMutation( (newComment:CreateCommentDto) => sendComment(newComment), {
        onSuccess: () => queryClient.invalidateQueries(['comments'])
    })
    const text = useRef(null);
    const JWT = useSelector ( (state:States) => state.JWT);
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch({type: 'dropLocation'})
    }, [])

    async function refreshComment(){
        return await ( await fetch(SERVER.GET.getAllCommentByPostId+idPost)).json()
    }
    async function sendComment(body:CreateCommentDto) {
        return await (await fetch(SERVER.POST.comments.createCom,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JWT}`
                },
                body: JSON.stringify(body)
            })).json()
        
    }
    async function createComment(event:Event) {
        event.preventDefault()
        if (!(text && text.current && text.current.value && JWT)) return;
        const createComment:CreateCommentDto = {
            PostId: idPost,
            text: text.current.value
        }
        mutation.mutate(createComment)
        text.current.value = ''
    }

    return (
        <section className={styles.comments} id="comments" >
            <h3>Комментарии</h3>

            { data && data.map((comment:COM, index:number) => < OneComment key={comment.text+index} {...comment} />) }

            <form action="" className={styles.comment_form}>
                <textarea name="comment" id="comment" rows={4} placeholder="Оставьте ваш комментарий" required ref={text} maxLength={255}></textarea>

                { isError && <div>Нет комментариев</div>}
                { isLoading && <div>Загрузка комментариев</div>}

                { JWT && <button type="submit" onClick={createComment}>Отправить</button>}

                { !JWT && 
                <div>
                    <Link to={'/'+Page.LogIn}>
                        <Button onClick={ () => dispatch({type: 'setLocation'}) }>Войдите на сайт</Button>
                    </Link>
                </div>}
            </form>
        </section>
    )
}