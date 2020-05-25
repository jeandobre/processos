<template>
	<div>
		Área de acesso do administrador
		<v-list two-line shaped dense>
				<v-subheader>Ocorrências</v-subheader>
				<v-list-item
						v-for="(item, i) in ocorrencias" :key="i">
						<v-list-item-content>
							<v-list-item-title v-html="item.sigla"></v-list-item-title>
							<v-list-item-subtitle v-html="item.ocorrencia"></v-list-item-subtitle>
						</v-list-item-content>
				</v-list-item>
		</v-list>

	</div>
</template>

<script>
import axios from "axios";

export default {

	data(){
    return {
      ocorrencias: []
    }
	},
	
	created() {
    axios.get("https://api.ufgd.edu.br/sigecad/rest/v1/ocorrencias-de-exclusao")
      .then(response => {
        this.ocorrencias = response.data;
      })
  }
  
}
</script>

<style>

</style>