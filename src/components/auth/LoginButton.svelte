<script>
	import { loginTest } from '../../firebase/firebase.js';
	import { auth, db } from '../../firebase/firebase.js';
	import user from '../../firebase/user.js';
	import { goto, stores } from '@sapper/app';
	import { post } from '../../routes/_api.js' 

	export let redirect = '/';
	export let email = '';
	export let password = '';
	export let large = false;

	let { session } = stores();
	let loading = false;


	async function login(){
		loading = true
		await loginTest().then(res => {
			let u = res.user
			db.collection('users').doc(u.uid).get()
			.then(async res => {
				let data = res.data()

				//updating the server session (does not matter if this fails really)
				await post('auth/user', {
					user: JSON.stringify(data)
				})
				user.set(data);
				session.update(sess => {
					sess.user = data
					return sess
				})
				goto(redirect)
			});
		})
	}
</script>

<button 
	class:is-primary="{large}"
	class:is-medium="{large}"
	class:is-fullwidth="{large}" 
	class:is-loading="{loading}" 
	class:is-outlined="{!large}"
	class="button" 
	on:click="{login}">
	Se connecter
</button>