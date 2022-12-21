<script setup lang="ts">
import {
  FilterFn,
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useVueTable,
} from '@tanstack/vue-table'
import {PropType, ref} from 'vue'
import {rankItem} from "@tanstack/match-sorter-utils";

const props = defineProps({
  title: String,
  columns: {
    type: Object as PropType<any>,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})

const pageSizes = [10, 20, 30, 40, 50]

const sorting = ref<SortingState>([])
const globalFilter = ref()

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the ranking info
  addMeta({itemRank})

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

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
  },
  onSortingChange: updaterOrValue => {
    sorting.value =
        typeof updaterOrValue === 'function'
            ? updaterOrValue(sorting.value)
            : updaterOrValue
  },
  // onGlobalFilterChange: value => globalFilter.value = value,
  globalFilterFn: fuzzyFilter,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  debugTable: true,
  debugHeaders: true,
  debugColumns: false,
})

const goToPage = (e: Event) => {
  const target = (e.target as HTMLInputElement)
  let page = target.value ? Number(target.value) - 1 : 0
  page = table.getPageCount() > page ? page : table.getPageCount() - 1

  table.setPageIndex(page)
}

const setPageSize = (e: Event) => {
  const target = (e.target as HTMLSelectElement)
  table.setPageSize(Number(target.value))
}

const setGlobalFilter = (e: Event) => {
  const target = (e.target as HTMLInputElement)
  globalFilter.value = target.value
}
</script>

<template>
  <div id="table">
    <div class="my-3 row">
      <div class="col">
        <input class="search form-control w-50" @input="setGlobalFilter"/>
      </div>
    </div>
    <div class="table-responsive scrollbar">
      <table class="table fs--1 mb-0">
        <thead class="bg-200 text-900">
        <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
        >
          <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :colSpan="header.colSpan"
              :class="header.column.getCanSort() ? 'cursor-pointer select-none' : ''"
              @click="header.column.getToggleSortingHandler()?.($event)"
          >
            <template v-if="!header.isPlaceholder">
              <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
              />

              {{ {'asc': ' 🔼', 'desc': ' 🔽'}[header.column.getIsSorted()] }}
            </template>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
            />
          </td>
        </tr>
        </tbody>
      </table>

      <div class="d-flex justify-content-between align-items-center my-3">
        <div class="d-flex flex-center fs--1">
          <select class="form-select w-auto mx-2 form-control-sm" :value="table.getState().pagination.pageSize"
                  @change="setPageSize">
            <option v-for="pageSize in pageSizes" :key="pageSize" :value="pageSize">{{ pageSize }} rows</option>
          </select>
        </div>
        <div class="d-flex flex-end-center">
          <button class="btn btn-sm fs-2" :disabled="!table.getCanPreviousPage()"
                  @click="() => table.setPageIndex(0)">
            <span class="fas fa-angle-double-left" data-fa-transform="shrink-3"></span>
          </button>
          <button class="btn btn-sm fs-1" :disabled="!table.getCanPreviousPage()"
                  @click="() => table.previousPage()">
            <span class="fas fa-chevron-left me-1" data-fa-transform="shrink-3"></span>
          </button>
          <div class="d-flex flex-center justify-content-between text-center mx-2" style="width: 150px;">
            <span>Page </span>
            <input
                type="text"
                :value="table.getState().pagination.pageIndex + 1"
                @change="goToPage"
                class="border rounded form-control-sm text-center"
                style="width: 50px;"
            />
            <strong>{{ ' of ' + table.getPageCount() }}</strong>
          </div>
          <button class="btn btn-sm fs-1" :disabled="!table.getCanNextPage()"
                  @click="() => table.nextPage()">
            <span class="fas fa-chevron-right me-1" data-fa-transform="shrink-3"></span>
          </button>
          <button class="btn btn-sm fs-2" :disabled="!table.getCanNextPage()"
                  @click="() => table.setPageIndex(table.getPageCount() - 1)">
            <span class="fas fa-angle-double-right me-1" data-fa-transform="shrink-3"></span>
          </button>
        </div>
      </div>

    </div>
  </div>

</template>

<style scoped>

/*.sort {*/
/*  padding:8px 30px;*/
/*  border-radius: 6px;*/
/*  border:none;*/
/*  display:inline-block;*/
/*  color:#fff;*/
/*  text-decoration: none;*/
/*  background-color: #28a8e0;*/
/*  height:30px;*/
/*}*/
/*.sort:hover {*/
/*  text-decoration: none;*/
/*  background-color:#1b8aba;*/
/*}*/
.sort:focus {
  outline: none;
}

.sort:after {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid transparent;
  content: "";
  position: relative;
  top: -10px;
  right: -5px;
}

.sort.asc:after,
.sort.desc:after {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  content: "";
  position: relative;
  left: 5px;
}

.sort.asc:after {
  border-top: 5px solid #000;
  top: 4px;
}


.sort.desc:after {
  border-bottom: 5px solid #000;
  top: -4px;
}

</style>