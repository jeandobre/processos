<template>
	<div>
		Não autorizado (Acesso negado)
		<div>
			<v-btn @click="voltar()">Voltar</v-btn>
		</div>

	</div>
</template>

<script>
export default {

	methods: {
		voltar(){
			this.$router.go(-1);
		}
	}

}
</script>

<style>

</style>