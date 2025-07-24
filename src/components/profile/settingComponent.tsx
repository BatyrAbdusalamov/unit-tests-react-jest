import Button from '../simplyComponents/button/button';
import styles from './profile.module.css';

interface props {
    status: boolean,
    initial: number,
    saveUser: ()=>void,
    openEdit: ()=>void,
    Cancel: ()=>void,
    showNewsPage: ()=>void,
}

export default function Setting({status, initial,saveUser, Cancel, openEdit, showNewsPage}:props){
    return (
            <nav className={styles.profile}>
                <ul className={styles.profile}>
                    <li className={styles.profile}>
                        {status? 
                        <div className={styles.btn_editprofile}>
                            <Button onClick={saveUser}> Сохранить </Button>
                            <Button onClick={Cancel}> Отмена </Button>
                        </div>
                        :
                        <div className={styles.btn_editprofile}>
                            {!initial && <Button onClick={openEdit}> Редактировать Профиль </Button>}
                        </div>
                        }
                    </li>
                    {!status && <li className={styles.profile}>
                        <Button onClick={showNewsPage}> Показать новости пользователя </Button>
                    </li>}
                </ul>
            </nav>
    )
}