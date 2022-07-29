<script setup lang="ts">
import {
  ColumnDef,
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import {PropType} from 'vue'

const props = defineProps({
  title: String,
  columns: {
    type: Object as PropType<ColumnDef<unknown, any>[]>,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})

const pageSizes = [10, 20, 30, 40, 50];

const table = useVueTable({
  get data() {
    return props.data
  },
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
})
</script>

<template>
  <div id="table">
    <div class="my-3 row">
      <div class="col">
        {{ title }}
      </div>
      <div class="col">
        <input class="search form-control w-50 float-end"/>
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
            <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
            />
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
              @change="e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }"
              class="border p-1 rounded w-16"
          />
        </span>
        <select
            :value="table.getState().pagination.pageSize"
            @change="e => {
        table.setPageSize(Number(e.target.value))
        }"
        >
          <option :key="pageSize" :value="pageSize" v-for="pageSize in pageSizes">
            Show {{ pageSize }}
          </option>
        </select>
      </div>
      <div>{{ table.getRowModel().rows.length }} Rows</div>
      <pre>{{ JSON.stringify(table.getState().pagination, null, 2) }}</pre>

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