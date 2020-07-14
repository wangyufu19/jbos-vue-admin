<template>
  <div>
    <div class="filter-container">

      <el-input v-model="search.depCodeS" placeholder="部门编码" class="filter-item" style="width: 200px;" />
      <el-input v-model="search.depNameS" placeholder="部门名称" class="filter-item" style="width: 200px;" />
      <el-button  size="medium" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button size="medium" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
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
        prop="depCode"
        label="部门编码"
        width="100"
      />
      <el-table-column
        prop="depName"
        label="部门名称"
        width="100"
      />
      <el-table-column
        prop="depLevel"
        label="部门级别"
        width="100"
      />
      <el-table-column
        prop="depCharge"
        label="部门负责人"
        width="100"
      />
      <el-table-column
        prop="depDirector"
        label="部门分管领导"
      />
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)"> 编辑</el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)"> 删除 </el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="depForm" :rules="rules" ref="depForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="部门编码" prop="depCode">
          <el-input v-model="depForm.depCode"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="depCode">
          <el-input v-model="depForm.depName"></el-input>
        </el-form-item>
        <el-form-item label="部门级别" prop="depLevel">
          <el-select v-model="depForm.depLevel" placeholder="请选择">
            <el-option label="一级部门" value="100"></el-option>
            <el-option label="二级部门" value="101"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门负责人" prop="depCharge">
        </el-form-item>
        <el-form-item label="部门分管领导" prop="depDirector">
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getDepList } from '@/api/dep'
export default {
  props: ['getOrgId'],
  data() {
    return {
      search: {
        depCodeS: '',
        depNameS: ''
      },
      datas: [],
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '部门信息-新增',
        update: '部门信息-更新'
      },
      depForm: {
        depCode: '',
        depName: ''
      }
    }
  },
  created() {
    this.getDepList(this.getOrgId)
  },
  watch: {
    getOrgId(val) {
      this.getDepList(this.getOrgId)
    }
  },
  methods: {
    getDepList(orgId) {
      this.listLoading = true
      getDepList({ orgId: orgId }).then(response => {
        this.datas = response.data.deps
        this.listLoading = false
      })
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['depForm'].clearValidate()
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
