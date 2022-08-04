<script setup lang="ts">
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useVueTable,
} from '@tanstack/vue-table'
import {PropType, reactive} from "vue";

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

const pageSizes = [10, 20, 30, 50, 100]

let columnVisibility = reactive({}),
    globalFilter = '',
    columnFilters = reactive([]),
    sorting = reactive<SortingState>([]),
    rowSelection = reactive({})


const setSorting = (updater: any) => {
  sorting = updater
}

const table = useVueTable({
  get data() {
    return props.data
  },
  columns: props.columns,
  state: {
    // columnVisibility,
    globalFilter,
    // columnFilters,
    sorting,
    rowSelection
  },
  enableSorting: true,
  onSortingChange: setSorting,
  // onRowSelectionChange: setRowSelection,
  // onColumnVisibilityChange: setColumnVisibility,
  // onGlobalFilterChange: setGlobalFilter,
  // onColumnFiltersChange: setColumnFilters,
  // globalFilterFn: fuzzyFilter,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
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

</script>

<template>
  <div class="row">
    <div class="col">
      <h5>
        <h5 class="fs-0 mb-0 text-nowrap py-2 py-xl-0">
          {{ title }}
        </h5>
      </h5>
    </div>
  </div>
  <div class="row">
    <div class="col col-sm-6 col-lg-4">
      <div class="search-box me-2 mb-2 d-inline-block">
        <div class="position-relative">
          <input v-model="globalFilter" class="search form-control">
          <!--          <DebouncedInput type={'search'} value={globalFilter ?? ''}-->
          <!--          onChange={value => setGlobalFilter(String(value))} placeholder="Search..."-->
          <!--          label={'Search all columns...'}/>-->
          <i class="bx bx-search-alt search-icon"/>
        </div>
      </div>
    </div>
  </div>
  <div class="table-responsive scrollbar">
    <table class="table table-bordered table-striped fs--1 mb-0">
      <thead class="bg-200 text-900">
      <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
      >
        <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
        >
          <div class="cursor-pointer select-none">
            <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
            />
            <span
                class="border rounded p-1"
                @click="header.column.getToggleSortingHandler()"
            >
              {{ header.column.getIsSorted() === 'asc' ? '&ar' : '&downarrow;' }}
            </span>
          </div>
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

    <div class="h-2"/>
    <div class="flex items-center gap-2">
      <button
          class="border rounded p-1"
          @click="() => table.setPageIndex(0)"
          :disabled="!table.getCanPreviousPage()"
      >
        &lt;&lt;
      </button>
      <button
          class="border rounded p-1"
          @click="() => table.previousPage()"
          :disabled="!table.getCanPreviousPage()"
      >
        &lt;
      </button>
      <button
          class="border rounded p-1"
          @click="() => table.nextPage()"
          :disabled="!table.getCanNextPage()"
      >
        &gt;
      </button>
      <button
          class="border rounded p-1"
          @click="() => table.setPageIndex(table.getPageCount() - 1)"
          :disabled="!table.getCanNextPage()"
      >
        &gt;&gt;
      </button>
      <span class="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {{ table.getState().pagination.pageIndex + 1 }} of {{ ' ' }}
            {{ table.getPageCount() }}
          </strong>
        </span>
      <span class="flex items-center gap-1">
          | Go to page:
          <input
              type="number"
              :value="table.getState().pagination.pageIndex + 1"
              @change="goToPage"
              class="border p-1 rounded w-16"
          />
        </span>
      <select
          :value="table.getState().pagination.pageSize"
          @change="setPageSize"
      >
        <option :key="pageSize" :value="pageSize" v-for="pageSize in pageSizes">
          Show {{ pageSize }}
        </option>
      </select>
    </div>
    <div>{{ table.getRowModel().rows.length }} Rows</div>
    <pre>{{ JSON.stringify(table.getState().pagination, null, 2) }}</pre>


  </div>
</template>

<style scoped>

</style>