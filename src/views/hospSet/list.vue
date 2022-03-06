<template>
  <div>
    医院设置列表
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
      list: [] // 每页数据集合
    }
  },
  created() {
    this.getList()
  },
  methods: {
  //  医院设置列表
    getList() {
      hospSet.getHospSetList(this.current, this.limit, this.searchObj).then(response => {
      //  接口返回数据
        console.log(response)
      }).catch(error => {
      //  请求失败
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
