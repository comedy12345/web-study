<script lang="tsx">
import { defineComponent } from "vue";
import { Tag } from 'ant-design-vue';
import { useLayout } from "@/hooks/useLayout";
export default defineComponent({
      setup() {
            const { state, route, removeRouteHistory, routerLinkHander } = useLayout();
            return () => (
                  <div class="my-route-tag">
                        {
                              state.routeHistorys.map(item => {
                                    return (
                                          <Tag class={{ active: route.path === item.path }}
                                                closable
                                                onClose={removeRouteHistory(item.id)}
                                                key={item.id}
                                          >
                                                <span onClick={routerLinkHander(item.path)}>{item.name}</span>
                                          </Tag>
                                    )
                              })
                        }
                  </div>
            )
      }
})
</script>
<style lang="scss" scoped>
.my-route-tag {
      height: 30px;

      .ant-tag {
            height: 26px;
            line-height: 24px;
            cursor: pointer;

      }

      .active {
            background-color: #42b983;
            color: #fff;
            border: 1px solid #42b983;

            :deep(svg) {
                  color: #fff;
            }
      }
}
</style>