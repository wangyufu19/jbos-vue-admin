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
        width="100"
      />
      <el-table-column
        prop="depName"
        label="所属部门"
        width="100"
      />
      <el-table-column
        prop="headShip"
        label="职务"
        width="100"
      />
      <el-table-column
        prop="empStatus"
        label="员工状态"
      />
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="onShowUpdate(row)"> 编辑</el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="onDeleteOne(row,$index)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--员工列表分页信息-->
    <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="getEmpList" />
    <!--新增或编辑人员信息-->
    <add-or-edit-emp v-if="addOrUpdateVisible" ref="addOrEditEmp" @refreshDataList="getEmpList" />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { getEmpList, deleteEmp } from '@/api/emp'
import AddOrEditEmp from './addOrEditEmp'
export default {
  components: { Pagination, AddOrEditEmp },
  props: ['getOrgId', 'getOrgName'],
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
    getOrgId(val) {
      this.getEmpList()
    }
  },
  created() {
    this.getEmpList()
  },
  methods: {
    getEmpList() {
      this.listLoading = true
      this.queryPage.isPage = 'true'
      this.queryPage.orgId = this.getOrgId
      getEmpList(this.queryPage).then(response => {
        this.datas = response.data.page.list
        this.total = response.data.page.total
        this.listLoading = false
      })
    },
    onSearch() {
      this.queryPage.page = 1
      this.queryPage.badgeS = this.search.badgeS
      this.queryPage.empNameS = this.search.empNameS
      this.getEmpList()
    },
    onReset() {
      this.search = {
        badgeS: '',
        empNameS: ''
      }
    },
    onShowAdd() {
      this.addOrUpdateVisible = true
      const formObj = Object()
      formObj.orgId = this.getOrgId
      formObj.orgName = this.getOrgName
      this.$nextTick(() => {
        this.$refs['addOrEditEmp'].init(formObj, 'create')
      })
    },
    onShowUpdate(row) {
      const formObj = Object.assign({}, row)
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs['addOrEditEmp'].init(formObj, 'update')
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

