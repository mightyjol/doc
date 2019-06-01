<script context="module">
	export async function preload(page, session){
		let user = session.user
		if(!!user){
			this.redirect(302, '/')
		}
	}
</script>

<script>
	import LoginButton from '../components/auth/LoginButton.svelte'
	import { loginTest } from '../firebase/firebase.js'	
	import { goto } from '@sapper/app';

	let email = '';
	let password = '';
</script>

<style>
	.field{
		min-width: 250px;
	}
	.field:last-of-type{
		margin-top: 50px;
	}
</style>

<svelte:head>
	<title>docteur - connexion</title>
</svelte:head>

<section class="hero is-fullheight-with-navbar">
	<div class="hero-body"> 
	 	<div class="container">
	 		<div class="columns is-centered is-mobile is-vcentered">
	 			<div class="column is-narrow">
	 				<h3 class="title has-text-centered">Connexion</h3>
	 				<div class="card">
						<div class="card-content">
							<div class="content has-text-centered">
								<div class="field">
									<input class="input" type="email" placeholder="Email">
								</div>
								<div class="field">
									<input class="input" type="password" placeholder="Password">
								</div>
								<div class="field">
									<LoginButton {email} {password} large="true" redirect="/rdv"/>	
								</div>
							</div>
						</div>
						<footer class="card-footer">
							<a href="/inscription" class="card-footer-item">Je souhaite créer un compte</a>
						</footer>
					</div>
	 			</div>
	 		</div>
			<p class="is-size-7 has-text-grey has-text-centered">Un compte est nécéssaire pour prendre rendez-vous</p>
	 	</div>	
	</div>
</section>
