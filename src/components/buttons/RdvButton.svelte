<script>
	import { goto, stores } from '@sapper/app'

	let { session } = stores()

	function gotoCalendar(){
		goto('/rdv')
	}

	export let full = false
	export let large = false
</script>

<button 
	class:is-fullwidth="{full}"
	class:is-medium="{large}"
	class="button is-primary" 
	on:click="{gotoCalendar}">
	{#if $session.user && $session.user.isAdmin }
		Voir l'agenda
	{:else}
		Prendre rendez-vous
	{/if}
</button>