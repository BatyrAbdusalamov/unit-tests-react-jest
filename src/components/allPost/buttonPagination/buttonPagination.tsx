import { States } from '../../../store'
import styles from './button.module.css'
import { useDispatch, useSelector } from "react-redux"

export default function ButtonsPagination({count}:{count:number}){
    const activePage = useSelector( (state:States) => state.selectedPage)
    const dispatch = useDispatch()
    const array = new Array(count).fill(0)

    function setPage(event){
        dispatch({
            type:'setPage',
            setPage: event.target.textContent
        })
    }
    return (
    <nav className={styles.pagi}>
        {
            array.map( (_, index) => {
                let style = styles.Btn_pagi
                if (index === (activePage - 1)) style += ` ${styles.Btn_pagi_active}`;

                if ( index === 0) 
                    return <button className={style} key={index+_} onClick={setPage}>{index+1}</button>

                if ((index>( activePage - 3))&&(index<( activePage + 1)))
                    return <button className={style} key={index+_} onClick={setPage}>{index+1}</button>
                
                if ( index === array.length-1) 
                    return <button className={style} key={index+_} onClick={setPage}>{index+1}</button>
                
                if (( index === array.length-2 ) || (index === 2)) 
                return <span key={index+_}>...</span>
            })
        }
    </nav>
    )
}
