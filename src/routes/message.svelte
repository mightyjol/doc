
<script context="module">
	export async function preload(page, session){
		if(session.user && session.appointment){
			return {
				appointment: session.appointment
			}
		}

		this.redirect(302, '/rdv')
	}
</script>

<script>
	export let appointment;	

	//TODO abstract this please (getMonth string or something)
	let months = [
		"Janvier",
		"Février",
		"Mars",
		"Avril",
		"Mai",
		"Juin",
		"Juillet",
		"Aout",
		"Septembre",
		"Octobre",
		"Novembre",
		"Décembre"
	]

	 console.error(appointment)
	let month = months[new Date(appointment.date.seconds).getMonth() +1];
	let day = appointment.day;
	let h = appointment.hour;
	let m = appointment.minute;
	//console.error(appointment, appointment.h, appointment.m)
</script>

<section class="hero is-fullheight-with-navbar">
	<div class="hero-body"> 
	 	<div class="container">
	 		<div class="columns is-centered is-vcentered">
	 			<div class="column is-two-thirds has-text-centered">
	 				<div class="box">
	 					<div class="box-content">
	 						<!--
		 						<h5 class="title has-text-centered"></h5>
		 					-->
			 				<h6 class="subtitle  has-text-centered">
			 					Vous serez attendus au cabinet du Docteur Lebrun, situé 6 Rue Haute, 7911 Frasnes-lez-Anvaing.<br>
			 					Le {day} {month} à {h} heure {m}.
			 				</h6>
			 				<a href="/" class="button is-primary">
			 					Retour à l'acceuil
			 				</a>
	 					</div>
	 				</div>
	 			</div>
	 		</div>
	 	</div>	
	</div>
</section>