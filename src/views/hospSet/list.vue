<template>
  <div class="app-container">
    <!-- 查询按钮   -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
    </el-form>

    <!-- 工具条 -->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
    </div>

    <!-- banner列表 -->
    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column type="index" width="50"/>
      <el-table-column prop="hosname" label="医院名称"/>
      <el-table-column prop="hoscode" label="医院编号"/>
      <el-table-column prop="apiUrl" label="api基础路径" width="200"/>
      <el-table-column prop="contactsName" label="联系人姓名"/>
      <el-table-column prop="contactsPhone" label="联系人手机"/>
      <el-table-column label="状态" width="80">
        <!--        替换0和1，===表示值和类都相同-->
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '可用' : '不可用' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)">删除</el-button>
          <el-button
            v-if="scope.row.status === 1"
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="lockHospSet(scope.row.id,0)">锁定</el-button>
          <el-button
            v-if="scope.row.status === 0"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="lockHospSet(scope.row.id,1)">取消锁定</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- :属性，单向绑定   -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>

</template>

<script>
// 引入接口定义的js文件
import hospSet from '@/api/hospSet'
export default {
  name: 'List',
  data() {
    return {
      current: 1, // 当前页
      limit: 3, // 每页显示数
      searchObj: {}, // 条件封装对象
      list: [], // 每页数据集合
      total: 0, // 总记录数
      multipleSelection: [] // 数组集合
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取选择复选框id的值
    handleSelectionChange(selection) {
      console.log(selection)
      // 数组赋值可以不用每次扩容吗？
      this.multipleSelection = selection
    },
    //  医院设置列表
    getList(page = 1) {
      this.current = page
      hospSet.getHospSetList(this.current, this.limit, this.searchObj).then(response => {
      //  接口返回数据
        this.list = response.data.records
        this.total = response.data.total
        console.log(response)
      }).catch(error => {
      //  请求失败
        console.log(error)
      })
    },
    // 删除医院设置的方法，传入id删除
    removeDataById(id) {
      this.$confirm('此操作将永久删除医院是设置信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确定执行then方法
        // 调用接口中的方法，开始删除
        hospSet.deleteHospSet(id)
          .then(response => {
            // 提示
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面,重新获取列表元素
            this.getList(1)
          })
      })
    },
    //  批量删除医院
    removeRows() {
      this.$confirm('此操作将永久删除医院是设置信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确定执行then方法
        var idList = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          var { id } = this.multipleSelection[i]
          idList.push(id)
        }
        // 调用接口中的方法，开始删除
        hospSet.batchRemoveHospSet(idList)
          .then(response => {
            // 提示
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面,重新获取列表元素
            this.getList(1)
          })
      })
    },
    //  锁定和取消锁定的方法
    lockHospSet(id, status) {
      hospSet.lockHospSet(id, status).then(
        response => {
        //  刷新
          this.getList()
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
