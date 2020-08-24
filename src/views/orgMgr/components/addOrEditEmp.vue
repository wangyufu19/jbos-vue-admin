<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form ref="formObj" :model="formObj" :rules="rules" label-width="100px" class="demo-ruleForm" >
      <el-form-item label="工号" prop="badge">
        <el-input v-model="formObj.badge" v-if="dialogStatus==='create'" :disabled="false"/>
        <el-input v-model="formObj.badge" v-else-if="dialogStatus==='update'" :disabled="true"/>
      </el-form-item>
      <el-form-item label="姓名" prop="empName">
        <el-input v-model="formObj.empName" />
      </el-form-item>
      <el-form-item label="所属机构" prop="orgName">
        <el-input v-model="formObj.orgName" :disabled="true" />
      </el-form-item>
      <el-form-item label="所属部门" prop="depName">
        <el-select
          v-model="formObj.depName"
          filterable
          clearable
          remote
          reserve-keyword
          placeholder="请输入"
          :remote-method="onSearchDep"
          :loading="loading"
          @change="onDepChange"
        >
          <el-option
            v-for="item in deps"
            :key="item.id"
            :label="item.depName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="职务" prop="headShip">
        <el-select
          v-model="formObj.headShip"
          clearable
          :loading="loading"
          placeholder="请选择">
          <el-option
            v-for="item in headShipDict"
            :key="item.DICTID"
            :label="item.DICTNAME"
            :value="item.DICTID"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?onAdd():onUpdate()">确定 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getCacheDictCodeList } from '@/api/dict'
import { addEmp, updateEmp } from '@/api/emp'
import { getDepList } from '@/api/dep'
export default {
  name: 'AddOrEditEmp',
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '人员信息-新增',
        update: '人员信息-更新'
      },
      formObj: {
        badge: '',
        empName: '',
        orgId: '',
        orgName: '',
        depId: '',
        depName: '',
        headShip: '',
        empStatus: 'running'
      },
      deps: [],
      headShipDict: [],
      empStatusDict: [],
      loading: false,
      rules: {
        badge: [{ required: true, message: '工号必须填写', trigger: 'change' }],
        empName: [{ required: true, message: '姓名必须填写', trigger: 'change' }],
        depName: [{ required: true, message: '所属部门必须填写', trigger: 'change' }],
        empStatus: [{ required: true, message: '员工状态必须填写', trigger: 'change' }]
      }
    }
  },
  methods: {
    init(formObj, dialogStatus) {
      if (dialogStatus === 'create') {
        this.dialogStatus = dialogStatus
        this.dialogFormVisible = true
        this.formObj = {
          id: undefined,
          badge: '',
          empName: '',
          orgId: formObj.orgId,
          orgName: formObj.orgName,
          depName: '',
          headShip: '',
          empStatus: 'running'
        }
        this.$nextTick(() => {
          this.$refs['formObj'].clearValidate()
        })
      } else {
        this.dialogStatus = dialogStatus
        this.dialogFormVisible = true
        this.formObj = formObj
      }
      this.deps = []
      this.initHeadShip()
      this.initEmpStatus()
    },
    initHeadShip(){
      this.loading = true
      getCacheDictCodeList({typeId: 'JBOS_HEADSHIP'}).then(response => {
        this.headShipDict = response.data.dictCodes
        this.loading = false
      })
    },
    initEmpStatus(){
      this.loading = true
      getCacheDictCodeList({typeId: 'JBOS_EMP_STATUS'}).then(response => {
        this.empStatusDict = response.data.dictCodes
        this.loading = false
      })
    },
    onSearchDep(query) {
      if (query !== '') {
        this.loading = true
        this.formObj.depNameS = query
        getDepList(this.formObj).then(response => {
          this.deps = response.data.deps
          this.loading = false
        })
      } else {
        this.deps = []
      }
    },
    onDepChange(value) {
      this.formObj.depId = value
    },
    onAdd() {
      this.$refs['formObj'].validate((valid) => {
        if (valid) {
          addEmp(this.formObj).then(response => {
            this.dialogFormVisible = false
            this.$emit('refreshDataList')
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          })
        }
      })
    },
    onUpdate() {
      this.$refs['formObj'].validate((valid) => {
        if (valid) {
          updateEmp(this.formObj).then(response => {
            this.dialogFormVisible = false
            this.$emit('refreshDataList')
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
