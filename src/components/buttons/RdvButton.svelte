<script>
	import { goto, stores } from '@sapper/app'

	let { session } = stores()

	function gotoCalendar(){
		goto('/rdv')
	}

</script>

<button 
	class="button is-primary" 
	on:click="{gotoCalendar}">
	{#if $session.user && $session.user.isAdmin }
		Voir l'agenda
	{:else}
		Prendre rendez-vous
	{/if}
</button>