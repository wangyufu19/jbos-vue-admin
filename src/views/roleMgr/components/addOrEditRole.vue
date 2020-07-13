<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model="roleForm.roleCode" />
      </el-form-item>
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="roleForm.roleName" />
      </el-form-item>
      <el-form-item label="角色类型" prop="roleType">
        <el-select v-model="roleForm.roleType" placeholder="请选择">
          <el-option label="功能权限" value="100" />
          <el-option label="其它" value="101" />
        </el-select>
      </el-form-item>
      <el-form-item label="角色功能" prop="roleFunc">
        <tree-select
          :data="data"
          :default-props="defaultProps"

          :node-key="nodeKey"
          :checked-keys="defaultCheckedKeys"
          @popoverHide="popoverHide"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?onAdd():onUpdate()">确定 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addRole, updateRole } from '@/api/role'
import TreeSelect from '@/components/TreeSelected'
var menus = [
  {
    'menuId': 1,
    'menuName': '系统管理',
    'childrenList': [
      {
        'menuId': 100,
        'menuName': '用户管理',
        'childrenList': [
          {
            'menuId': 1000,
            'menuName': '用户查询'
          },
          {
            'menuId': 1001,
            'menuName': '用户新增'
          },
          {
            'menuId': 1002,
            'menuName': '用户修改'
          },
          {
            'menuId': 1003,
            'menuName': '用户删除'
          }
        ]
      },
      {
        'menuId': 101,
        'menuName': '角色管理',
        'childrenList': [
          {
            'menuId': 1006,
            'menuName': '角色查询'
          },
          {
            'menuId': 1007,
            'menuName': '角色新增'
          },
          {
            'menuId': 1008,
            'menuName': '角色修改'
          },
          {
            'menuId': 1011,
            'menuName': '删除角色'
          }
        ]
      }
    ]
  }
]
export default {
  name: 'AddOrEditRole',

  components: { TreeSelect },

  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '角色信息-新增',
        update: '角色信息-更新'
      },
      roleForm: {
        id: undefined,
        roleCode: '',
        roleName: '',
        roleFunc: ''
      },
      data: menus,
      defaultProps: {
        children: 'childrenList',
        label: 'menuName'
      },
      nodeKey: 'menuId',
      defaultCheckedKeys: []
    }
  },
  created() {
    // 注意：初始化defaultCheckedKeys时，在created里面
    // 父组件先执行自己的created，然后子组件开始执行自己的created和mounted，最后父组件再执行自己的mounted。
    // 因为此页面加载，先执行该组件自己的created，然后执行TreeSelect组件的created和mounted，最后执行该组件的mounted
    this.defaultCheckedKeys = [1000]
  },
  mounted() {
    // 此处初始化defaultCheckedKeys，没效果
    this.defaultCheckedKeys = [1001]
  },
  methods: {
    init(roleForm, dialogStatus) {
      if (dialogStatus === 'create') {
        this.dialogStatus = dialogStatus
        this.dialogFormVisible = true
        this.roleForm = {
          id: undefined,
          roleCode: '',
          roleName: ''
        }
        this.$nextTick(() => {
          this.$refs['roleForm'].clearValidate()
        })
      } else {
        this.dialogStatus = dialogStatus
        this.dialogFormVisible = true
        this.roleForm = roleForm
      }
    },
    onAdd() {
      this.$refs['roleForm'].validate((valid) => {
        if (valid) {
          addRole(this.roleForm).then(response => {
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
      this.$refs['roleForm'].validate((valid) => {
        if (valid) {
          updateRole(formObj).then(response => {
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
