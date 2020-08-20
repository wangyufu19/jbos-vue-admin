<template>

    <el-card>
      <div class="filter-container">
        <el-input v-model="search.roleNameS" placeholder="角色名称" class="filter-item" style="width: 300px;" />
        <el-button size="medium" type="primary" @click="onSearch">查询</el-button>
        <el-button size="medium" type="primary" @click="onReset">重置</el-button>
        <el-button size="medium" style="margin-left: 10px;" type="primary" @click="onShowAdd">新增</el-button>
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
          width="300"
        />
        <el-table-column
          prop="roleName"
          label="角色名称"
          width="300"
        />
        <el-table-column label="操作" align="center" >
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="onShowUpdate(row)"> 编辑</el-button>
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="onDeleteOne(row,$index)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--角色列表分页信息-->
      <pagination v-show="total>0" :total="total" :page.sync="queryPage.page" :limit.sync="queryPage.limit" @pagination="getRoleList" />
      <!--新增或编辑角色信息-->
      <add-or-edit-role v-if="addOrUpdateVisible" ref="addOrEditRole" @refreshDataList="getRoleList"/>
    </el-card>

</template>

<script>
import { getRoleList, deleteRole } from '@/api/role'
import Pagination from '@/components/Pagination'
import AddOrEditRole from './addOrEditRole'

export default {
  name: 'RoleMgr',
  props: ['getRoleId', 'getRoleName'],
  components: { Pagination, AddOrEditRole},
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
      addOrUpdateVisible: false
    }
  },
  created() {
    this.getRoleList()
  },
  watch: {
    getRoleId(val) {
      this.getRoleList()
    }
  },
  methods: {
    getRoleList() {
      this.listLoading = true
      this.queryPage.parentId = this.getRoleId
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
    onReset() {
      this.search = {
        roleNameS: ''
      }
    },
    onShowAdd() {
      this.addOrUpdateVisible = true
      const obj = Object()
      obj.parentId = this.getRoleId
      this.$nextTick(() => {
        this.$refs['addOrEditRole'].init(obj, 'create')
      })
    },
    onShowUpdate(row) {
      const roleForm = Object.assign({}, row)
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs['addOrEditRole'].init(roleForm, 'update')
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
