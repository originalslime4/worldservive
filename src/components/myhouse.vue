<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      My Discord
      <a href="https://discord.gg/CB9ESjfQub" target="_blank" rel="noopener">Discord-Blockworld</a>.
    </p>
    <h3>My SNS</h3>
    <ul>
      <li><a href="https://www.youtube.com/@KmSlime" target="_blank" rel="noopener">Youtube</a></li>
    <li><a href="https://open.kakao.com/o/gve6MTTh" target="_blank" rel="noopener">Kakaotalk</a></li>
    <li><a href="https://kmslime.kr" target="_blank" rel="noopener">Fan site</a></li>
  </ul>
    <h3>Feedback</h3>
    <ul>
      <li><b target="_blank" rel="noopener">Phone|+82 010-3110-5872</b></li>
      <b>*Please to Discord.*</b>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 25px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: rgb(0, 150, 0);
}
</style>
