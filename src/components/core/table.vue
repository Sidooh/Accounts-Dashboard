<script setup lang="ts">

import {computed, onUpdated, PropType} from "vue";
import List, {ListOptions} from "list.js";

interface Column {
  name: string,
  title: string
}

const props = defineProps({
  columns: {
    type: Object as PropType<Column[]>,
    required: true
  },
  rows: {
    type: Array,
    required: true
  }
})

const columnNames = computed(() => {
  return props.columns.map((column: Column) => column.name)
})

const options: ListOptions = {
  valueNames: columnNames.value,
  page: 5,
  item: 'item',
  pagination: {
    outerWindow: 2,
    item: '<li>' +
        '<a class="page btn btn-sm btn-falcon-default me-1" type="button"></a>' +
        '</li>'
  }
};

// const list = new List('table', options, props.rows as object[]);

onUpdated(() => {
  const list = new List('table', options, props.rows as object[]);

  // list.clear()
  // list.update()
})
</script>

<template>
  <div v-show="false">
    <tr id="item">
      <td :class="column.name" v-for="column in columns"></td>
    </tr>
  </div>

  <div id="table">
    <div class="my-3 row">
      <div class="col">
        Table
      </div>
      <div class="col">
        <input class="search form-control w-50 float-end"/>
      </div>
    </div>
    <div class="table-responsive scrollbar">
      <table class="table table-bordered table-striped fs--1 mb-0">
        <thead class="bg-200 text-900">
        <tr>
          <th class="sort" :data-sort="column.name" v-for="column in columns">{{ column.title }}</th>
        </tr>
        </thead>
        <tbody class="list">
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <ul class="pagination mb-0"></ul>
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