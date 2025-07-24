import { Link } from "react-router-dom";
import { User } from "../pageOnePost/types/types";
import Button from "../simplyComponents/button/button";
import { Page } from "../../types";
import styles from './user.module.css';

export default function Users({users}:{users:User[]}){
    return (
    <>
        {!users.length && <div>К сожалению данного пользователя не существует</div>}

        {users && users.map( (user:User) => <OneUser {...user} key={user.id+Math.random()*100}></OneUser>)}
    </>
    )
}

function OneUser(user:User){
    return (
    <div className={styles.user}>
        <span className={styles.user}>Логин:{user.login} </span> 
        <span className={styles.user}>Имя: {user.name} </span>
        <span className={styles.user}>Фамилия: {user.sername} </span>
        <Link to={'/'+Page.MyProfile+'/'+user.id}>
            <Button>Перейти на страницу пользователя</Button>
        </Link>
    </div>
    )
}