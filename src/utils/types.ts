import { Model, Status } from "@nabcellent/sui-vue";

export type SecurityQuestion = Model & {
    id: number
    question: string
    status: Status
}