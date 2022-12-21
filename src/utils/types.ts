import { RouteLocationRaw } from "vue-router";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";

type RouteChildType = {
    name: string
    to: RouteLocationRaw
    active?: boolean
    icon?: IconDefinition
    children?: RouteChildType[]
}
export type RouteType = {
    label?: string
    children: RouteChildType[]
}

export type User = {
    id: number
    name: string
    email: string
    username: string
    status: string
}


export type Account = {
    id: number
    phone: string
    active: boolean
    inviter_id: number
    user_id: number
    user: User
    inviter: User
    invite_code: string
}

export type Invite = {
    id: number
    phone: string
    status: string
    inviter_id: number
    account_id: number
}

export type SecurityQuestion = {
    id: number
    question: string
    status: string
}