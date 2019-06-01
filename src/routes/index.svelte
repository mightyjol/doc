<script>
	import user from '../firebase/user.js';
	import LoginButton from '../components/auth/LoginButton.svelte';
	import LogoutButton from '../components/auth/LogoutButton.svelte';	
	import RdvButton from '../components/buttons/RdvButton.svelte';	
	import WarningMessage from '../components/messages/WarningMessage.svelte' //TODO abstract that

	//$:console.log('index changed', $user)
	 
</script>

<style>
	.is-striked{
		text-decoration: line-through;
	}
</style>

<svelte:head>
	<title>doctor - home</title>
</svelte:head>

<section class="hero is-light is-fullheight-with-navbar">
	<div class="hero-body">
		<div class="container has-text-centered-mobile">
			<h1 class="title">Docteur Viviane Lebrun</h1>
			<h2 class="subtitle">Consultation en Médecine Générale</h2>
			<div class="is-grouped buttons are-normal is-hidden-mobile">
				{#if !$user}
					<LoginButton />
				{/if}
				<RdvButton />
			</div>
			<div class="columns is-hidden-tablet is-centered">
				<div class="column is-half">
					{#if !$user}
						<LoginButton />
					{/if}
					<RdvButton />
				</div>
			</div>
		</div>
  	</div>
</section>
<section class="section">
	<div class="container">
		<WarningMessage	title="important" content="Consultations sur rendez-vous uniquement." />
		<a href="/inscription" class="button is-primary">
			s'inscrire
		</a>
		<div class="content">
			<ul>
				<li class="is-striked">TODO mobile menu</li>
				<li class="is-striked">TODO Signin</li>
				<ul>
					<li>if admin => show rdv</li>
					<li>if user show homepage</li>
				</ul>
				<li>take appointment</li>
				<ul>
					<li>calendar with open days</li>
					<li>select open day => shows open hours</li>
					<li>select open hour => save appointment</li>
					<li>message when you take appointment</li>
				</ul>
				<li>Admin side</li>
				<ul>
					<li>manage users</li>
					<ul>
						<li>add new user</li>
						<li>modify user</li>
						<li>delete user</li>
						<li>list new users + accept them</li>
					</ul>
					<li>see calendar with appointments</li>
					<ul>
						<li>onclick => see details</li>
					</ul>
					<li>manage open days and hours</li>
				</ul>
			</ul>
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

