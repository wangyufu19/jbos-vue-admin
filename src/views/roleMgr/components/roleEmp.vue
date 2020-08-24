<template>
  <div>
    <div class="filter-container">
      <el-input v-model="search.badgeS" placeholder="工号" class="filter-item" style="width: 200px;" />
      <el-input v-model="search.empNameS" placeholder="姓名" class="filter-item" style="width: 200px;" />
      <el-button size="medium" type="primary" @click="onSearch">查询</el-button>
      <el-button size="medium" type="primary" @click="onReset">重置</el-button>
      <el-button size="medium" style="margin-left: 10px;" type="primary" @click="onShowAdd">新增</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="datas"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
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
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="onDeleteOne(row,$index)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--员工列表分页信息-->
    <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="getRoleEmpList" />
    <!--新增角色用户-->
    <select-role-emp v-if="addOrUpdateVisible" ref="selectRoleUser" @refreshDataList="getRoleEmpList"/>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { getRoleEmpList } from '@/api/role'
import SelectRoleEmp from './selectRoleEmp'
export default {
  components: { Pagination , SelectRoleEmp},
  props: ['getRoleId', 'getRoleName'],
  data() {
    return {
      search: {
        badgeS: '',
        empNameS: ''
      },
      datas: [],
      listLoading: true,
      total: 0,
      queryPage: {
        page: 1,
        limit: 20
      },
      addOrUpdateVisible: false
    }
  },
  watch: {
    getRoleId(val) {
      this.getRoleEmpList()
    }
  },
  created() {
    this.getRoleEmpList()
  },
  methods: {
    getRoleEmpList() {
      this.listLoading = true
      this.queryPage.isPage = 'true'
      this.queryPage.roleId = this.getRoleId
      getRoleEmpList(this.queryPage).then(response => {
        this.datas = response.data.page.list
        this.total = response.data.page.total
        this.listLoading = false
      })
    },
    onSearch() {
      this.queryPage.page = 1
      this.queryPage.badgeS = this.search.badgeS
      this.queryPage.empNameS = this.search.empNameS
      this.getRoleEmpList()
    },
    onReset() {
      this.search = {
        badgeS: '',
        empNameS: ''
      }
    },
    onShowAdd() {
      this.addOrUpdateVisible = true
      this.queryPage.roleId = this.getRoleId
      this.$nextTick(() => {
        this.$refs['selectRoleUser'].init(this.getRoleId)
      })
    },
    onDeleteOne(row, index) {
      deleteEmp({ id: row.id, badge: row.badge }).then(response => {
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

<style lang="scss" scoped>
  .filter-container{
    margin-bottom: 10px;
  }

</style>

