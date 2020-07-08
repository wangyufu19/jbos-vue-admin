<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <leftTree/>
        </el-col>
        <el-col :span="18" :xs="24">
          <treeMain/>
        </el-col>
      </el-row>
    </div>
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
  created() {
    this.$store.commit('orgtree/SET_CURRENT_NODEID', '0')
  }
}
</script>
