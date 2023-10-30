import { defineStore } from 'pinia'
import { v4 as uuidv4 } from "uuid";

export const useCounterStore = defineStore('counter',  {
  state:()=>{
    return {
      data: [{}],
      completed: [{}],
      search_data: [{}],
      search_target: "",
      completed_count_num: 0,
      count_num: 0
    }
  },
  actions: {
    getData(search_value: String="") {
      const all_data = JSON.parse(localStorage.getItem("todo_list") || '[]');
      const target = search_value == "" ?  this.search_target : search_value;
      this.data = all_data.filter((e:any)=>{
        if( e.status != 1) {
          return e;
        }
      })
      this.completed = all_data.filter((e:any)=>{
        if( e.status != 0) {
          return e;
        }
      })
      if (search_value != "" || this.search_target != "") {
        this.search_data = all_data.filter((e:any)=>{
          if(e.content.indexOf(target) != -1) {
            return e
          }
        })
      }else {
        this.search_data = [];
      }

      this.count_num = this.data.length;
      this.completed_count_num = this.completed.length
    },
    addData(text:String) {
      const obj = {
        "id": uuidv4(),
        "content": text,
        "status": false
      }
      this.data.unshift(obj);
      const all_data = this.data.concat(this.completed);
      localStorage.setItem("todo_list", JSON.stringify(all_data));
      this.getData()
    },
    deleteData(id:any) {
      const all_data = this.data.concat(this.completed);
      const res:Array<object> = all_data.filter((e:any)=>{ 
        if (e.id != id) {
          return e;
        }
      })

      localStorage.setItem("todo_list", JSON.stringify(res));

      this.getData()
    },
    updateData(obj:any) {
      const all_data = this.data.concat(this.completed);
      const res:Array<object> = all_data.filter((e:any)=>{ 
        if (e.id == obj.id) {
          e.status = obj.status;
          e.content = obj.content;
        }
        return e
      })

      localStorage.setItem("todo_list", JSON.stringify(res));
      this.getData()
    },
    search(value:any) {
      this.getData();
      const all_data = this.data.concat(this.completed);
      this.search_data = all_data.filter((e:any)=>{
        if(e.content.indexOf(value) != -1) {
          return e
        }
      })
      this.search_target = value
    }
  },
})



