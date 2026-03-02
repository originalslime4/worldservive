<template>
  <div class="home" :class="{ 'scrolled': isScrolled[0] }">
    <a @click="rerod">WorldServive</a>
    <b>🔔</b>
    <span @click="menu = !menu">三</span>
    <img
      @click="
        if (this.userinfo.loggedIn) {
          pril = !pril;
        } else {
          loginWithGoogle();
        }
      "
      :src="userinfo.userPicture"
      class="propil"
      @error="handleImageError($event, 'prl')"
      style="
        object-fit: cover;
        height: 37.5px;
        width: 37.5px;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(-20px, -50%);
      "
    />
    <div class="menu" :class="{ 'clmu': !menu }">
      <p @click="goto = '/'">Home</p>
      <p @click="goto = '/download'">Download</p>
    </div>
    <div class="menu2" :class="{ 'clmu': !pril }">
      <div style="padding: 10px">
        <img
          :src="userinfo.userPicture"
          class="propil"
          @error="handleImageError($event, 'prl')"
          style="object-fit: cover; width: 75px; height: 75px; margin: 0"
        />
        <h3 style="word-break: break-word; margin: 0">
          {{ userinfo.userName }}
        </h3>
        <h3 style="word-break: break-word; margin: 0">
          Standard
        </h3>
      </div>
      <p @click="goto = `/propil/${discode(userinfo.userEmail,true)}`">MyPage</p>
      <p>Setting</p>
      <p>Studio</p>
      <p @click="logout">Logout</p>
    </div>
  </div>
  <div id="app">
    <router-view />
    <h1>{{}}</h1>
    <img style="width:250px;height:250px;" alt="Vue logo" src="./assets/omegatrus.png">
    <Wearedevs msg="KMSlime" style="background:rgb(200,200,200);"/>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "https://worldservive.onrender.com";
axios.defaults.withCredentials = true;
// const api = axios.create({
//   baseURL: "/",
//   withCredentials: true
// });

import Wearedevs from './components/myhouse'
export default {
  name: "AppPage",
  setup() {
    return {};
  },
  data() {
    return {
      limbtt: 0,
      menu: false,
      pril: false,
      isScrolled: [false,100],
      goto: "",
      userinfo: {
        loggedIn: false,
        userName: "Unknown",
        userEmail: "abcdefg1234@gmail.com",
        userPicture: "",
        bio: "Description.",
        create:"",
        config:{}
      },
    };
  },
  methods: {
  //   convertDriveLinkToThumbnail(originalUrl, size = 1000) {
  //     const match = originalUrl.match(/(?:id=|\/d\/)([a-zA-Z0-9_-]{25,})/);
  //     if (!match) return null;

  //     const fileId = match[1];
  //     return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
  //   },
discode(str, encode) {
      if (encode) {
        return btoa(unescape(encodeURIComponent(str)))
      } else {
        return decodeURIComponent(escape(atob(str)))
      }
    },
    handleImageError(e, t) {
      if (t == "img") {
        e.target.src = require("./assets/non.png"); // 또는 절대 경로
      } else if (t == "prl") {
        e.target.src = require("./assets/propil.jpg");
      }
    },
handleScroll() { 
      this.isScrolled[0] = window.scrollY >= this.isScrolled[1];
      this.isScrolled[1]=Math.min(Math.max(this.isScrolled[1], window.scrollY-100), window.scrollY+100);
    },
    rerod() {
      this.limbtt += 1;
      if (this.limbtt==1){
      this.$router.push({ path: "/reload", query: { place: window.location.pathname } });
      }
      var last=this.limbtt
      setTimeout(() => {
      if (last==this.limbtt){this.limbtt = 0;}
      }, Math.min(last*125+250,1000));
    },
    async logout() {
      try {
        await axios.get("/logout");
        this.userinfo= {
        loggedIn: false,
        userName: "Unknown",
        userEmail: "abcdefg1234@gmail.com",
        userPicture: "",
        bio: "Description.",
        create:"",
        config:{}
      };
        alert("logedout");
        //this.$router.push("/home");
      } catch (err) {
        alert("로그아웃 실패: " + (err.response?.data?.error || err.message));
      }
    },
    async checkLogin() {
      try {
        const res = await axios.get("/auth/check", {
          withCredentials: true,
        });
        this.userinfo.loggedIn = res.data.loggedIn;
        if (res.data.loggedIn) {
          this.userinfo.userEmail = res.data.email;
          this.userinfo.userPicture = res.data.picture;
          this.userinfo.userName = res.data.nickname;
          this.userinfo.bio = res.data.bio;
          this.userinfo.create=res.data.create;
          this.userinfo.config=res.data.config
        }
      } catch (err) {
        console.error("로그인 확인 실패:", err);
        this.userinfo.loggedIn = false;
        this.userinfo.userEmail = "";
        this.userinfo.userPicture = "";
        this.userinfo.userName = "";
        this.userinfo.bio = "";
        this.userinfo.create="";
        this.userinfo.config={};
      }
    },
    loginWithGoogle() {
      window.location.href = "/login";
    },
  },
  watch: {
    $route(to, from) {
      this.menu=false
      this.pril=false
      console.log("라우트 변경됨:", from.path, "→", to.path);
    },
    goto(newVal) {
      this.$router.push(newVal);
    },
  },
  mounted() {
    this.checkLogin();
  window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  components: {
    Wearedevs
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
  background-color: rgb(0, 0, 64);
}
.home {
  right: 0;
  top: 0;
  width: 100%;
  background: rgb(0, 200, 0);
  border-radius: 5px;
  position: fixed;
  transition: transform 0.1s ease;
}
.home.scrolled {
  transform: translateY(-100%); /* 위로 올리기 */
}
.home a {
  color: black;
  font-size: 37.5px;
  font-weight: 1000;
}
.home b {
  background: #ffffff;
  color: black;
  font-size: 25px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-75px, -50%);
  border-radius: 10px;
  padding: 5px;
}
.home span {
  color: black;
  font-size: 37.5px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(25px, -50%);
  font-weight: 1000;
}
.menu {
  background: rgb(0, 175, 0);
  position: absolute;
  top: 100%;
  width: 200px;
  height: 1000px;
  transition: transform 0.1s ease;
}
.menu.clmu{
  transform: translateX(-100%);
}
.menu p {
  background: rgb(0, 175, 0);
  color: black;
  width: 100%;
  height: 50px;
  font-size: 225%;
  font-weight: 1000;
  border-color: #000000;
  border-bottom-style: outset;
  border-top-style: inset;
  left: 0px;
  display: flex;
  align-items: center; /* 세로 중앙 */
  justify-content: center; /* 가로 중앙 */
  text-align: center;
  margin: 0;
}
.menu2 {
  background: rgb(255, 255, 255);
  border-radius: 10px;
  border-style: inset;
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  height: 500px;
  transition: transform 0.1s ease;
}
.menu2.clmu{
  transform: translateX(100%);
}
.menu2 p {
  background: rgb(255, 255, 255);
  color: black;
  width: 100%;
  height: 50px;
  font-size: 250%;
  font-weight: 1000;
  border-color: #000000;
  border-bottom-style: outset;
  border-top-style: inset;
  border-radius: 10px;
  left: 0px;
  display: flex;
  align-items: center; /* 세로 중앙 */
  justify-content: center; /* 가로 중앙 */
  text-align: center;
  margin: 0;
}
.way.clmu{
  transform: translateX(-100%);
}
.propil {
  background: #000000;
  border-radius: 100%;
  padding: 5px;
}
</style>
<!-- git add .
git commit -m "버그"
git push origin main  -->