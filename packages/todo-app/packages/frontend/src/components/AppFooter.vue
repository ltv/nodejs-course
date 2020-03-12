<template>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <p>
      Written by
      <a href="http://evanyou.me">Evan You</a>
    </p>
    <p>
      Edited by
      <a href="https://ltv.vn">Luc Duong</a>
    </p>
    <p>
      Part of
      <a href="http://todomvc.com">TodoMVC</a>
    </p>
  </footer>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import { Vue, Prop } from 'vue-property-decorator';

@Component
export default class AppFooter extends Vue {}
</script>

<style lang="scss" scoped>
</style>
