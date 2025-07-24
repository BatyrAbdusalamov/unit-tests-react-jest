import { Route, Routes } from "react-router-dom";
import { Page } from "../../types";
import AllPost from "../allPost/allPost";
import LogIn from "../auth/logIn/login";
import SignIn from "../auth/register/register";
import CreatePost from "../createPost/createPost";
import OnePost from '../pageOnePost/OnePost'
import { useSelector } from "react-redux";
import { States } from "../../store";
import Profile from "../profile/profile";
import FindUser from "../findUser/findUser";





export default function Router(){
    const JWT = useSelector( (state:States) => state.JWT)
    return (
        <Routes>
            <Route path="*" element ={ <AllPost/> }/>
            <Route path={Page.LogIn} element ={ <LogIn/> }/>
            <Route path={Page.SignIn} element ={ <SignIn/> }/>
            <Route path={Page.OnePost+'/:id'} element ={ <OnePost/> }/>
            {JWT && <Route path={Page.CreatePost} element ={ <CreatePost/> }/>}
            {JWT && <Route path={Page.MyProfile} element ={ <Profile/> }/>}
            {JWT && <Route path={Page.MyProfile+'/:id'} element ={ <Profile/> }/>}
            {JWT && <Route path={Page.FindUser} element ={ <FindUser/> }/>}
        </Routes>
    )
}