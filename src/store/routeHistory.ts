import { defineStore } from 'pinia';
import { Key } from "ant-design-vue/lib/vc-table/interface";

const routeHistorys:IrouteHistory[] = [];
const selectdOpenKeys:Key[] =JSON.parse(sessionStorage.getItem('selectdOpenKeys')!)||[];

export const useRouteHistoryStore = defineStore('routeHistory', {
      state() {
            return{
                  routeHistorys,
                  selectdOpenKeys
            }
      },
      actions:{
            editSelectdOpenKeys(newVal:Key[]){
                  this.selectdOpenKeys=newVal;
                  sessionStorage.setItem('selectdOpenKeys',JSON.stringify(newVal));
            }
      }
})    
export interface IrouteHistory{
      id:string,
      name:string,
      path:string,
}