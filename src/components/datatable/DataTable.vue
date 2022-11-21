<template>
    <div class="row justify-content-between">
        <div class="col mb-3">
            <h5 class="mb-0 text-nowrap py-2 py-xl-0 fw-semi-bold">
                {{ selectedRowsCount ? `You have selected ${selectedRowsCount} ${tableTitle}` : title }}
            </h5>
        </div>
        <div class="col-auto">
            <div class="d-flex align-items-center">
                <i v-if="onCreateRow" @click="onCreateRow"
                   class="fas fa-plus-circle fs-4 rounded-circle shadow-sm cursor-pointer text-primary"/>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-auto col-sm-6 col-lg-4">
            <div class="search-box me-2 mb-2 d-inline-block">
                <div class="position-relative">
                    <DebouncedInput type="search" :query="globalFilter ?? ''" label="Search all columns..."
                                    :on-change="setGlobalFilter" placeholder="Search..."/>
                    <i class="bx bx-search-alt search-icon"/>
                </div>
            </div>
        </div>
    </div>
    <table class="table">
        <thead class="bg-200 text-900">
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <th>
                <IntermediateCheckbox :checked="table.getIsAllRowsSelected()"
                                      :indeterminate="table.getIsSomeRowsSelected()"
                                      :on-change="table.getToggleAllRowsSelectedHandler()"/>
            </th>
            <th class="fw-bolder" v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan"
                :class="header.column.getCanSort() ? 'cursor-pointer select-none' : ''"
                @click="header.column.getToggleSortingHandler()?.($event)">
                <template v-if="!header.isPlaceholder">
                    <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                :props="header.getContext()"/>

                    <span v-if="header.column.getCanSort()">
                        <i class="fas fa-sort ms-2" v-show="!['asc', 'desc'].includes(header.column.getIsSorted())"/>
                        <i class="fas fa-sort-up ms-2" v-show="String(header.column.getIsSorted()) === 'asc'"/>
                        <i class="fas fa-sort-down ms-2" v-show="String(header.column.getIsSorted()) === 'desc'"/>
                    </span>
                </template>
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in table.getRowModel().rows.slice(0, 10)" :key="row.id">
            <td>
                <div class="px-1">
                    <IntermediateCheckbox :checked="row.getIsSelected()" :indeterminate="row.getIsSomeSelected()"
                                          :on-change="row.getToggleSelectedHandler()"/>
                </div>
            </td>
            <td v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()"/>
            </td>
        </tr>
        </tbody>
    </table>
    <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
            <p class="mb-0">
                <span>Page </span>
                <strong>{{ table.getState().pagination.pageIndex + 1 }} of {{ table.getPageCount() }}</strong>
            </p>
            <p class="mb-0 ms-2">| &nbsp;</p>

            <div v-if="Boolean(selectedRowsCount)">
                {{ selectedRowsCount }} of {{ table.getPreFilteredRowModel().rows.length }} Total Rows Selected
            </div>

            <span>Total: <b>{{ data.length }}</b></span>

            <select name="" id="" class="form-select form-select-sm w-auto mx-2 border-0 pe-4"
                    :disabled="!table.getCanNextPage() && !table.getCanPreviousPage()"
                    v-model.number="table.getState().pagination.pageSize" @change="setPageSize">
                <option :value="pageSize" v-for="(pageSize, i) in [5, 10, 20, 40]" :key="`size-${i}`">
                    Show {{ pageSize }}
                </option>
            </select>
        </div>
        <div class="d-flex flex-end-center">
            <button class="btn btn-falcon-default btn-sm" :class="{'shadow-none':!table.getCanPreviousPage()}"
                    :disabled="!table.getCanPreviousPage()"
                    @click="table.setPageIndex(0)">
                <i class="fas fa-angle-double-left" data-fa-transform="shrink-3"/>
            </button>
            <button class="btn btn-falcon-default btn-sm mx-1" :class="{'shadow-none':!table.getCanPreviousPage()}"
                    :disabled="!table.getCanPreviousPage()"
                    @click="table.previousPage()">
                <i class="fas fa-angle-left" data-fa-transform="shrink-3"/>
            </button>
            <input
                type="number" step="1" min="1" :max="table.getCoreRowModel().rows.length"
                :value="table.getState().pagination.pageIndex + 1"
                @change="goToPage"
                class="border p-1 rounded w-16 me-1 form-control form-control-sm w-25"
            />
            <button class="btn btn-falcon-default btn-sm" :class="{'shadow-none':!table.getCanNextPage()}"
                    :disabled="!table.getCanNextPage()"
                    @click="table.nextPage()">
                <i class="fas fa-angle-right" data-fa-transform="shrink-3"/>
            </button>
            <button class="btn btn-falcon-default btn-sm ms-1" :class="{'shadow-none':!table.getCanNextPage()}"
                    :disabled="!table.getCanNextPage()"
                    @click="table.setPageIndex(table.getPageCount() - 1)">
                <i class="fas fa-angle-double-right" data-fa-transform="shrink-3"/>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    FilterFn,
    FlexRender,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowSelectionState,
    SortingState,
    useVueTable
} from '@tanstack/vue-table'
import { ref } from 'vue'
import IntermediateCheckbox from './IntermediateCheckbox.vue'
import DebouncedInput from './DebouncedInput.vue'
import { rankItem } from "@tanstack/match-sorter-utils";

const setPageSize = (e: any) => table.setPageSize(Number((e.target as HTMLSelectElement)?.value))

const props = defineProps<{ title: string, columns: any, data: any, onCreateRow?: () => void; }>()

const tableTitle = ref(props.title)

const sorting = ref<SortingState>([])
const globalFilter = ref<string | number>('')
const rowSelection = ref<RowSelectionState>({})
const selectedRowsCount = ref(Object.keys(rowSelection.value).length);

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the ranking info
    addMeta(itemRank);

    // Return if the item should be filtered in/out
    return itemRank.passed;
};

const setGlobalFilter = (value: string | number) => globalFilter.value = value

const table = useVueTable({
    get data() {
        return props.data
    },
    columns: props.columns,
    state: {
        get sorting() {
            return sorting.value
        },
        get globalFilter() {
            return globalFilter.value
        },
        get rowSelection() {
            return rowSelection.value
        }
    },
    onSortingChange: updaterOrValue => {
        sorting.value = typeof updaterOrValue === 'function'
            ? updaterOrValue(sorting.value)
            : updaterOrValue
    },
    onRowSelectionChange: update => {
        rowSelection.value = typeof update === 'function'
            ? update(rowSelection.value)
            : update
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    // debugTable: true,
})

const goToPage = (e: Event) => {
    const target = (e.target as HTMLInputElement)
    let page = target.value ? Number(target.value) - 1 : 0
    page = table.getPageCount() > page ? page : table.getPageCount() - 1

    table.setPageIndex(page)
}

</script>

<style scoped>
.table > :not(caption) > * > * {
    padding: .4rem .5rem;
    font-size: 11pt;
}

.search-box {
    font-size: .8333333333rem;
    position: relative;
    width: 21rem;
}
</style>