// Auth

export interface AuthInterface {
    token : string,
    username : string,
    logout: () => void
    login: (username:string, password: string) => Promise<void>
}

export interface LoginResponseBody {
    token: string,
}

export interface UserDto {
    username : string,
    role : string,
}

export interface JwtToken {
    sub : string,
    iat : number,
    exp: number
}