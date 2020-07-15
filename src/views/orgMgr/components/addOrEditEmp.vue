<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form ref="formObj" :model="formObj" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="工号" prop="badge">
        <el-input v-model="formObj.badge" />
      </el-form-item>
      <el-form-item label="姓名" prop="empName">
        <el-input v-model="formObj.empName" />
      </el-form-item>
      <el-form-item label="所属机构" prop="orgName">
        <el-input v-model="formObj.orgName" :disabled="true"/>
      </el-form-item>
      <el-form-item label="所属部门" prop="depName">
        <el-input v-model="formObj.depName" />
      </el-form-item>
      <el-form-item label="职务" prop="headShip">
        <el-select v-model="formObj.headShip" placeholder="请选择">
          <el-option label="系统开发" value="100" />
          <el-option label="系统测试" value="101" />
        </el-select>
      </el-form-item>
      <el-form-item label="员工状态" prop="empStatus">
        <el-select v-model="formObj.empStatus" placeholder="请选择">
          <el-option label="正常" value="01" />
          <el-option label="锁定" value="02" />
          <el-option label="离职" value="03" />
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
import { addEmp, updateEmp } from '@/api/emp'
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
        depName: '',
        headShip: '',
        empStatus: ''
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
          empStatus: ''
        }
        this.$nextTick(() => {
          this.$refs['formObj'].clearValidate()
        })
      } else {
        this.dialogStatus = dialogStatus
        this.dialogFormVisible = true
        this.formObj = formObj
      }
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
