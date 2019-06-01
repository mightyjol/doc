<script>
	import LoginButton from './auth/LoginButton.svelte'
	import LogoutButton from './auth/LogoutButton.svelte'
	import RdvButton from './buttons/RdvButton.svelte'
	
	import user from '../firebase/user.js'

	export let segment;

	let active = false;
	function toggleMenu(){
		//console.error(active)
		active = !active;
	}

	//$:console.log($user);
</script>

<nav class="navbar is-white" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" href="http://localhost:3000/">
			<img alt="Docteur viviane lebrun logo" src="/images/logo.png" height="28">
		</a>

		<a role="button" on:click="{toggleMenu}" class:is-active="{active}" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
		</a>
  	</div>

	<div id="navbarBasicExample" class:is-active="{active}" class="navbar-menu">
		<div class="navbar-start">
			<a href="/" class="navbar-item is-capitalized">accueil</a>
			{#if $user && $user.isAdmin}
				<a href="/admin/patients" class="navbar-item is-capitalized">Patients</a>
			{:else}
				<a href="" class="navbar-item is-capitalized">horaires</a>
			{/if}
		</div>

		<div class="navbar-end">
			<div class="navbar-item">
				<div class="level buttons">
					{#if $user}
						<LogoutButton />
					{:else}
						<LoginButton />
					{/if}
					<div class="is-hidden-desktop">
						<RdvButton />
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>

