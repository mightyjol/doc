<script context="module">
	import user from '../firebase/user.js';

	//gettting user data from the session to keep login state even trough refresh
	//this prevents the page from flashing from "you can login" to "hey i guess you re logged in anyway"
	export async function preload(page, session){
		if(session.user !== undefined){
			user.set(session.user)
		}
		else{
			user.set(null)
		}
	}
</script>

<script>
	import 'bulma/css/bulma.css';
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';
	
	export let segment;
</script>

<Nav {segment} />
<slot></slot>
<Footer />
