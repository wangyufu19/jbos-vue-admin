<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>角色列表</span>
      </div>
      <div class="filter-container">
        <el-input v-model="search.roleNameS" placeholder="角色名称" class="filter-item" style="width: 300px;" />
        <el-button size="medium" type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="onShowAdd">新增</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="datas"
        border
        stripe
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          prop="roleCode"
          label="角色编码"
          width="400"
        />
        <el-table-column
          prop="roleName"
          label="角色名称"
        />
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="onShowUpdate(row)"> 编辑</el-button>
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="onDeleteOne(row,$index)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="getRoleList" />
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="角色编码" prop="roleCode">
            <el-input v-model="roleForm.roleCode" />
          </el-form-item>
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="roleForm.roleName" />
          </el-form-item>
          <el-form-item label="角色类型" prop="roleType">
            <el-select v-model="roleForm.roleType" placeholder="请选择">
              <el-option label="功能权限" value="100" />
              <el-option label="其它" value="101" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogStatus==='create'?onAdd():onUpdate()">确定 </el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getRoleList, addRole, updateRole, deleteRole } from '@/api/role'
import Pagination from '@/components/Pagination'
export default {
  name: 'RoleMgr',
  components: { Pagination },
  data() {
    return {
      search: {
        roleNameS: ''
      },
      datas: [],
      listLoading: true,
      total: 0,
      queryPage: {
        page: 1,
        limit: 20
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '角色信息-新增',
        update: '角色信息-更新'
      },
      roleForm: {
        id: undefined,
        roleCode: '',
        roleName: ''
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    getRoleList() {
      this.listLoading = true
      getRoleList(this.queryPage).then(response => {
        this.datas = response.data.page.list
        this.total = response.data.page.total
        this.listLoading = false
      })
    },
    onSearch() {
      this.queryPage.page = 1
      this.queryPage.roleNameS = this.search.roleNameS
      this.getRoleList()
    },
    onShowAdd() {
      this.roleForm = {
        id: undefined,
        roleCode: '',
        roleName: ''
      }
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['roleForm'].clearValidate()
      })
    },
    onAdd() {
      this.$refs['roleForm'].validate((valid) => {
        if (valid) {
          addRole(this.roleForm).then(response => {
            this.datas.unshift(this.roleForm)
            this.dialogFormVisible = false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          })
        }
      })
    },
    onShowUpdate(row) {
      this.roleForm = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['roleForm'].clearValidate()
      })
    },
    onUpdate() {
      this.$refs['roleForm'].validate((valid) => {
        if (valid) {
          const formObj = Object.assign({}, this.roleForm)
          updateRole(formObj).then(response => {
            const index = this.datas.findIndex(v => v.id === this.roleForm.id)
            this.datas.splice(index, 1, this.roleForm)
            this.dialogFormVisible = false
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          })
        }
      })
    },
    onDeleteOne(row, index) {
      deleteRole({ id: row.id }).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.datas.splice(index, 1)
      })
    }
  }
}
</script>

<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
</style>
