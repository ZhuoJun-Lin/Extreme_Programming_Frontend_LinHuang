<template>
  <div>

    <div class="card" style="margin-bottom: 5px">
      <el-input v-model="data.name" style="width: 240px; margin-right: 10px" placeholder="请输入名称查询" prefix-icon="Search"></el-input>
      <el-button type="primary" @click="load">查询</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>

    <!--          action="http://localhost:9090/employee/import"-->

    <div class="card" style="margin-bottom: 5px">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button @click="delBatch" type="danger">批量删除</el-button>
      <el-button @click="loadFav" type="success">显示收藏联系人</el-button>
      <el-upload
          style="display: inline-block; margin: 10px"

          :action="baseUrl + '/employee/import'"
          :show-file-list="false"
          :on-success="load"
      >
      <el-button type="info" color="purple">导入</el-button>
      </el-upload>

      <el-button type="success" color="purple" @click="exportData">导出</el-button>
    </div>

    <div  class="card" style="margin-bottom: 5px">
      <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="电话" prop="telephone" />
        <el-table-column label="邮箱" prop="email" />
        <el-table-column label="社交名称" prop="social" />
        <el-table-column label="地址" prop="address" />
<!--        <el-table-column label="收藏" prop="favorite" />-->
        <el-table-column label="是否收藏" prop="favorite">
          <template #default="scope">
            <span v-if="scope.row.favorite === 'true'">已收藏</span>
            <span v-else>未收藏</span>
          </template>
        </el-table-column>



        <el-table-column label="操作" >
          <template #default="scope">
            <el-button @click="favUpdate(scope.row)" type="info" :icon="StarFilled" :style="{color: scope.row.favorite === 'true' ? 'orange' : '#ffffff','font-size': '30px'}" circle></el-button>
            <el-button @click="handleUpdate(scope.row)" type="primary" :icon="Edit" circle></el-button>
            <el-button @click="del(scope.row.id)" type="danger" :icon="Delete" circle></el-button>
          </template>
        </el-table-column>

      </el-table>
      <div style="margin-top: 15px">
        <el-pagination
            @size-change="load"
            @current-change="load"
            v-model:current-page="data.pageNum"
            v-model:page-size="data.pageSize"
            :page-sizes="[5, 10, 15, 20]"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="data.total"
        />
      </div>

    </div>

    <el-dialog title="用户信息" v-model="data.formVisible" width="500">
      <el-form :model="data.form" label-width="80px" style="padding-right: 40px; padding-top: 20px">
        <el-form-item label="名称">
          <el-input v-model="data.form.name" autocomplete="off" placeholder="请输入名称" />
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="data.form.telephone" autocomplete="off"  placeholder="请输入电话号码" />
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="data.form.email" autocomplete="off"  placeholder="请输入邮箱" />
        </el-form-item>

        <el-form-item label="社交名称">
          <el-input v-model="data.form.social" autocomplete="off"  placeholder="请输入媒体名称" />
        </el-form-item>

        <el-form-item label="地址">
          <el-input v-model="data.form.address" autocomplete="off"  placeholder="请输入地址" />
        </el-form-item>

<!--        <el-form-item label="收藏">-->
<!--          <el-input v-model="data.form.favorite" autocomplete="off"  placeholder="是否收藏" />-->
<!--        </el-form-item>-->



      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="data.formVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">保 存</el-button>
        </div>
      </template>
    </el-dialog>


    <el-dialog title="确认收藏" v-model="data.formFav" width="500">
      <el-form :model="data.form" label-width="80px" style="padding-right: 40px; padding-top: 20px">


        <el-form-item label="收藏">
          <el-radio-group v-model="data.form.favorite">
            <el-radio value="true" label="是"></el-radio>
            <el-radio value="false" label="否"></el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="data.formFav = false">取 消</el-button>
          <el-button type="primary" @click="save">保 存</el-button>
        </div>
      </template>
    </el-dialog>


  </div>
</template>

<script setup>
import { reactive } from "vue";
import {Delete, Edit, Search, StarFilled} from "@element-plus/icons-vue"
import request from "@/utils/request.js";
import {ElMessage, ElMessageBox} from "element-plus";

import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
const baseUrl = proxy.$baseUrl;

const exportData = () =>{
  // window.open('http://localhost:9090/employee/export')
  window.open(baseUrl + '/employee/export')

}

const data = reactive({
  name: null,
  favorite: null,

  tableData: [],
  pageNum: 1,
  pageSize: 10,
  total: 0,
  formVisible: false,
  formFav: false,
  form: {},
  ids: [],
})

const load = () => {
  request.get('/employee/selectPage', { // ?pageNum=1&pageSize=10
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      name: data.name,
    }
  }).then(res => {
    data.tableData = res.data.list
    data.total = res.data.total
  })
}
load()

const loadFav = () => {
  request.get('/employee/selectFav', { // ?pageNum=1&pageSize=10
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      favorite: "true",
    }
  }).then(res => {
    data.tableData = res.data.list
    data.total = res.data.total
  })
}
load()

const reset = () =>{
  data.name=null
  load()
}

const save = () => { // 在一个保存方法里面做2个操作  一个是新增 一个是编辑
  data.form.id ? update() : add()
}

const handleAdd =() =>{
  data.formVisible=true
  data.form={}
}

const add = () => {
  request.post('/employee/add', data.form).then(res => {
    if (res.code === '200') {
      data.formVisible = false
      ElMessage.success('操作成功')
      load()
    } else {
      ElMessage.error(res.msg)
    }
  })
}


const handleUpdate = (row) => {
  data.form = JSON.parse(JSON.stringify(row))
  data.formVisible = true
}

const favUpdate = (row) => {
  data.form = JSON.parse(JSON.stringify(row))
  data.formFav = true
}

const update = () => {
  request.put('/employee/update', data.form).then(res => {
    if (res.code === '200') {
      data.formVisible = false
      data.formFav = false
      ElMessage.success('操作成功')
      load()
    } else {
      ElMessage.error(res.msg)
    }
  })
}

const del = (id) => {
  ElMessageBox.confirm('删除数据后无法恢复，您确认删除吗？', '删除确认', { type: 'warning' }).then(() => {
    request.delete('/employee/deleteById/' +id).then(res => {
      if (res.code === '200') {
        ElMessage.success('操作成功')
        load()
      } else {
        ElMessage.error(res.msg)
      }
    })
  }).catch()
}

const handleSelectionChange = (rows) => {
  data.ids = rows.map(row => row.id)
  console.log(data.ids)
}

const delBatch = () => {
  if (data.ids.length === 0) {
    ElMessage.warning('请选择数据')
    return
  }
  ElMessageBox.confirm('删除数据后无法恢复，您确认删除吗？', '删除确认', { type: 'warning' }).then(() => {
    request.delete('/employee/deleteBatch', { data: data.ids }).then(res => {
      if (res.code === '200') {
        ElMessage.success('操作成功')
        load()  // 删除后一定要重新加载最新的数据
      } else {
        ElMessage.error(res.msg)
      }
    })
  }).catch()
}

</script>
