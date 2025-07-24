import { useDispatch, useSelector } from "react-redux"
import { States } from "../../../store"
import cooks from "../../../basefunction";
import Button from "../../simplyComponents/button/button";
import { Link } from "react-router-dom";
import { Page } from "../../../types";

export default function ButtonAuth(){   

    const JWT = useSelector( (state:States) => state.JWT);
    const dispatch = useDispatch();

    function LogOut(){
        dispatch({
            type: 'DelJwt',
        })
    }

    return (
        <>
            { 
                JWT?  
                <div className="auth">
                    <Link to={Page.MyProfile}>
                        <Button>Мой профиль</Button>
                    </Link>
                    <Button onClick={LogOut}>Выйти</Button>
                </div> 
                :
                <div className="auth">
                    <Link to={Page.LogIn}>
                        <Button>Войти</Button>
                    </Link>
                    <Link to={Page.SignIn}>
                        <Button>Зарегистрироваться</Button>
                    </Link>
                </div>
                }
        </>
    )
}
