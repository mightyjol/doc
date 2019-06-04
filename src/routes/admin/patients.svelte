<script>
	import { onMount } from 'svelte';
	import { db } from '../../firebase/firebase.js';
	import WarningMessage from '../../components/messages/WarningMessage.svelte';

	let users = undefined
	let hasLoaded = false;
	let loading;

	let loadUsers = async function(){
		let result = [];

		return db.collection('users').get()
		.then(function(querySnapshot) {
		    querySnapshot.forEach(function(doc) {
		        let temp = doc.data()
		        temp.id = doc.id
		        if(!temp.isAdmin) result.push(temp)
		    });
		   	users = result;
		   	hasLoaded = true;
		})
		.catch(e => {
			console.error(e)
		});
	} 

	onMount(async () => {
		users = [];
		loading = loadUsers();
	});

	function activateUser(index, id){
		db.collection('users').doc(id).update({
			isActive: true
		})
		.then(() => {
			console.error(users, index, users[index])
			users[index].isActive = true
		})
		.catch(e => {
			console.error(e)
		})
	}

	$:console.error(users)
</script>

<div class="section">
	<div class="container">
		<div class="content">
			{#if users == undefined}
				Loading
			{:else if hasLoaded && !users.length}
				<WarningMessage>
					<span slot="title">Attention</span>
					<span slot="content">Il n'y a pas d'utilisateur à afficher.</span>		
				</WarningMessage>
			{:else}
				{#await loading}
					Loading
				{:then}
					<h3>Nouvelles demandes</h3>
					<table class="table">
						<thead>
							<tr>
								<th>Email</th>
								<th>Activer</th>
							</tr>
						</thead>
						<tbody>
							{#each users as user, i}
								{#if user.isActive == false}
									<tr>
										<td>{user.email}</td>
										<td>
											<button class="button" on:click="{() => activateUser(i, user.id)}">
												Activer
											</button>
										</td>
									</tr>
								{/if}
							{/each}
						</tbody>
					</table>
					<h3>Liste des patients</h3>
					<table class="table">
						<thead>
							<tr>
								<th>Email</th>
								<th>Supprimer</th>
							</tr>
						</thead>
						<tbody>
							{#each users as user}
								{#if user.isActive == true}
									<tr>
										<td>{user.email}</td>
										<td>X</td>
									</tr>
								{/if}
							{/each}
						</tbody>
					</table>
				{:catch error}
					Error
				{/await}
			{/if}
		</div>
	</div>
</div>