<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <el-tree
      ref="tree"
      :data="items"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
    />
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="onSaveRoleFuncs()">确定 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getFuncTree } from '@/api/func'
import { getRoleFuncs,saveRoleFuncs } from '@/api/role'
export default {
  name: 'SetRoleFuncs',
  data() {
    return {
      title: '角色信息-权限设置',
      dialogFormVisible: false,
      roleId: null,
      filterText: '',
      items: [],
      hasCheckedKeyIds: [],
      defaultProps: {
        label: 'text',
        children: 'children'
      }
    }
  },
  methods: {
    init(roleId) {
      this.dialogFormVisible = true
      this.roleId = roleId
      this.loadTreeData('0')
    },
    async loadTreeData(parentId) {
      await getFuncTree({ parentId: parentId }).then(response => {
        this.items = response.data.funcTree
      })
      await getRoleFuncs({ roleId: this.roleId }).then(response => {
        this.hasCheckedKeyIds = response.data.roleFuncs
        this.$refs.tree.setCheckedKeys(this.hasCheckedKeyIds,false)
      })
    },
    onSaveRoleFuncs() {
      const checkedIds = this.$refs.tree.getCheckedKeys()
      saveRoleFuncs({roleId: this.roleId,checkedIds: checkedIds}).then(response => {
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
