<template>
  <p style="height: 37.5px;">KMS</p>
  
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