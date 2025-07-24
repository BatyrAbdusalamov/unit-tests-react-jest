export const enum Page {
    LogIn = 'LogIn',
    SignIn = 'SignIn',
    AllPost = 'AllPost',
    OnePost = 'OnePost',
    CreatePost = 'CreatePost',
    MyProfile = 'profile',
    FindUser = 'findUser',
}

export const enum Filter {
    All = 'All',
    Title = 'Title',
    Tags = 'Tags',
    User = 'User',
}

export class ObjectToken {
    private readonly access_token:string;
    constructor(access_token:string){
        this.access_token = access_token;
    }
}

export class HTTPExeption{
    private readonly response:string;
    private readonly status:number;
    private readonly message:string;
    private readonly name:string;
    constructor(response:string, status:number, message:string, name:string){
        this.response = response;
        this.status = status;
        this.message = message;
        this.name = name;
    }
}

export interface Query<T>{
    data: undefined | Record<string, T>,
    isError: boolean,
    isLoading: boolean,
}