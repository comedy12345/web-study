import { router } from '@/route';
import { useRouteHistoryStore } from "@/store/routeHistory";

router.beforeEach((to, from) => {
      const { $state:{ routeHistorys ,selectdOpenKeys},editSelectdOpenKeys }=useRouteHistoryStore();

      const parentPath = to.path.split('/')[1];

      const path = parentPath && selectdOpenKeys.find(item=>item==='/'+parentPath)
      
      if( parentPath && !path ){
            editSelectdOpenKeys([...selectdOpenKeys,"/"+parentPath]);
      }

      if(!routeHistorys.find(item=>item.path===to.path)){
            routeHistorys.push({id:String(new Date().getTime()),name:String(to.name) ,path:to.path})
      }
      return true
})