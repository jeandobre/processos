<template>
  <div class="hello">
    <h1>
      {{ msg }}
      <small>Recursos do gateway: {{ recursos.length }}</small>
    </h1>
    <v-card style="padding: 10px; margin: 5px">
      Usuário logado: <kbd>{{ usuario }}</kbd>
      <div v-if="papeis.length > 0">
        Papel: <kbd>{{ papeis[0].nome }}</kbd>
        Passaporte: <kbd>{{ papeis[0].passaporte.nome }}</kbd>
        <v-chip class="float-right" v-if="papeis[0].passaporte.dados">
          Faculdade selecionada: {{ papeis[0].passaporte.dados.faculdadeId }}
        </v-chip>
      </div>    
    </v-card>

    <v-btn text small color="normal" to="/login">Login</v-btn>
    <v-btn text small color="primary" to="/">Inicio (público)</v-btn>
    <v-btn text small color="normal" to="/listagem">Processos (operador)</v-btn>
    <v-btn text small color="deep-orange" to="/administrador">Administrador</v-btn>

  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
  
    computed: {
      ...mapState(["usuario", "papeis", "recursos"])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
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
    color: #42b983;
  }
</style>
