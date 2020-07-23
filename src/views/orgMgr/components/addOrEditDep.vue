<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form ref="formObj" :model="formObj" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="部门编码" prop="depCode">
        <el-input v-model="formObj.depCode" v-if="dialogStatus==='create'" :disabled="false"/>
        <el-input v-model="formObj.depCode" v-else-if="dialogStatus==='update'" :disabled="true"/>
      </el-form-item>
      <el-form-item label="部门名称" prop="depName">
        <el-input v-model="formObj.depName" />
      </el-form-item>
      <el-form-item label="部门级别" prop="depLevel">
        <el-select
          v-model="formObj.depLevel"
          clearable
          :loading="loading"
          placeholder="请选择">
          <el-option
            v-for="item in devLevelDict"
            :key="item.DICTID"
            :label="item.DICTNAME"
            :value="item.DICTID"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门负责人" prop="depChargeName">
        <el-select
          v-model="formObj.depChargeName"
          filterable
          clearable
          remote
          reserve-keyword
          placeholder="请输入"
          :remote-method="onSearchDepEmp"
          :loading="loading"
          @change="onDepChargeChange"
        >
          <el-option
            v-for="item in emps"
            :key="item.badge"
            :label="item.depEmpName"
            :value="item.badge"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门分管领导" prop="depDirectorName">
        <el-select
          v-model="formObj.depDirectorName"
          filterable
          clearable
          remote
          reserve-keyword
          placeholder="请输入"
          :remote-method="onSearchDepEmp"
          :loading="loading"
          @change="onDepDirectorChange"
        >
          <el-option
            v-for="item in emps"
            :key="item.badge"
            :label="item.depEmpName"
            :value="item.badge"
            :loading="loading"
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
import { addDep, updateDep } from '@/api/dep'
import { getEmpList } from '@/api/emp'
export default {
  name: 'AddOrEditDep',
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '部门信息-新增',
        update: '部门信息-更新'
      },
      formObj: {
        orgId: '',
        depCode: '',
        depName: '',
        depLevel: '',
        depCharge: '',
        depDirector: ''
      },
      emps: [],
      devLevelDict: [],
      loading: false,
      rules: {
        depCode: [{ required: true, message: '部门编码必须填写', trigger: 'change' }],
        depName: [{ required: true, message: '部门名称必须填写', trigger: 'change' }],
        depLevel: [{ required: true, message: '部门级别必须填写', trigger: 'change' }]
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
          orgId: formObj.orgId,
          depCode: '',
          depName: '',
          depLevel: '',
          depCharge: '',
          depChargeName: '',
          depDirector: '',
          depDirectorName: ''
        }
        this.$nextTick(() => {
          this.$refs['formObj'].clearValidate()
        })
      } else {
        this.dialogStatus = dialogStatus
        this.dialogFormVisible = true
        this.formObj = formObj
      }
      this.initDepLevel()
    },
    initDepLevel(){
      this.loading = true
      getCacheDictCodeList({typeId: 'JBOS_DEP_LEVEL'}).then(response => {
        this.devLevelDict = response.data.dictCodes
        this.loading = false
      })
    },
    onSearchDepEmp(query) {
      if (query !== '') {
        this.loading = true
        this.formObj.empNameS = query
        getEmpList(this.formObj).then(response => {
          this.emps = response.data.emps
          this.loading = false
        })
      } else {
        this.emps = []
      }
    },
    onDepChargeChange(value) {
      this.formObj.depCharge = value
    },
    onDepDirectorChange(value) {
      this.formObj.depDirector = value
    },
    onAdd() {
      this.$refs['formObj'].validate((valid) => {
        if (valid) {
          addDep(this.formObj).then(response => {
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
          updateDep(this.formObj).then(response => {
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
