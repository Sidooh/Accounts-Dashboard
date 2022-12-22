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

type Model = {
    id?: number
    created_at?: string
    updated_at?: string
}
export type User = Model & {
    id: number
    name: string
    email: string
    username: string
    id_number: number
    status: string
}


export type Account = Model & {
    id: number
    phone: string
    active: boolean
    inviter_id: number
    user_id: number
    user: User
    inviter: Invite
    invite_code: string
    level: number
}

export type Invite = Model & {
    id: number
    phone: string
    status: string
    inviter_id: number
    account_id: number
    user: User
}

export type SecurityQuestion = Model & {
    id: number
    question: string
    status: string
}