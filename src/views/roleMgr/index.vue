<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <leftTree @getRole="setRole"/>
      </el-col>
      <el-col :span="18" :xs="24">
        <treeMain :getRoleId="roleId" :getRoleName="roleName"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { leftTree,treeMain } from './components'
export default {
  name: 'RoleMgr',
  components: {
    leftTree,
    treeMain
  },
  data() {
    return {
      roleId: undefined,
      roleName: undefined
    }
  },
  methods: {
    setRole(org) {
      this.roleId = org.id
      this.roleName = org.text
    }
  }
}
</script>
