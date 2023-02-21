<template>
    <div class="card mb-3">
        <div class="card-body">
            <DataTable :key="tableKey" :title="title??'Accounts'" :columns="columns" :data="accounts"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { h, ref } from "vue";
import { CellContext, createColumnHelper } from "@tanstack/vue-table";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import {
    Account,
    accountAccessor,
    DataTable,
    getRelativeDateAndTime,
    PhoneNumber,
    Status,
    StatusBadge,
    TableDate,
    toast,
    Tooltip
} from "@nabcellent/sui-vue";
import { faUserCheck, faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { changeAccountActiveState } from "@/utils/helpers";
import { useAccountsStore } from "@/stores/accounts";
import { useDashboardStore } from "@/stores/dashboard";

const props = defineProps<{ title?: string; accounts: Account[] }>()

const { fetchAccounts } = useAccountsStore();
const { fetchRecentAccounts } = useDashboardStore();

let tableKey = ref(0)

const columnHelper = createColumnHelper<Account>()
const columns = [
    columnHelper.accessor('id', {
        header: '#',
    }),
    columnHelper.accessor(accountAccessor, {
        header: 'User',
        id: 'user',
        cell: ({ row: { original: acc } }: CellContext<Account, string>) => h('div', [
            h('div', acc.user?.name ?? '-'),
            h(PhoneNumber, { phone: acc.phone }),
        ]),
    }),
    columnHelper.accessor(r => r.active ? Status.ACTIVE : Status.INACTIVE, {
        header: 'Status',
        cell: info => h(StatusBadge, { status: Status[info.getValue()] })
    }),
    columnHelper.accessor(r => {
        if (r.inviter) {
            return accountAccessor(r.inviter)
        } else if (r.invite_code) {
            return r.invite_code
        } else return 'Root-level User'
    }, {
        header: 'Inviter',
        cell: ({ row: { original: acc } }) => {
            if (acc.inviter) {
                return h('div', [
                    h('div', acc.inviter?.user?.name || '-'),
                    h(PhoneNumber, { phone: acc.inviter.phone }),
                ])
            } else if (acc.invite_code) {
                return h('b', h('code', acc.invite_code))
            } else return 'Root-level User'
        }
    }),
    columnHelper.accessor(r => getRelativeDateAndTime(r.created_at as string).toString(), {
        header: 'Created',
        cell: ({ row }: CellContext<Account, string>) => h(TableDate, { date: row.original.created_at })
    }),
    {
        id: 'actions',
        header: '',
        cell: ({ row: { original: acc } }: CellContext<Account, string>) => {
            return h('div', { class: 'd-flex justify-content-evenly' }, [
                h(
                    Tooltip,
                    {
                        title: acc.active ? 'Deactivate' : 'Activate',
                        placement: 'top',
                        class: `cursor-pointer badge-soft-${acc.active ? 'danger' : 'success'} bg-transparent`,
                        onClick: async () => {
                            const accountStatusChanged = await changeAccountActiveState(acc)

                            if (accountStatusChanged.isConfirmed) {
                                const fetch = props.title?.toLowerCase().includes('recent')?fetchRecentAccounts:fetchAccounts

                                fetch().then(() => tableKey.value += 1)

                                toast({ titleText: `Account ${acc.active ? 'DE' : ''}ACTIVATION Successful!` })
                            }
                        },
                    }, () => [h(FontAwesomeIcon, { icon: acc.active ? faUserXmark : faUserCheck })]
                ),
                h(
                    RouterLink,
                    { to: { name: 'accounts.show', params: { id: acc.id } } },
                    () => h(FontAwesomeIcon, { icon: faEye })
                ),
            ])
        }
    },
]
</script>
