<template>
  <el-dialog :title="title" :width="width"  :visible.sync="dialogFormVisible">
    <div class="filter-container">
      <el-input v-model="search.badgeS" placeholder="工号" class="filter-item" style="width: 200px;" />
      <el-input v-model="search.empNameS" placeholder="姓名" class="filter-item" style="width: 200px;" />
      <el-button size="medium" type="primary" @click="onSearch">查询</el-button>
      <el-button size="medium" type="primary" @click="onReset">重置</el-button>
    </div>
    <div class="filter-container">
      <el-button type="primary" @click="onAddSelectRoleEmp">确定 </el-button>
    </div>
    <el-table
      ref="t1"
      v-loading="listLoading"
      :data="datas"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55"
      />

      <el-table-column
        prop="badge"
        label="工号"
        width="100"
      />
      <el-table-column
        prop="empName"
        label="姓名"
        width="100"
      />
      <el-table-column
        prop="orgName"
        label="所属机构"
        width="160"
      />
      <el-table-column
        prop="depName"
        label="所属部门"
        width="160"
      />
      <el-table-column
        prop="headShipName"
        label="职务"
      />
    </el-table>
    <!--员工列表分页信息-->
    <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="getSelectRoleEmpList" />
  </el-dialog>
</template>
<script>
import Pagination from '@/components/Pagination'
import { getSelectRoleEmpList, addRoleUser } from '@/api/role'

export default {
  components: { Pagination },
  data() {
    return {
      dialogFormVisible: false,
      title: '角色分配-选择用户',
      width: '60%',
      height: '60%',
      search: {
        badgeS: '',
        empNameS: ''
      },
      datas: [],
      listLoading: true,
      roleId: '',
      total: 0,
      queryPage: {
        page: 1,
        limit: 20
      }
    }
  },

  methods: {
    init(roleId) {
      this.roleId = roleId
      this.dialogFormVisible = true
      this.getSelectRoleEmpList()
    },
    getSelectRoleEmpList() {
      this.listLoading = true
      this.queryPage.isPage = 'true'
      this.queryPage.roleId = this.roleId
      getSelectRoleEmpList(this.queryPage).then(response => {
        this.datas = response.data.page.list
        this.total = response.data.page.total
        this.listLoading = false
      })
    },
    onSearch() {
      this.queryPage.page = 1
      this.queryPage.badgeS = this.search.badgeS
      this.queryPage.empNameS = this.search.empNameS
      this.getSelectRoleEmpList()
    },
    onReset() {
      this.search = {
        badgeS: '',
        empNameS: ''
      }
    },
    onAddSelectRoleEmp() {
      const emps = this.$refs.t1.selection
      if(emps.length<=0) {
        this.$message({
          message: '请选择用户',
          type: 'success'
        })
        return
      }
      addRoleUser({ roleId: this.roleId, emps: emps }).then(response => {
        this.dialogFormVisible = false
        this.$emit('refreshDataList')
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-container{
    margin-bottom: 10px;
  }

</style>

