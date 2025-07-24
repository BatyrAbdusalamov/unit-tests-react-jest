import styles from './profile.module.css'

export default function EditProf({file, changeFile, inpName, inpSerName, user}) {
    return (
        <>
                         <div className={file? styles.input_img_active:styles.input_img}>
                     {file && <img src={file}></img>}
                    <input type="file" name="img"  onDrop={changeFile} onChange={changeFile} required/>
                 </div>
                 <div>{file && `Загружен: ${file.name}`}</div>
                 <div className={styles.info}>
                     <div className={styles.login}><span>Логин:</span> {user.login}</div>
                     <div className={styles.login}><span>Имя:</span> 
                         <input type="text" ref={inpName} defaultValue={user.name} required/>
                     </div>
                     <div className={styles.login}><span>Фамилия:</span> 
                         <input type="text" ref={inpSerName} defaultValue={user.sername} required/>
                     </div>
                 </div>
        </>
    )
}