import SERVER from '../../dataServer'
import styles from './profile.module.css'

const ALTIMG = "https://img.freepik.com/free-photo/the-adorable-illustration-of-kittens-playing-in-the-forest-generative-ai_260559-483.jpg?w=826&t=st=1721203707~exp=1721204307~hmac=9c4b8ecb7cf0b8644e344d5dbdffd283908c1689e303073a5941890e5103fe7a"


export default function Prof({user}) {
    return (
        <>
                <img src={user.imgPath? SERVER.base+user.imgPath:ALTIMG} 
                    alt="Not img" className={styles.image}/>
                <div className={styles.info}>
                    <div className={styles.login}>Логин: {user.login}</div>
                    <div className={styles.login}>Имя: {user.name}</div>
                    <div className={styles.login}>Фамилия: {user.sername}</div>
                </div>
        </>

    )
}