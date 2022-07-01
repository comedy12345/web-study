import { defineStore } from 'pinia';

const routeHistorys:IrouteHistory[]=[]
export const useRouteHistoryStore = defineStore('routeHistory', {
      state() {
            return{
                  routeHistorys,
            }
      },
})
export interface IrouteHistory{
      id:string,
      name:string,
      path:string,
}