<template>
  <div id="app">
    <h1>todoApp</h1>
    <Index />
  </div>
</template>

<script>
import Index from './components/Index'

export default {
  name: 'app',
  components: {
    Index
  }
}
</script>

<style lang="sass">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  margin-top: 60px
  h1
    text-align: center
</style>
