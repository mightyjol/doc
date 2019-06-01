<script>
	import { auth } from '../../firebase/firebase.js';
	import user from '../../firebase/user.js';
	import { goto, stores } from '@sapper/app';
	import { del } from '../../routes/_api.js' 
	
	let { session } = stores();
	let loading = false

	async function logout(){
		loading = true
		session.update(s => {
			s.user = undefined 
			return s
		})
		user.set(null)
		await auth.signOut()
		await del('auth/user').then(() => goto('/'))
	}
</script>

<button class:is-loading="{loading}" class="button" on:click="{logout}">Logout</button>