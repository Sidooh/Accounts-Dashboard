type User = {
    id: number
    name: string
    email: string
    username: string
    status: string
}


type Account = {
    id: number
    phone: string
    active: boolean
    inviter_id: number
    user_id: number
    user: User
    inviter: User
    invite_code: string
}

type Invite = {
    id: number
    phone: string
    status: string
    inviter_id: number
    account_id: number
}

type SecurityQuestion = {
    id: number
    question: string
    status: string
}