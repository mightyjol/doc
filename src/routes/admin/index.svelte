<script>
	import { onMount } from 'svelte';
	import Loader from '../../components/utils/Loader.svelte'
	import { db } from '../../firebase/firebase.js'

	import '@fullcalendar/core/main.css';
	import '@fullcalendar/list/main.css';
	import frLocale from '@fullcalendar/core/locales/fr';

	let clientId = "MrZ0HvxcOqoKmdeUm2ca";

	let cal;
	let cal2;
	let calendarEl;
	let Calendar;
	let listPlugin;

	let appointments = []
	let day;
	let month;
	let year;

	let data = undefined
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

	//ssr required
	onMount(async () => {
		let today = new Date()
		await db.collection('clients').doc(clientId).collection('appointments')
		.where('date', '>=', today)
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(doc => {
				//do something
				let raw =  doc.data()
				let date = new Date(raw.year + '-' + raw.month + '-' + raw.day)
				date.setHours(parseInt(raw.hour), parseInt(raw.minute))

				appointments.push({
					title: 'Consultation',
					start: date,
					extendedProps: {
						user: raw.user,
						message: '',
						day: raw.day,
						month: raw.month
					}
				})
			})
		})
		.catch(e => {
			console.error(e)
		});

		const m1 = await import('@fullcalendar/core');
		const m2 = await import('@fullcalendar/list');
		Calendar = m1.default.Calendar;
		listPlugin = m2.default;

		//console.error(m1, Calendar)
		calendarEl = document.getElementById('calendar');

		cal = new Calendar(calendarEl,  {
			plugins: [ listPlugin ],
			defaultView: 'listWeek',
			locale: frLocale,
			events: appointments,
			validRange: function(nowDate) {
				//console.error(nowDate.setDate( nowDate.getDate() + 1 ));
				return {
					start: nowDate //TODO add an end date
				};
			},
			eventClick: (info) => {
				updateData(info.event.extendedProps)
			}
		})

		setTimeout(() => {
			cal.render();
		})
	});

	function updateData(info){
		console.error(info)
		data = info
		console.error(data)
	}
</script>

<style>
	@media screen and (min-width: 1024px){
		.first{
			max-width: 450px;
		}
	}

	@media screen and (max-width: 1023px){
		.first, .second{
			max-width: 450px;
			margin: 0 auto;
		}
	}
</style>

<div class="section">
	<div class="container">
		<h4>Agenda</h4>
		<div class="columns">
			<div class="column first">
				<div id="calendar"></div>
			</div>
			<div class="column second">
				{#if data != undefined}
					<div class="box">
						<div class="content">
							<h4><strong>{data.day} {months[data.month]}</strong></h4>
							<p>
								<strong>{data.user.name} - {data.user.email}</strong><br>
								{data.message ? data.message : "Pas de message" }
							</p>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>