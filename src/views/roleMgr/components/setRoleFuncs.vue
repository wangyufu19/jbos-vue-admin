<template>
  <el-card>
    <el-tree
      ref="tree"
      :data="items"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
    />

    <el-button type="primary" size="mini" @click="onSaveRoleFuncs()">确定 </el-button>
  </el-card>
</template>

<script>
import { getFuncTree } from '@/api/func'
import { getRoleFuncs,saveRoleFuncs } from '@/api/role'
export default {
  name: 'SetRoleFuncs',
  props: ['getRoleId', 'getRoleName'],
  data() {
    return {
      filterText: '',
      items: [],
      hasCheckedKeyIds: [],
      defaultProps: {
        label: 'text',
        children: 'children'
      }
    }
  },
  created() {
    this.loadTreeData('0')
  },
  watch: {
    getRoleId(val) {
      this.loadTreeData('0')
    }
  },
  methods: {

    async loadTreeData(parentId) {
      await getFuncTree({ parentId: parentId }).then(response => {
        this.items = response.data.funcTree
      })
      await getRoleFuncs({ roleId: this.getRoleId}).then(response => {
        this.hasCheckedKeyIds = response.data.roleFuncs
        this.$refs.tree.setCheckedKeys(this.hasCheckedKeyIds,false)
      })
    },
    onSaveRoleFuncs() {
      const checkedIds = this.$refs.tree.getCheckedKeys()
      saveRoleFuncs({roleId: this.getRoleId,checkedIds: checkedIds}).then(response => {
        this.dialogFormVisible = false
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
