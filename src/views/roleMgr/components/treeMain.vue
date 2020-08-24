<template>
  <el-card>
  <el-tabs v-model="activeName"  @tab-click="handleClick">
    <el-tab-pane  label="下级角色" name="childrenRole">
      <children-role ref="childrenRole" v-if="activeName=='childrenRole'" :getRoleId="getRoleId" :getRoleName="getRoleName"/>
    </el-tab-pane>
    <el-tab-pane  label="角色权限" name="roleFunc">
      <set-role-funcs ref="roleFunc" v-if="activeName=='roleFunc'" :getRoleId="getRoleId" :getRoleName="getRoleName"/>
    </el-tab-pane>
    <el-tab-pane label="角色分配" name="roleEmp">
      <role-emp v-if="activeName=='roleEmp'" :getRoleId="getRoleId" :getRoleName="getRoleName"/>
    </el-tab-pane>
  </el-tabs>
  </el-card>
</template>

<script>
import setRoleFuncs from './setRoleFuncs'
import childrenRole from './childrenRole'
import roleEmp from './roleEmp'
export default {
  name: 'TreeMain',
  props: ['getRoleId', 'getRoleName'],
  components: { childrenRole,setRoleFuncs,roleEmp },
  data() {
    return {
      activeName: 'childrenRole'
    }
  },
  watch: {
    activeName(val) {
      this.activeName = val
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

