import { useRouteHistoryStore } from "@/store/routeHistory";
import { useRoute, useRouter } from "vue-router";
import { v4 as uuidv4 } from 'uuid';
export function useLayout() {
            const route = useRoute();
            const router = useRouter();
            let { $state: state } = useRouteHistoryStore();
            const routerLinkHander = (path: string) => {
                  return () => {
                        router.push(path);
                  }
            }
            const removeRouteHistory = (id: string) => {
                  return () => {
                        state.routeHistorys = state.routeHistorys.filter((item: { id: string; }) => item.id !== id)
                  }
            }
            return {
                  route,
                  router,
                  state,
                  routerLinkHander,
                  removeRouteHistory,
                  uuidv4
            }
}