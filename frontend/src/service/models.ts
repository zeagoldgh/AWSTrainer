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

export interface NewQuestion {
    question :string,
    answers : string[],
    rightAnswers : boolean[],
    category : string,
    certType : string
}

export interface QuestionEntity {
    id : string
    question :string,
    answers : string[],
    rightAnswers : boolean[],
    category : string,
    certType : string
}

export interface AnswersGiven {
    questionId : string
    givenAnswers : boolean[]
}

export interface ValidatedAnswer {
    id : string
    isExam : boolean
    validatedAnswers : CheckedAnswer[]
}

export interface CheckedAnswer{
    possibleAnswers : string[]
    givenAnswers : boolean[]
    correctlyAnswers : boolean[]
    category : string
    certType : string
}