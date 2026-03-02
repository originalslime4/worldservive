<template>
  <p style="height: 37.5px;">KMS</p>
  <section class="section" style="flex-direction: row-reverse;">
    <div class="text" style="flex: 1;padding: 20px;">
      <h2 style="width: 750px;color: white;text-align: left;font-size: 50px;margin-bottom: 10px;">Go on an adventure!
      </h2>
      <p style="color: white;text-align: left;font-size: 25px;margin-bottom: 20px;">Even if you have nothing, the world
        will light your path.</p>
      <button @click="goto = '/download'"
        style="display: block;font-size: 35px;padding: 10px 20px;background: navy;color: white;border: none;border-radius: 1px;">Download▶</button>
    </div>
    <div class="image">
      <img src="../assets/earth.png" alt="서비스 이미지" />
    </div>
    <div style="width: 15%;"></div>
  </section>
  <section class="section">
    <div class="text" style="flex: 1;padding: 20px;">
      <h2 style="width: 750px;color: white;text-align: right;font-size: 50px;margin-bottom: 10px;">Run or fight!</h2>
      <p style="color: white;text-align: right;font-size: 25px;margin-bottom: 20px;">It cannot be guaranteed that all
        beings are safe.</p>
      <p style="color: white;text-align: right;font-size: 25px;margin-bottom: 20px;">Not even yourself.</p>
    </div>
    <div class="image">
      <img src="../assets/earth.png" alt="서비스 이미지" />
    </div>
    <div style="width: 15%;"></div>
  </section>
  <section class="section" style="flex-direction: row-reverse;">
    <div class="text" style="flex: 1;padding: 20px;">
      <h2 style="width: 750px;color: white;text-align: left;font-size: 50px;margin-bottom: 10px;">Destroy and create!
      </h2>
      <p style="color: white;text-align: left;font-size: 25px;margin-bottom: 20px;">Make this world according to your
        thoughts</p>
    </div>
    <div class="image">
      <img src="../assets/earth.png" alt="서비스 이미지" />
    </div>
    <div style="width: 15%;"></div>
  </section>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "https://worldsurvive.onrender.com";
axios.defaults.withCredentials = true;
// const api = axios.create({
//   baseURL: "/",
//   withCredentials: true
// });

//import HelloWorld from '../components/HelloWorld'
export default {
  name: "homePage",
  setup() {
    return {};
  },
  data() {
    return {
      goto: ""
    };
  },
  methods: {


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

.section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 500px;
  width: 100%;
  margin: 20px 0;
}

.image {
  flex: 1;
  display: flex;
  justify-content: center;
}

.image img {
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}
</style>