<template>
  <div class="center-container">
    <!-- 사진 -->
    <img src="@/assets/example.png" alt="WorldSurvive Logo" class="main-image" />

    <!-- 대빵 큰 글자 -->
    <h1 style="color: #ffffff;font-size: 75px;font-weight: bold;margin: 20px 0;">WorldSurvive For Windows</h1>

    <!-- 버튼 -->
    <button class="main-button" @click="downloadLauncher">
      Install Launcher
    </button>
    <p style="color: #c0c0c0;">worldsurvive install.exe (44.4MB)</p>

    <div class="white-box">
      <p style="color: #c0c0c0;font-size: 24px; margin: 0;">Please give me feedback.</p>
    </div>

    <!-- 큰 글자 -->
    <h2 style="color: #c0c0c0;font-size: 50px;margin: 15px 0;">How to play?</h2>

    <!-- 다른 Vue로 가는 하이퍼텍스트 -->
    <router-link to="/library" class="link-text">
      Go to library
    </router-link>
    <h2 style="color: #c0c0c0;font-size: 25px;margin: 15px 0;width: 50%;">Welcome to the fantasy world. Here, throw away
      the stereotypes you knew, learn how to survive, meet friends, and become stronger!</h2>
    <!-- 작은 글자 -->
    <p class="small-text">재배포하지 마세욧!</p>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "https://worldsurvivehub.onrender.com";
axios.defaults.withCredentials = true;
// const api = axios.create({
//   baseURL: "/",
//   withCredentials: true
// });

//import HelloWorld from '../components/HelloWorld'
export default {
  name: "downPage",
  setup() {
    return {};
  },
  data() {
    return {
      goto: ""
    };
  },
  methods: {
    downloadLauncher() {
      window.open("/worldsurvive install.exe");
    }

  },
  watch: {
    goto(newVal) {
      this.$router.push(newVal);
    },
  },
  mounted() {

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

.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 가로 가운데 */
  justify-content: flex-start;
  /* 세로 가운데 */
  /* 화면 전체 높이 */
  text-align: center;
}

.main-image {
  width: 100%;
  aspect-ratio: 7.5;
  object-fit: cover;
  object-position: top;
  margin-bottom: 20px;
}

.main-button {
  font-size: 25px;
  padding: 24px 48px;
  margin-top: 100px;
  cursor: pointer;
  background-color: rgb(0, 224, 128);
}

.link-text {
  font-size: 18px;
  color: #3498db;
  text-decoration: underline;
  margin: 10px 0;
}

.small-text {
  font-size: 12px;
  color: #888;
  margin-top: 30px;
}

.white-box {
  width: 100%;
  padding: 10px;
  background-color: rgb(0, 128, 0);
  border: 25px solid rgb(0, 64, 32);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 75px;
}
</style>