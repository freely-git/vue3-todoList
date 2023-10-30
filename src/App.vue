<template>
  <a-row>
    <a-col :lg="8" :xs="8">
      <a-affix>
        <header>
          <h1>My-TodoList</h1>
          <a-input-search class="search" placeholder="输入搜索关键词" enter-button @search="searchData" v-model:value="search_value" />
        </header>
        <main>
          <a-menu mode="inline" v-model:selectedKeys="selectedKeys" >
            <a-menu-item key="1" size="large">
              <InboxOutlined />
              <span><router-link to="/todolist">全部</router-link></span>
              <span id="count">
                <a-badge :count=count_num :number-style="{ backgroundColor: '#108ee9', padding: 5, }" style="margin-bottom: 2px;" />
              </span>
            </a-menu-item>
            <a-menu-item key="2" size="large">
              <CheckCircleOutlined />
              <span><router-link to="/todolist/completed">已完成</router-link></span>
              <span id="completed_count">
                <a-badge :count=completed_count_num :number-style="{ backgroundColor: '#999', padding: 5, }" style="margin-bottom: 2px;" />
              </span>
            </a-menu-item>
          </a-menu>
        </main>
      </a-affix>
    </a-col>
    <a-col :lg="16" :xs="16" style="padding-bottom: 100px;">
      <router-view ></router-view>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
  import { InboxOutlined, CheckCircleOutlined} from '@ant-design/icons-vue';
  import { ref, watch } from 'vue';
  import { useCounterStore } from "@/stores/counter";
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
 
  
  const store = useCounterStore();
  const { count_num, completed_count_num } = storeToRefs(store);
  const { search, getData } = store;
  const router = useRouter();
  const search_value = ref("")
  let selectedKeys = ref<string[]>(["1"]);
  
  getData(search_value.value);

  router.push("/todolist");


  function searchData() {
    if (search_value.value != "") {
      router.push("/todolist/search");
      selectedKeys.value = [''];
      search(search_value.value)
    }
  }
  

  watch(() => router.currentRoute.value, (newValue) => {
    console.log(newValue.fullPath);
    
    if(newValue.fullPath == "/todolist/completed") {
      selectedKeys.value = ["2"]
    }else if (newValue.fullPath == "/todolist") {
      selectedKeys.value = ["1"]

    }
  })
  
</script>

<style scoped>
  body {
    margin: 0 !important ;
  }
  header {
    margin-left: 20px;
    padding-top: 40px;
  }
  header .search {
    width: 60%;
    margin-bottom: 10px;
  }

  header h1 {
    margin: 0;
    margin-bottom: 20px;
  }

  main {
    margin-left: 16px;
    margin-top: 15px;
    width: 80%;
  }

  #count,
  #completed_count {
    float: right;
    text-align: center;
  }
</style>
