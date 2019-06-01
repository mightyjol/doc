<script context="module">
	export async function preload(page, session){
		let user = session.user
		if(!user) return {};
		if(!!user && user.isActive){
			this.redirect(302, '/rdv')
		}
	}
</script>

<script>
	import user from '../firebase/user.js'
</script>

<style>
	 
</style>

<svelte:head>
	<title>docteur - confirmation</title>
</svelte:head>

<section class="hero is-fullheight-with-navbar">
	<div class="hero-body"> 
	 	<div class="container">
	 		<div class="columns is-centered is-vcentered">
	 			<div class="column is-half has-text-centered">
	 				<div class="box">
	 					<div class="box-content">
	 						{#if !$user}
			 					<h3 class="title has-text-centered">Vous devez ouvrir un compte pour pouvoir prendre rendez-vous</h3>
				 				<h4 class="subtitle  has-text-centered">
				 					Pour éviter tout abus et permettre une communication simple et rapide, la création de compte est obligatoire. 
				 					<br>
									Merci de votre compréhension.
				 				</h4>
				 				<a href="/" class="button is-primary">
				 					Retour à l'acceuil
				 				</a>
			 				{:else if $user && !$user.isActive}
				 				<h3 class="title has-text-centered">Votre compte n'est pas encore actif</h3>
				 				<h4 class="subtitle  has-text-centered">
				 					Tout les nouveaux patients doivent être validés manuellement. <br>
									Merci de votre compréhension.
				 				</h4>
				 				<a href="/" class="button is-primary">
				 					Retour à l'acceuil
				 				</a>
			 				{/if}
	 					</div>
	 				</div>
	 			</div>
	 		</div>
	 	</div>	
	</div>
</section>
