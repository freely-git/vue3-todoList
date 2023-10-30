<template>
    <a-list-item :data-id=id>
        <a-list-item-meta>
            <template #title>
                <a :class="cls" @click="showDrawer">{{ content }}</a>
            </template>
            <template #avatar>
                <a-checkbox v-model:checked=msg></a-checkbox>
            </template>
        </a-list-item-meta>
        <a-button type="dashed" danger :icon="h(DeleteOutlined)" @click="deleteData(id)"/>
    </a-list-item>
    <a-drawer
        title="修改"
        :width="350"
        :open="open"
        :body-style="{ paddingBottom: '80px' }"
        :footer-style="{ textAlign: 'right' }"
        @close="onClose"
    >
    <a-form :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="16">
          <a-form-item label="内容" name="data">
            <a-input v-model:value="form.data" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="onClose">取消</a-button>
        <a-button type="primary" @click="update"><FormOutlined />修改</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
  import { h, watch, ref, reactive } from 'vue';
  import { DeleteOutlined, FormOutlined } from '@ant-design/icons-vue';
  import { useCounterStore } from "@/stores/counter";
  import type { Rule } from 'ant-design-vue/es/form';

  const props = defineProps({
      content: String,
      id: String,
      status: Boolean,
      line_through: String,
      color: String
  })

  const form = reactive({
    data: ref(props.content)
  });

  const rules: Record<string, Rule[]> = {
    data: [{ required: true, message: '任务内容不为空' }]
  };

  const open = ref<boolean>(false);

  const showDrawer = () => {
    open.value = true;
  };

  const onClose = () => {
    open.value = false;
  };

  

  const update = () => {
    if(form.data != props.content && form.data != "" ) {
      const obj = {id: props.id, content: form.data, status: msg.value}
      updateData(obj);
      open.value = false
    }
  }

  const store = useCounterStore();
  const { deleteData, updateData } = store;
  
  let msg = ref(props.status);
  let cls = "";
  msg.value == true ? cls="completed" : cls="";


  
  
  watch(() => msg.value, (newValue) => {
      newValue == true ? cls="completed" : cls="";
      const obj = {id: props.id, content: props.content, status: newValue}
      updateData(obj)
  })

   
    
</script>


<style>
    .completed {
        text-decoration: line-through;
        color: #8f8c8c !important;
    }
</style>