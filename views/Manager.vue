<template>
  <div>
    <div style="height: 100px; background-color: #6254a3; display: flex; align-items: center">
      <div style="width: 400px; display: flex; align-items: center; padding-left: 20px">
        <img style="width: 70px" src="https://tse3-mm.cn.bing.net/th/id/OIP-C.naD4MR2X90vb30VUyzPTEAHaHa?w=177&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="">
        <span style="font-size: 24px; color: #e6ecf7; margin-left: 10px">联系人通讯录管理</span>
      </div>

      <div style="flex: 1"></div>
      <div style="display: flex; width: fit-content; margin-right: 10px; align-items: center">

        <div style="font-size: 20px; color: #e6ecf7; margin-right: 20px">
          {{ currentTime }}
        </div>
      </div>
    </div>

    <div style="display: flex">
      <div style="width: 300px; border-right: 1px solid black; min-height: calc(100vh - 60px)">
        <el-menu router :default-active="router.currentRoute.value.path" style="border: 0">
          <el-menu-item index="/manager/employee">
            <el-icon><House /></el-icon>
            主页信息
          </el-menu-item>

          <el-menu-item index="/manager/ceshi">
            <el-icon><DataAnalysis /></el-icon>
            测试空页面
          </el-menu-item>
        </el-menu>
      </div>

      <div style="flex: 1; width: 0; background-color: #ece9fa; padding: 10px">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { DataAnalysis, House } from "@element-plus/icons-vue";
import router from "@/router/index.js";

const currentTime = ref(new Date().toLocaleTimeString());

function updateTime() {
  currentTime.value = new Date().toLocaleTimeString();
}

onMounted(() => {
  const intervalId = setInterval(updateTime, 1000);
  onUnmounted(() => clearInterval(intervalId));
});

</script>

<style>
.el-menu .is-active {
  background-color: #e6ecf7 !important;
}
</style>