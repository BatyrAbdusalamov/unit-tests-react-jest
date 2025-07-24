import { Filter } from "./types";

const base =  'http://127.0.0.1:5000/'
const SERVER = {
    base: base,
    google: `${base}google`,
    POST: {
        register: `${base}auth/registration`,
        login: `${base}auth/login`,
        comments: {
            createCom: `${base}comments`,
        },
        News: {
            create: `${base}news`,
        }
    },
    GET: {
        allNews: `${base}news`,
        allNewsByPage: `${base}news?page=`,
        allNewsByFiler: (page:number, filter:string, typeFilter:Filter) => `${base}news?page=${page}&typeFilter=${typeFilter}&filter=${filter}`,
        countPageNews: `${base}news/count`,
        oneNews: `${base}news?id=`,
        getAllCommentByPostId: `${base}comments?id=`,
        user: (id:number) => `${base}users?id=${id}`,
        userByLogin: (login:string) => `/users?login=${login}`,
        img: (id:number) => `${base}uploadfile?id=${id}`,
        myProfile: `${base}auth/profile`,
        refreshToken: (token:string) => `${base}auth/refreshToken?token=${token}`
    },
    PATCH:{
        user: `${base}users`,
    },
}
export default SERVER; 