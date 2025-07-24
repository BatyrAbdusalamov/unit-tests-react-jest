import styles from './login.module.css';
import Button from '../../simplyComponents/button/button';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import SERVER from '../../../dataServer';
import { useDispatch } from 'react-redux';
import { Page } from '../../../types';
import cooks from '../../../basefunction';
import { LogInDTO } from '../types';

export default function LogIn(){
    const navigate = useNavigate();
    const [error, setError] = useState({
        status: 200,
        message: '',
        name: '',
    })
    const inpLogin = useRef<HTMLInputElement>(null);
    const inpPass = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();


    function Log(event){
        event.preventDefault()
        if (!(inpPass.current && inpLogin.current)) return;
        const body = {
                login: inpLogin.current.value,
                password: inpPass.current.value
        };
       sendUser(body);

    }

    async function googleLogIn(){
        document.location = SERVER.google;
    }

    async function sendUser(body:LogInDTO) {
        const response = await fetch(SERVER.POST.login, {
            method: 'POST',
            credentials: 'include',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        if (!(response.ok)) setError(await response.json());
        /* Set from body because use http but not https */
        const objectTokens = await response.json()
        cooks.LogIn(objectTokens['access_token'], objectTokens['refresh_token']);
        navigate('/'+Page.AllPost);
        dispatch({
            type: 'SetJWT'
        });
    }
    return (
        <main>
                <Link to="/">
                    <Button>Назад</Button>
                </Link>
        
            <form className={styles.auth_form}>
                <h2>Авторизация</h2>
                <input type="text" placeholder="Логин" ref={inpLogin} maxLength={25}/>
                <input type="password" placeholder="Пароль" ref={inpPass} maxLength={25}/>
                <Button onClick={Log}>Войти</Button>
            </form>
            <button className={styles.btn_auth_google} onClick={googleLogIn}> Войти через гугл 
            <img src="../../../static/google.svg" alt="dots icon" className={styles.icon_google}/>
            </button>
            { (error.status>=300)? <div> {error.message} </div>: null }
        </main>
    )
}
