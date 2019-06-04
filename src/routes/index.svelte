<script>
	import user from '../firebase/user.js';
	import LoginButton from '../components/auth/LoginButton.svelte';
	import LogoutButton from '../components/auth/LogoutButton.svelte';	
	import RdvButton from '../components/buttons/RdvButton.svelte';	
	import WarningMessage from '../components/messages/WarningMessage.svelte' //TODO abstract that

	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
 	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import scroller from '../components/utils/scroller.js'

</script>

<style>
	.is-striked{
		text-decoration: line-through;
	}

	iframe{
		min-height: 400px;
	}

	.mt50{
		margin-top: 50px;
	}

	@media screen and (max-width: 1023px){
		.column .box.content{
			margin-top: 50px;
		}
	}
</style>

<svelte:head>
	<title>doctor - home</title>
</svelte:head>

<section class="hero is-white is-fullheight-with-navbar">
	<div class="hero-body">
		<div class="container has-text-centered-mobile">
			<div class="columns is-vcentered">
				<div class="column">
					<h1 class="title">Docteur Viviane Lebrun</h1>
					<h2 class="subtitle">Consultation en Médecine Générale</h2>
					<div class="is-grouped buttons are-normal is-hidden-mobile">
						{#if !$user}
							<a href="/connexion" class="button is-outlined">Se connecter</a>
						{/if}
						<a href="/inscription" class="button is-outlined">S'inscrire</a>
					</div>
					<div class="columns is-hidden-tablet is-centered">
						<div class="column is-half">
							{#if !$user}
								<a href="/connexion" class="button is-outlined">Se connecter</a>
							{/if}
							<a href="/inscription" class="button is-outlined">S'inscrire</a>
						</div>
					</div>
				</div>
	 			<div class="column">
	 				<div class="box content has-text-centered" style="max-width: 450px; margin: 0 auto;">
	 					<h4>
							<strong>Horaires de consultation</strong>
						</h4>
						<div class="columns">
							<div class="column">
								<table class="table is-fullwidth is-striped is-hoverable">
									<tbody>
										<tr>
											<td class="has-text-left">Lundi</td>
											<td class="has-text-right">16h30 - 18h30</td>
										</tr>
										<tr>
											<td class="has-text-left">Mardi</td>
											<td class="has-text-right">Fermé</td>
										</tr>
										<tr>
											<td class="has-text-left">Mercredi</td>
											<td class="has-text-right">14h30 - 15h30</td>
										</tr>
										<tr>
											<td class="has-text-left">Jeudi</td>
											<td class="has-text-right">Fermé</td>
										</tr>
										<tr>
											<td class="has-text-left">Vendredi</td>
											<td class="has-text-right">8h30 - 9h30</td>
										</tr>
										<tr>
											<td class="has-text-left">Samedi</td>
											<td class="has-text-right">Fermé</td>
										</tr>
										<tr>
											<td class="has-text-left">Dimanche</td>
											<td class="has-text-right">Fermé</td>
										</tr>
									</tbody>
								</table>
								<RdvButton full="true" large="true"/>
							</div>
						</div>
	 				</div>
	 			</div>
			</div>
		</div>
  	</div>
</section>
<section class="section">
	<div class="container">
		<WarningMessage>
			<span slot="title">Important</span>
			<span slot="content">Consultations sur rendez-vous uniquement.</span>
		</WarningMessage>
 		
 			
		<div class="column">
			<div class="card">
				<div class="card-image">
				<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8505.95835060735!2d3.6122843935627973!3d50.66729528341457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3031e67d2b83b%3A0x10b4e6f57983c35d!2sCabinet+M%C3%A9dical+Docteur+Lebrun+Viviane!5e0!3m2!1sen!2sbe!4v1559465548597!5m2!1sen!2sbe" width="100%" frameborder="0" style="border:0" allowfullscreen></iframe>
		  	</div>
			<div class="card-content">
				<div class="content">
					<p>
						<strong>Adresse</strong><br>Rue Haute 6, 7911 Frasnes-lez-Anvaing
					</p>
					<a href="https://goo.gl/maps/xY66ttZSWHLu7MCh8">
						<small>Voir sur Google Maps</small>
					</a>
				</div>
				</div>
	  	</div>
		</div>
 		
</section>
<!--
	{#if $user}
		logged as : {$user.uid}
		<LogoutButton />
	{:else}
		<LoginButton />
	{/if}
-->

