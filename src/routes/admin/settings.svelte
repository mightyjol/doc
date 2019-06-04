<script>
	import { onMount } from 'svelte';
	import { db } from '../../firebase/firebase.js';

	let clientId = "MrZ0HvxcOqoKmdeUm2ca"

	let settings = undefined;
	let loading;

	let loadSettings = async function(){
		return db.collection('clients').doc(clientId).collection('private').doc('settings').get()
		.then(function(querySnapshot) {
			let result = {}
		    querySnapshot.forEach(function(doc) {
		        result[doc.id] = doc.data()
		    });
		   	settings = result
		})
		.catch(e => {
			console.error(e)
		});
	} 

	onMount(async () => {
		loading = loadSettings();
	});

	function saveSettings(){
		 
	}
</script>

<div class="section">
	<div class="container">
		<div class="content">
			{#if settings == undefined}
				Loading
			{:else}
				{#await loading}
					Loading
				{:then}
					<h4>Paramètres</h4>
					<div class="field">
						<input type="text">
					</div>
				{:catch error}
					Error
				{/await}
			{/if}
		</div>
	</div>
</div>