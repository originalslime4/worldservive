<template>
  <p style="height: 32.5px;margin: 10px;">KMS</p>
  <div class="center-container">
    <img src="@/assets/example.png" alt="WorldSurvive Logo" class="main-image" :style="{ objectPosition: '0 '+isScrolled/2+'px' }"/>

    <h1 style="color: #ffffff;font-size: 75px;font-weight: bold;margin: 20px 0;">WorldSurvive For Windows</h1>
    <div style="display: flex; gap: 10px; align-items: center;">
      <div style="width: 100px;"></div>
      <div style="padding-right: 100px;">
        <button class="main-button" @click="downloadLauncher">
          Install Launcher
        </button>
        <p style="color: #c0c0c0;">worldsurvive install.exe (44.4MB)</p>
      </div>
      <a href="https://www.alldonation.co.kr/@ilikefurry" target="_blank" style="width: 0px;">
        <button class="main-button" style="background-color: #ffcc00; color: #000;">
          Donate
        </button>
      </a>
    </div>
    <div class="white-box">
      <p style="color: #c0c0c0;font-size: 24px; margin: 0;">Please give me feedback.</p>
    </div>

    <h2 style="color: #c0c0c0;font-size: 50px;margin: 15px 0;">How to play?</h2>

    <router-link to="/library" class="link-text">
      Go to library
    </router-link>
    <h2 style="color: #c0c0c0;font-size: 25px;margin: 15px 0;width: 50%;">Welcome to the fantasy world. Here, throw away
      the stereotypes you knew, learn how to survive, meet friends, and become stronger!</h2>
    <p class="small-text">by KMSlime</p>
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
      goto: "",
      isScrolled:0,
    };
  },
  methods: {
    downloadLauncher() {
      window.open("/worldsurvive install.exe");
    },
    handleScroll() {
      this.isScrolled=window.scrollY
    },
  },
  watch: {
    goto(newVal) {
      this.$router.push(newVal);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.scrollTo({ top: 325, behavior: "smooth" });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
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
  object-fit: cover;
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