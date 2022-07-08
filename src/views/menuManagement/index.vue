
<template>
      <div class="draggable-study">

            <a-table id="table" :dataSource="dataSource" :columns="columns" />
            <!-- <div v-for="({ id, value }, index) in list" :key="id" :drag-index="index" draggable="true"
                  @dragstart="dragstartHander" @dragover="e => e.preventDefault()" @drop="dropHander">
                  {{ value }}
            </div> -->

      </div>
</template>
<script lang="ts">

</script>

<script lang="ts" setup>
import { ref, onMounted } from 'vue-demi';
import CustomDragDrop from "./CustomDragDrop";
onMounted(() => {
      new CustomDragDrop(
            {
                  el: ".ant-table-tbody",
                  drop: ({ firstIndex, lastIndex }) => {
                        const startObj = { ...dataSource.value[firstIndex!] };
                        dataSource.value[firstIndex!] = dataSource.value[lastIndex!];
                        dataSource.value[lastIndex!] = startObj;
                  }
            });
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
            address: '西湖区湖底0000000000000000公园1号1111111111',
      },
]);

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
];
const dragstartHander = (event: DragEvent) => {
      const dom: any = event.target;
      event!.dataTransfer!.setData('data', dom.getAttribute('drag-index'));
}

const dropHander = (event: DragEvent) => {
      event.preventDefault();
      const dom: any = event.target;
      const startIndex: number = parseInt(event.dataTransfer?.getData('data')!);
      const endIndex: number = dom.getAttribute('drag-index');
      const startObj = { ...dataSource.value[startIndex] };
      dataSource.value[startIndex] = dataSource.value[endIndex];
      dataSource.value[endIndex] = startObj;
}
</script>

<style lang="scss" scoped>
.draggable-study {}
</style>