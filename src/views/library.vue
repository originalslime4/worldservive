<template>
  <p style="height: 37.5px;margin: 10px;">KMS</p>
  <div style="width: 100%;">
    <h1 style="font-size: 48px;color: #ffffff;text-align: center;margin-bottom: 20px;">Library</h1>

    <div style="display: flex;gap: 20px;padding: 25px;">
      <!-- 왼쪽 큰 박스 -->
      <div class="main-box">
        <p v-if="!selectedContent">뀨</p>
        <pre v-else>{{ selectedContent }}</pre>
      </div>

      <div class="menu-box">
        <h1>Menu</h1>
        <ul>
          <li v-for="menu in menus" :key="menu">
            <div @click="selectMenu(menu)" style="font-size: 35px;text-align: left;">
              {{ menu+((currentMenu == menu)&&"▲"||"▼")}}
            </div>

            <!-- 해당 메뉴 밑에만 버튼 표시 -->
            <div v-if="currentMenu == menu && subButtons.length > 0" class="sub-buttons">
              <button v-for="btn in subButtons" :key="btn" @click="loadJson(menu, btn)" style="font-size: 25px; text-align: left">
                {{ btn }}
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "https://worldsurvive.onrender.com";
axios.defaults.withCredentials = true;
// const api = axios.create({
//   baseURL: "/",
//   withCredentials: true
// });
const context = require.context("../../library", true, /\.json$/);

//import HelloWorld from '../components/HelloWorld'
export default {
  name: "libraryPage",
  setup() {
    return {};
  },
  data() {
    return {
      goto: "",
      menus: [],
      currentMenu: null,
      subButtons: [],
      selectedContent: null,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    const allPaths = context.keys();

    // 폴더 이름만 추출 (중복 제거)
    this.menus = [...new Set(allPaths.map(key => key.split("/")[1]))];
    console.log("📂 library 하위폴더:", this.menus);
  },
  methods: {
    selectMenu(menu) {
      if (this.currentMenu == menu){
        this.currentMenu=null
        this.subButtons = []
        return
      }
      this.currentMenu = menu;
      const files = context.keys()
        .filter(key => key.startsWith(`./${menu}/`)) // 해당 폴더만
        .map(key => key.split("/").pop());           // 파일 이름만

      this.subButtons = files;
      console.log(`📂 ${menu} 폴더 안의 파일들:`, this.subButtons);
    },
    loadJson(menu, file) {
      try {
        const data = context(`./${menu}/${file}`);
        this.selectedContent = JSON.stringify(data, null, 2);
      } catch (e) {
        this.selectedContent = "파일을 불러올 수 없습니다.";
      }
    }
  },

  watch: {
    goto(newVal) {
      this.$router.push(newVal);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-box {
  flex: 3;
  border: 1px solid #ccc;
  padding: 20px;
  min-height: 400px;
  background: #E0E0E0;
  font-size: 25px;
}

.menu-box {
  flex: 1;
  border: 1px solid #ccc;
  padding: 20px;
  color: #ccc;
}

.sub-buttons {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>