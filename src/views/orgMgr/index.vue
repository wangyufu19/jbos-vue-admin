<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <leftTree @getOrg="setOrg"/>
      </el-col>
      <el-col :span="18" :xs="24">
        <treeMain :getOrgId="orgId" :getOrgName="orgName"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { leftTree, treeMain } from './components'
export default {
  name: 'OrgMgr',
  components: {
    leftTree,
    treeMain
  },
  data() {
    return {
      orgId: undefined,
      orgName: undefined
    }
  },
  methods: {
    setOrg(org) {
      this.orgId = org.id
      this.orgName = org.text
    }
  }
}
</script>
