<script lang="tsx">
import { defineComponent, PropType, toRefs } from "vue";
import { MenuItem, SubMenu } from 'ant-design-vue';
import { RouteRecordRaw, RouterLink } from "vue-router";
import { v4 as uuidv4 } from 'uuid';
const MyMenuItem = defineComponent({
      props: {
            routesMenu: {
                  type: Array as PropType<RouteRecordRaw[]>,
                  default: () => []
            }
      },
      setup(props) {
            const { routesMenu } = toRefs(props)
            return () => (
                  routesMenu.value.map(item => {
                        if (item.children) {
                              return (
                                    <SubMenu title={item.name} >
                                          <MyMenuItem routesMenu={item.children} />
                                    </SubMenu>
                              )
                        }
                        return (
                              <MenuItem key={uuidv4()} >
                                    <RouterLink to={{ path: item.path }} >{item.name}</RouterLink>
                              </MenuItem>
                        )
                  })
            )
      }
})
export default MyMenuItem;
</script>