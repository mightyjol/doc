<script>
	import { loginTest } from '../../firebase/firebase.js';

	function login(){
		loginTest();
	}

</script>

<button class="button is-loading" on:click="{login}">Login</button>