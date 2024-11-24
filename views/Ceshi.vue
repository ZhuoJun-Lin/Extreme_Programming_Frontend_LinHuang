<template>
  <div>

    <div style="background-color: blue;font-size: 30px;color: aliceblue;font-weight: bold;text-decoration: underline;font-style: italic;margin-bottom: 20px">
      求求善心的学长学姐给高分
    </div>

    <div style="margin-bottom: 20px">
      <div>
        <img :src="data.img" alt="">
      </div>
    </div>

    <div style="margin: 20px">
      <el-button @click="click">Default</el-button>
      <el-button type="primary" loading>Primary</el-button>
      <el-button type="success" plain size="large">Success</el-button>
      <el-button type="info" text :bg="false" >Info</el-button>
      <el-button type="warning" style="color: purple" color="pink">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>

    <div style="margin: 20px">
      <el-icon :size="20">
        <Edit />
      </el-icon>
      <span style="margin-left: 30px;color: red">
        <el-icon :size="20" color="red" style="top: 4px"><View /></el-icon>100
      </span>
      <el-button type="danger" :icon="Delete" circle />

      <el-input
          v-model="data.a"
          style="width: 240px"
          placeholder="Type something"
          :prefix-icon="Search"
      />
    </div>

  </div>
</template>

<script setup>
import {reactive, ref, onMounted} from "vue";
import {Delete, Edit, Search, View} from "@element-plus/icons-vue";
import router from "@/router/index.js";

const a=ref(1);
const b=ref("林晃大人帮帮我");

const data=reactive({
  a:666,
  b:"全靠晃爷了",
  c:false,
  name: "原神",
  arr: [1,2,3],
  ozt: ["陈展铭","林晃","陈贤"],
  box: {
    width: '100px',
    height: '100px',
    backgroundColor: 'red'
  },
  img: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.XDIhizOciD0WQeosP1SYogHaHa?w=170&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7'
})

</script>

