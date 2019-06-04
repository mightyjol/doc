<script>
	import LoginButton from './auth/LoginButton.svelte'
	import LogoutButton from './auth/LogoutButton.svelte'
	import RdvButton from './buttons/RdvButton.svelte'
	import user from '../firebase/user.js'
	import { slide } from 'svelte/transition'
	import scroller from './utils/scroller.js'

	export let segment;
	let width;
	let active = false;
	
	function toggleMenu(){
		//console.error(active)
		active = !active;
	}

	function closeMenu(){
		//console.error('test')
		active = false;
	}
	//$:console.error(active);
</script>

<nav bind:clientWidth={width} class="navbar is-white has-shadow" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" href="/">
			<img alt="Docteur viviane lebrun logo" src="/images/logo.png" height="28px">
		</a>

		<a role="button" on:click="{toggleMenu}" class:is-active="{active}" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
		</a>
  	</div>
	
		<div class="navbar-menu is-hidden-touch">
			<div class="navbar-start">
				<a on:click="{closeMenu}" href="/" class="navbar-item is-capitalized">accueil</a>
				{#if $user && $user.isAdmin}
					<a on:click="{closeMenu}" href="/admin" class="navbar-item is-capitalized">agenda</a>
					<a on:click="{closeMenu}" href="/admin/patients" class="navbar-item is-capitalized">patients</a>
					<a on:click="{closeMenu}" href="/admin/settings" class="navbar-item is-capitalized">configuration</a>
				{:else}
				{/if}
			</div>

			<div class="navbar-end">
				<div class="navbar-item">
					<div class="level buttons">
						{#if $user}
							<LogoutButton beforeLogout="{closeMenu}" />
						{:else}
							<a on:click="{closeMenu}" href="/connexion" class="button is-outlined">Se connecter</a>
						{/if}
					</div>
				</div>
			</div>
		</div>
		{#if active}
			<div transition:slide="{{duration:350}}" id="navbarBasicExample" class:is-active="{active}" class="navbar-menu is-hidden-desktop">
				<div class="navbar-start">
					<a on:click="{closeMenu}" href="/" class="navbar-item is-capitalized">accueil</a>
					{#if $user && $user.isAdmin}
						<a on:click="{closeMenu}" href="/admin" class="navbar-item is-capitalized">agenda</a>
						<a on:click="{closeMenu}" href="/admin/patients" class="navbar-item is-capitalized">patients</a>
						<a on:click="{closeMenu}" href="/admin/settings" class="navbar-item is-capitalized">configuration</a>
					{:else}
						<a on:click="{closeMenu}" href="/#horaires" class="navbar-item is-capitalized">horaires</a>
					{/if}
				</div>

				<div class="navbar-end">
					<div class="navbar-item">
						<div class="level buttons">
							{#if $user}
								<LogoutButton beforeLogout="{closeMenu}" />
							{:else}
								<a on:click="{closeMenu}" href="/connexion" class="button is-outlined">Se connecter</a>
							{/if}
							<div on:click="{closeMenu}">
								<RdvButton />
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
</nav>

