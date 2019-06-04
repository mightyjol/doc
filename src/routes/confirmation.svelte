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
	 			<div class="column is-two-thirds has-text-centered">
	 				<div class="box">
	 					<div class="box-content">
	 						{#if !$user}
			 					<h4 class="title has-text-centered">Vous devez ouvrir un compte pour pouvoir prendre rendez-vous</h4>
				 				<h5 class="subtitle  has-text-centered">
				 					Pour éviter tout abus et permettre une communication simple et rapide, la création de compte est obligatoire.<br>Merci de votre compréhension.
				 				</h5>
				 				<a href="/" class="button is-primary">
				 					Retour à l'acceuil
				 				</a>
			 				{:else if $user && !$user.isActive}
				 				<h4 class="title has-text-centered">Votre compte n'est pas encore actif</h4>
				 				<h5 class="subtitle  has-text-centered">
				 					Tout les nouveaux comptes doivent être validés manuellement par un administrateur.<br>Merci de votre compréhension.
				 				</h5>
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
