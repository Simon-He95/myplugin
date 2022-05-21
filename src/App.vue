<template>
  <div class="container">
    <button @click="clickHandler">点击</button>
  </div>
</template>

<script>
  export default {
    setup() {
      return {
        clickHandler: () => {
          console.log('click')
          if (debug) {
            const a = 10
            const b = 20
            console.log(a + b)
          }
        },
      }
    },
  }
</script>
<style scoped>
  .container {
    text-align: center;
  }
</style>
