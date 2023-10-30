import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../views/TodoList.vue'
import TodoCompleted from '../views/TodoCompleted.vue'
import TodoSearch from '../views/TodoSearch.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/todolist',
      name: 'todoList',
      component: TodoList,
    },
    {
      path: '/todolist/completed',
      name: 'todoCompleted',
      component: TodoCompleted,
    },
    {
      path: '/todolist/search',
      name: 'todoSearch',
      component: TodoSearch,
    }
  ]
})

export default router
