import { Link } from 'react-router-dom'
import styles from './footer.module.css'
import { Page } from '../../types'
import Button from '../simplyComponents/button/button'
import { useSelector } from 'react-redux'
import { States } from '../../store'

export default function Footer(){
    const JWT = useSelector( (state:States) => state.JWT)
    return(
        <footer className={styles.footer}>
            { 
            JWT && 
            <Link to={'/'+Page.CreatePost}> 
                <Button>Создать пост</Button>
            </Link>
            }
            
            <div className={styles.text}>Thank's for visited</div>
        </footer>
    )
}