<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form :model="formObj" :rules="rules" ref="formObj" label-width="100px" class="demo-ruleForm">
      <el-form-item label="部门编码" prop="depCode">
        <el-input v-model="formObj.depCode"></el-input>
      </el-form-item>
      <el-form-item label="部门名称" prop="depCode">
        <el-input v-model="formObj.depName"></el-input>
      </el-form-item>
      <el-form-item label="部门级别" prop="depLevel">
        <el-select v-model="formObj.depLevel" placeholder="请选择">
          <el-option label="一级部门" value="100"></el-option>
          <el-option label="二级部门" value="101"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门负责人" prop="depCharge">
      </el-form-item>
      <el-form-item label="部门分管领导" prop="depDirector">
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?onAdd():onUpdate()">确定 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addDep , updateDep } from '@/api/dep'
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
        depCode: '',
        depName: '',
        depLevel: ''
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
          depCode: '',
          depName: '',
          depLevel: ''
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
