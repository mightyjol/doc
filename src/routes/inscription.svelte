<script context="module">
	export async function preload(page, session){
		let user = session.user
		if(!!user){
			this.redirect(302, '/confirmation')
		}

		return {}
	}
</script>

<script>
	import { signup, loginTest } from '../firebase/firebase.js'	

	let email = 'testing' + Math.round(Math.random() * 1000) + '@testing.com';
	let name = 'test test';
	let password = 'testing';
	let passwordbis = 'testing';
	let tel = '00000000';
	let loading = false;

	$:passwordFinal = password === passwordbis ? password : false

	async function inscription(){
		loading = true;
		let data = {
			email: email,
			name: name,
			password: passwordFinal
		}

		await signup(data)
		.catch(e => {
			return alert("erreur lors de l'inscription");
		});

		await loginTest()
		goto('/confirmation')
	}
</script>

<style>
	.field{
		min-width: 250px;
	}
	.field:last{
		margin-top: 25px;
	}
</style>

<svelte:head>
	<title>docteur - inscription</title>
</svelte:head>

<section class="hero is-fullheight-with-navbar">
	<div class="hero-body"> 
	 	<div class="container">
	 		<div class="columns is-centered is-mobile is-vcentered">
	 			<div class="column is-narrow">
	 				<h3 class="title has-text-centered">Inscription</h3>
	 				<div class="card">
						<div class="card-content">
							<div class="content has-text-centered">
								<div class="field">
									<input bind:value="{email}" class="input" type="email" placeholder="Email">
								</div>
								<div class="field">
									<input bind:value="{name}" class="input" type="text" placeholder="Nom et prénom">
								</div>
								<div class="field">
									<input bind:value="{password}" class="input" type="password" placeholder="Mot de passe">
								</div>
								<div class="field">
									<input bind:value="{passwordbis}" class="input" type="password" placeholder="Confirmer le mot de passe">
								</div>
								<div class="field">
									<button class:is-loading="{loading}" on:click="{inscription}" type="button" class="button is-primary is-medium">
										S'inscrire
									</button>
								</div>
							</div>
						</div>
						<footer class="card-footer">
							<a href="/connexion" class="card-footer-item">Je souhaite me connecter</a>
						</footer>
					</div>
	 			</div>
	 		</div>
			<p class="is-size-7 has-text-grey has-text-centered">Un compte est nécéssaire pour prendre rendez-vous</p>
	 	</div>	
	</div>
</section>
