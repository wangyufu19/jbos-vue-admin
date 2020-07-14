<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <leftTree @getParentId="setParentId" />
      </el-col>
      <el-col :span="18" :xs="24">
        <treeMain :getParentId="parentId"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { leftTree, treeMain } from './components'
export default {
  name: 'FuncMgr',
  components: {
    leftTree,
    treeMain
  },
  data() {
    return {
      parentId: undefined
    }
  },
  methods: {
    setParentId(parentId) {
      this.parentId = parentId
    }
  }
}
</script>

<style scoped>

</style>
