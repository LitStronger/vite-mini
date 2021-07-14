<template>
  <div>
    <h1>WRITE A VITE SERVER FROM ZERO</h1>
    <p>By {{ author }}</p>
  </div>
</template>

<script>
export default {
  name: "App",
  setup() {
    const author = "lyq";
    console.log(1);
    return {
      author,
    };
  },
};
</script>
<style scoped>
div {
  text-align: center;
}
</style>
