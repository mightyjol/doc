<script context="module">
	export async function preload(page, session){
		let user = session.user
		if(!user){
			this.redirect(302, '/connexion')
		}
		if(user && user.isAdmin){
			this.redirect(302, '/admin')
		}
	}
</script>

<script>
	
	//import { Calendar } from '@fullcalendar/core';
	//import dayGridPlugin from '@fullcalendar/daygrid';

	let loading = true;
	/*
	document.addEventListener('DOMContentLoaded', function() {
	  var calendarEl = document.getElementById('calendar');

	  var calendar = new Calendar(calendarEl, {
	    plugins: [ dayGridPlugin ]
	  });

	  calendar.render();
	});
	*/
	//$:console.log('index changed', $user)
</script>

<style>
	.lds-ring {
		display: inline-block;
		position: relative;
		width: 64px;
		height: 64px;
	}
	.lds-ring div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 51px;
		height: 51px;
		margin: 6px;
		border: 6px solid #0a0a0a;
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: #0a0a0a transparent transparent transparent;
	}
	.lds-ring div:nth-child(1) {
		animation-delay: -0.45s;
	}
	.lds-ring div:nth-child(2) {
		animation-delay: -0.3s;
	}
	.lds-ring div:nth-child(3) {
		animation-delay: -0.15s;
	}
	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>

<svelte:head>
	<title>doctor - rdv</title>
</svelte:head>

<section class="section">
 	<div class="container">
 		<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
 	</div>	
</section>
