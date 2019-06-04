<script context="module">
	export async function preload(page, session){
		let user = session.user
		if(!user){
			console.error('test')
			this.redirect(302, '/connexion')
		}
		
		if(user && !user.isActive){
			this.redirect(302, '/confirmation')
		}
		
		if(user && user.isAdmin){
			this.redirect(302, '/admin')
		}

		if(session.appointment){
			this.redirect(302, '/message')
		}
	}
</script>

<script>
	//TODO refactor this pile of garbage
	import { onMount } from 'svelte';
	import Loader from '../components/utils/Loader.svelte'
	import { db } from '../firebase/firebase.js'
	import config from '../config/config.js'
	import { stores, goto } from '@sapper/app' 

	let { session } = stores()

	import '@fullcalendar/core/main.css';
	import '@fullcalendar/daygrid/main.css';
	import frLocale from '@fullcalendar/core/locales/fr';

	let clientId = "MrZ0HvxcOqoKmdeUm2ca";
	let hours = config.hours
	let hourSpan = config.hourSpan

	let loading = true;
	let taken = {};

	let cal;
	let calendarEl;
	let Calendar;
	let dayGridPlugin;
	let interactionPlugin;

	let hoursSpans = [];
	let day;
	let month;
	let monthString;
	let year;

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

	function takeAppointment(hour){
		db.collection('clients').doc(clientId).collection('appointments').add({
			date: new Date(parseInt(year) + '-' + parseInt(month)+ '-' + parseInt(day)),
			day: parseInt(day),
			month: parseInt(month),
			year: parseInt(year),
			hour: hour.h,
			minute: hour.m,
			duration: hourSpan,
			user: $session.user
		})
		.then(doc => {
			let d = querySnapshot.data()
			delete d['user']
			session.update(sess => {
				sess.appointment = d
				return sess
			})
		    goto('/message')
		})
		.catch(e => {
			console.error(e)
		});
	}

	function checkTaken(){
		for (let y in taken){
			for(let m in taken[y]){
				for(let d in taken[y][m]){
					//check if day is full
					let weekDay = new Date(y + '-' + m + '-' + d).getDay()
					//console.error(weekDay, hours, hours[weekDay])
					let raw = hours[weekDay];
					let start = raw.start;
					let end = raw.end;

					let temp = []
					let running = true;
					let current = Object.assign({}, start)
					let currentTaken = taken[y][m][d]
					while(running == true){
						let h = current.h
						let min = current.m

						if(!currentTaken[h] || !currentTaken[h][min]) {
							running = false
						}

						current.m += 15
						if(current.m >= 60){
							current.m = 0
							current.h += 1
						}
						if(current.h == end.h && current.m == end.m){
							taken[y][m][d]['disabled'] = true
							running = false
						}
					} 
				}
			}
		} 

		console.error(taken)
	}

	let loadDates = async function(){
		let today = new Date();
		return db.collection('clients').doc(clientId).collection('appointments')
		.where('date', '>=', today)
		.get()
		.then(function(querySnapshot) {
		    querySnapshot.forEach(function(doc) {
		    	//update taken date
		    	//console.error(doc.data())
		    	let r = doc.data().hour.split('-')
		    	//console.error(r)
		    	let h = parseInt(r[0])
		    	let m = parseInt(r[1])
		    	let year = parseInt(doc.data().year)
		    	let month = parseInt(doc.data().month)
		    	let day = parseInt(doc.data().day)

		    	if(!taken[year]) taken[year] = {}
	    		if(!taken[year][month]) taken[year][month] = {}
    			if(!taken[year][month][day]) taken[year][month][day] = {}
				if(!taken[year][month][day][h]) taken[year][month][day][h] = {}
	 
				taken[year][month][day][h][m] = true
		    });
		    
		    checkTaken()
	
		})
		.catch(e => {
			console.error(e)
		});
	} 

	function selectDate(){
		if(day == undefined) return;

		let fulldate = getFullDate()
		let weekDay = new Date(fulldate).getDay();

		let raw = hours[weekDay];
		let start = raw.start;
		let end = raw.end;

		let temp = []
		let running = true;
		let current = Object.assign({}, start)
		let currentTaken = undefined
		if(taken[parseInt(year)] && taken[parseInt(year)][parseInt(month)] && taken[parseInt(year)][parseInt(month)][parseInt(day)]){
			currentTaken = taken[parseInt(year)][parseInt(month)][parseInt(day)]
		}	
		 
		//console.error(currentTaken)

		while(running == true){
			let hour = current.h
			let minute = current.m

			if(
				currentTaken
				&& currentTaken[hour]
				&& currentTaken[hour][minute]
			) {
				current.m += 15
				if(current.m >= 60){
					current.m = 0
					current.h += 1
				}
				if(current.h == end.h && current.m == end.m) running = false
				continue;
			}

			if(hour < 10) hour = '0' + hour
			if(minute < 10) minute = '0' + minute	

			let x = {
				h: hour,
				m: minute 
			}

			temp.push(x)

			current.m += 15
			if(current.m >= 60){
				current.m = 0
				current.h += 1
			}
			if(current.h == end.h && current.m == end.m) running = false
			
		} 

		hoursSpans = temp;
	}

	function getFullDate(){
		return year + '-' + month + '-' + day
	}

	function updateDate(){
		let raw = cal.getDate()

		year = raw.getFullYear();
		month = raw.getMonth() + 1;
		day = raw.getDate();
		
		if(month<10) month = "0"+month
		if(day<10) day = "0"+day
	}

	//ssr required
	onMount(async () => {
		let today = new Date();
		let done = false

		await db.collection('clients').doc(clientId).collection('appointments')
		.where('user.uid', '==',  $session.user.uid)
		.where('date', '>=', today)
		.get()
		.then(function(querySnapshot) {
		    if(!querySnapshot.empty){
		    	querySnapshot.forEach(doc => {
		    		let d = doc.data()
		    		delete d['user']
		    		session.update(sess => {
		    			sess.appointment = d
		    			return sess
		    		})
		    		done = true
		    	});
		    }
		})
		.catch(e => {
			console.error(e)
		});

		if(done) return goto('/message')

		const m1 = await import('@fullcalendar/core');
		const m2 = await import('@fullcalendar/daygrid');
		const m3 = await import('@fullcalendar/interaction');

		Calendar = m1.default.Calendar;
		dayGridPlugin = m2.default;
		interactionPlugin = m3.default;

		calendarEl = document.getElementById('calendar');

		cal = new Calendar(calendarEl, {
			height: 'auto',
			aspectRatio: 1.2,
			plugins: [ interactionPlugin, dayGridPlugin ],
			locale: frLocale,
			selectable: false,
			unselectAuto: false,	 
			dateClick: function(info) {
				if(!hours[info.date.getDay()]) return;

				let raw = info.dateStr.split('-')
				let tyear = parseInt(raw[0])
				let tmonth = parseInt(raw[1])
				let tday = parseInt(raw[2])

				if(taken[tyear] && taken[tyear][tmonth] && taken[tyear][tmonth][tday] && taken[tyear][tmonth][tday].disabled) {
					return;
				}

				year = tyear
				month = tmonth
				day = tday
				monthString = months[parseInt(month) - 1]

				cal.select(info.dateStr)
				//info.el.classList.add('fc-highlight');
				
				selectDate();
			},
			validRange: function(nowDate) {
				//console.error(nowDate.setDate( nowDate.getDate() + 1 ));
				return {
					start: nowDate //TODO add an end date
				};
			},
			datesRender: function(info){
				selectDate()
			},
		 	dayRender: function(info){
		 		let y = info.date.getFullYear() 
		 		let m = info.date.getMonth() + 1;
		 		let d = info.date.getDate();

		 		if(
		 			(taken[y] && taken[y][m] && taken[y][m][d] && taken[y][m][d].disabled)
		 			|| hours[info.date.getDay()] === undefined
	 			){
		 			info.el.classList.add('fc-disabled-day');
		 		}
		        
		    }
		});

		await loadDates();

		loading = false;
		console.error('3')
		setTimeout(function () {
			console.error('4')
		    cal.render();	
		});
	});
</script>

<style>
	.big{
		font-size: 50px;
	}

	.small{
		font-size: 25px;
		margin-top: 15px;
	}

	.is-hidden{
		visibility: hidden;
	}

	.column.is-relative{
		min-height: 300px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

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

<div class="hero is-fullheight-with-navbar">
	<div class="hero-body">
		<div class="container">
			<div class="columns">
				<div class:is-hidden="{loading}" class="column first">
					<h3 class:is-hidden="{loading}">Prendre rendez-vous</h3>
					<div id="calendar"></div>
				</div>
				<div class:is-hidden="{loading}" class="column second">
					{#if day == undefined}
						<div class="message">
							<div class="message-body">
								<h4 class="is-medium">Comment prendre rendez-vous?</h4>
								<ul>
									<li>- Sélectionner un jour</li>
									<li>- Sélectionner une plage horaire disponible</li>
									<li>- Laisser un message (optionnel)</li>
								</ul>	
							</div>
						</div>
					{/if}
					{#if day != undefined}
						<div class="content">
							<h4>{day} {monthString} - Plages disponibles</h4>
						</div>
					{/if}
					{#each hoursSpans as hour}
						<div class="box">
							<div class="content">
								<div class="level">
									<div class="level-left">
										<div class="level-item">
											<span class="big has-text-weight-bold">
												{hour.h}
											</span>
											<span class="small has-text-weight-medium">
												h{hour.m}
											</span>
										</div>
									</div>
									<div class="level-right">
										<div class="level-item">
											<button class="button is-outlined" on:click="{() => {takeAppointment(hour)}}">
												Réserver
											</button>
										</div>
									</div>
								</div>	
							</div>
						</div>
					{/each}
				</div>
		 
				<div class:is-hidden="{!loading}" class="column is-relative">
					<Loader />
				</div>
			</div>
		</div>
	</div>
</div>