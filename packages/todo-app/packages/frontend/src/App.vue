<template>
  <div id="app">
    <router-view />
    <app-footer />
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Vue, Prop } from 'vue-property-decorator';

import AppFooter from './components/AppFooter.vue';

@Component({
  components: {
    AppFooter,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import '~@/assets/style.css';
</style>
