<template>
  <v-card style="margin: 15px; padding: 10px">
		Rota pública

    <v-banner two-line>
    <v-avatar
      slot="icon"
      color="deep-purple accent-4"
      size="40"
    >
      <v-icon
        icon="mdi-lock"
        color="white"
      >
        mdi-lock-open
      </v-icon>
    </v-avatar>

    Mensagem de apresentação inicial da aplicação. Deve ser apresentada a todos os usuários.
    <template v-slot:actions>
      <v-btn text color="deep-purple accent-4">Ação</v-btn>
    </template>

  </v-banner>

    <v-alert type="info" border="top" style="margin-top: 10px">
      Este projeto implementa um CRUD para apresentar algumas funcionalidades do gateway de api da UFGD.
    </v-alert>
  </v-card>
</template>

<script>
export default {
  name: "Publico",
  data() {
    return {
      
    }
  }
}
</script>

<style>

</style>