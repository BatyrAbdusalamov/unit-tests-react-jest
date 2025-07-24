export interface Posts {
    id: number,
    article: string,
    text: string,
    createdAt:string,
    tags: Tag[],
    author: author,
    image?: Image|null,
    comments?: Comment[]
}
export interface Tag{
    id?:number,
    nametag:string,
}

interface Image{
    path: string,
}
interface author{
    id:number,
    login:string,
    name:string,
    sername: string,
}
export interface User{
    id:number,
    login:string,
    name:string,
    sername:string,
    password?:string,
    avatarId?:number
}

export interface Comment {
    id:number,
    text:string,
}


export interface CreateCommentDto{
    PostId: number,
    text: string,
}