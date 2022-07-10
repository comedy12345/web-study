
<template>
  <div class="draggable-study">
    <a-table id="table" :dataSource="dataSource" :columns="columns" />
    <div class="div">
      <div v-for="item in dataSource" :key="item.key">
        {{ item }}
      </div>
    </div>
    <ul class="ul">
      <li v-for="item in dataSource" :key="item.key">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
</script>

<script lang="ts" setup>
import { ref, onMounted } from 'vue-demi'
import CustomDragDrop from './CustomDragDrop'
onMounted(() => {
  new CustomDragDrop({
    el: '.ant-table-tbody',
    drop: ({ firstIndex, lastIndex }) => {
      const startObj = { ...dataSource.value[firstIndex!] }
      dataSource.value[firstIndex!] = dataSource.value[lastIndex!]
      dataSource.value[lastIndex!] = startObj
    },
  })
  new CustomDragDrop({
    el: '.div',
    drop: ({ firstIndex, lastIndex }) => {
      const startObj = { ...dataSource.value[firstIndex!] }
      dataSource.value[firstIndex!] = dataSource.value[lastIndex!]
      dataSource.value[lastIndex!] = startObj
    },
  })
  new CustomDragDrop({
    el: '.ul',
    drop: ({ firstIndex, lastIndex }) => {
      const startObj = { ...dataSource.value[firstIndex!] }
      dataSource.value[firstIndex!] = dataSource.value[lastIndex!]
      dataSource.value[lastIndex!] = startObj
    },
  })
})

const dataSource = ref([
  {
    key: '1',
    name: '胡彦斌1111111111',
    age: 1,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 2,
    address: '西湖区湖底公园1号1111111111',
  },
  {
    key: '3',
    name: '胡彦祖sadasd adasdasd',
    age: 3,
    address: '西湖asd区湖底公园asd1号1111111111',
  },
  {
    key: '4',
    name: '胡彦祖',
    age: 4,
    address: '西湖区湖底000000000000111111111111111111111111111111111111111111111111111111111111111111111111110000公园1号1111111111111111111111111111111111111111111111111111',
  },
  {
    key: '5',
    name: '胡彦祖',
    age: 5,
    address: '111',
  },
])

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
]
</script>

<style lang="scss" scoped>
</style>