<template>
  <div class="app-container">
    医院设置添加
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname"/>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode"/>
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl"/>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName"/>
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import hospSet from '../../api/hospSet'

export default {
  name: 'Add',
  data() {
    return {
      hospitalSet: {}
    }
  },
  created() {
    // 获取路由id值
    // 调用接口得到医院设置信息
    if (this.$route.params && this.$route.params.id) {
      const { id } = this.$route.params
      this.getHospSet(id)
    }
  },
  methods: {
    // 根据id查询
    getHospSet(id) {
      console.log(id)
      hospSet.getHospSet(id).then(response => {
        console.log(this.hospitalSet)
        this.hospitalSet = response.data
      })
    },
    // 添加方法
    saveOrUpdate() {
      if (!this.hospitalSet.id) {
        //  没有id值做添加操作
        this.save()
      } else {
        // 修改操作
        this.update()
      }
    },
    //  添加
    save() {
      hospSet.saveHospSet(this.hospitalSet).then(response => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        //  跳转列表页面，路由跳转
        this.$router.push({ path: '/hospSet/list' })
      })
    },
    //  修改
    update() {
      hospSet.updateHospSet(this.hospitalSet).then(respoonse => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
