<template>
  <v-app id="app">
    <div v-if="$route.name === '404' || $route.name === 'NaoAutorizado'">
			<router-view />
		</div>
    <div v-else>
      <HelloWorld msg="Registro de processos (GITLAB)"/>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </div>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  }
}
</script>
