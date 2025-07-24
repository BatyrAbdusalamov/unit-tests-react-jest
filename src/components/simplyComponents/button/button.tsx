import { MouseEventHandler, ReactNode } from 'react'
import styles from './button.module.css'
type Button = {
    text?:string,
    children?:ReactNode
    onClick?:MouseEventHandler<HTMLButtonElement>
}

export default function Button(props:Button){

    return(
        <button className={styles.button} onClick={props.onClick}>{props.children}</button>
    )
}