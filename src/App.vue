<template>
  <div id="app"
    class="main">
    <Main />
  </div>
</template>

<script>
import Main from "./components/Main";

export default {
  name: "app",
  components: {
    Main
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@keyframes gauntlet {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -3760px 0;
  }
}

@keyframes heroBack {
  0% {
    opacity: 0;
    /* color: green; */
    background-color: green;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    /* color: #000; */
    transform: scale(1);
  }
}

body {
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
