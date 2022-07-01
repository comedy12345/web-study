import {router} from '@/route';
import {useRouteHistoryStore} from "@/store/routeHistory";

router.beforeEach((to, from) => {
      const {$state:{routeHistorys}}=useRouteHistoryStore();
      if(!routeHistorys.find(item=>item.path===to.path)){
            routeHistorys.push({id:String(new Date().getTime()),name:String(to.name) ,path:to.path})
      }
      return true
})