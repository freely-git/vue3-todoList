<template>
    <div>
        <h1>搜索</h1>
        <a-list tem-layout="horizontal" size="large"  :data-source="search_data">
            <template  #renderItem="{ item }">
                <TodoItem :content="item.content" :id="item.id" :status="item.status" :key="item.id"/>
            </template>
        </a-list>
    </div>
</template>
<script setup lang="ts">
    import TodoItem from "./TodoItem.vue";
    import { useCounterStore } from "@/stores/counter";
    import { storeToRefs } from "pinia";

    const store = useCounterStore();
    const { search_data } = storeToRefs(store);
    console.log(search_data);
    
</script>
<style>
    
</style>