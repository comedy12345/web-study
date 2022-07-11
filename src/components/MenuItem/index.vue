<script lang="tsx">
import { defineComponent, PropType, toRefs } from "vue";
import { MenuItem, SubMenu } from 'ant-design-vue';
import { RouteRecordRaw, RouterLink } from "vue-router";
const MyMenuItem = defineComponent({
      props: {
            routesMenu: {
                  type: Array as PropType<RouteRecordRaw[]>,
                  default: () => []
            }
      },
      setup(props) {
            const { routesMenu } = toRefs(props);
            return () => (
                  routesMenu.value.map(item => {
                        if (item.children) {
                              return (
                                    <SubMenu title={item.name} key={item.path} >
                                          <MyMenuItem routesMenu={item.children} />
                                    </SubMenu>
                              )
                        }
                        return (
                              <MenuItem key={item.path} >
                                    <RouterLink to={{ path: item.path }}>{item.name}</RouterLink>
                              </MenuItem>
                        )
                  })
            )
      }
})
export default MyMenuItem;
</script>