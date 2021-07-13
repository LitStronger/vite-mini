<template>
    <div>
        <h1>WRITE A VITE SERVER FROM ZERO</h1>
        <h2>By {{author}}</h2>
    </div>
</template>

<script>
export default {
  name: 'App',
  setup(){
      const author = 'lyq'
      console.log(1)
      return {
          author
      }
  }
}
</script>
