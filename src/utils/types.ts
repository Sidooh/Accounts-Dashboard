import { Account, Invite as InviteModel, Model, Status } from "@nabcellent/sui-vue";

export type SecurityQuestion = Model & {
    id: number
    question: string
    status: Status
}

export type Invite = InviteModel & {
    inviter: Account
}