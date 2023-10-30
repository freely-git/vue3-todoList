<template>
    <H1>任务</H1>
    <a-list tem-layout="horizontal" size="large"  :data-source="data">
        <template  #renderItem="{ item }">
            <TodoItem :content="item.content" :id="item.id" :status="item.status" :key="item.id"/>
        </template>
    </a-list>
    <div id="add">
        <a-input-group compact style="width: 100%;" size="large">
            <a-button type="primary"  @click="add()">
            <template #icon>
                <PlusOutlined />
            </template>
            </a-button>
            <a-input style="width: calc(100% - 32px)" placeholder="添加任务" @keyup.enter="add()" v-model:value="msg"/>
        </a-input-group>
    </div>
</template>

<script setup lang="ts">
    import TodoItem from "./TodoItem.vue";
    import { PlusOutlined } from '@ant-design/icons-vue';
    import { useCounterStore } from "@/stores/counter";
    import { storeToRefs } from "pinia";
    import { ref } from "vue";


    const store = useCounterStore();
    const {addData, getData} = store
    let {data} = storeToRefs(store) 
    let msg = ref("");
    getData()
    
    function add() {
        if( msg.value != "") {
            addData(msg.value)
            msg.value = "";
        }
    }

</script>

<style scoped>
    #add {
        position: fixed;
        bottom: 0;
        z-index: 1;
        width: 65%;
        padding-bottom: 45px;
        padding-top: 15px;
        background-color: rgba(255, 255, 255, .9);
  }
</style>