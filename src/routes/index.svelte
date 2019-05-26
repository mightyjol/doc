<script>
	import user from '../firebase/user.js'
	import LoginButton from '../components/auth/LoginButton.svelte';
	import LogoutButton from '../components/auth/LogoutButton.svelte';

	$: console.error('currentUser:', $user)
</script>

<svelte:head>
	<title>doctor - home</title>
</svelte:head>

<h1>Home</h1>
<pre>
TODO mobile menu

TODO Signin
if admin => show rdv
if user show homepage
</pre>
<br>


{#if $user}
	logged as : {$user.uid}
	<LogoutButton />
{:else}
	<LoginButton />
{/if}

