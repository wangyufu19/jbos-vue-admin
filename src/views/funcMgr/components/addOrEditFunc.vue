<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form ref="formObj" :model="formObj" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="功能编码" prop="funcCode">
        <el-input v-model="formObj.funcCode" />
      </el-form-item>
      <el-form-item label="功能名称" prop="funcName">
        <el-input v-model="formObj.funcName" />
      </el-form-item>
      <el-form-item label="功能类型" prop="funcType">
        <el-select v-model="formObj.funcType" placeholder="请选择">
          <el-option label="目录" value="0" />
          <el-option label="菜单" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="路由地址" prop="funcUrl">
        <el-input v-model="formObj.funcUrl" />
      </el-form-item>
      <el-form-item label="排序" prop="orderNo">
        <el-input v-model="formObj.orderNo" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?onAdd():onUpdate()">确定 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addFunc, updateFunc } from '@/api/func'
export default {
  name: 'AddOrEditFunc',
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '功能信息-新增',
        update: '功能信息-更新'
      },
      formObj: {
        id: undefined,
        funcCode: '',
        funcName: '',
        funcType: '',
        funcUrl: '',
        orderNo: ''
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
          parentId: formObj.parentId,
          funcCode: '',
          funcName: '',
          funcType: '',
          funcUrl: '',
          orderNo: ''
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
          addFunc(this.formObj).then(response => {
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
          updateFunc(this.formObj).then(response => {
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
