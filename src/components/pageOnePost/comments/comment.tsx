import styles from '../OnePost.module.css'
import { Comment } from '../types/types'
export default function OneComment(comment?:Comment|null|undefined){
    return (
        <>
        {
            comment? 
            <div key={comment.id} className={styles.comment}>
                <p> {comment.text} </p>
            </div> 
            :
            null
            
        }
        </>
    )
}