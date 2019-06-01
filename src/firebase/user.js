import { writable } from 'svelte/store'

//TODO refactor that into the session
let user = writable(undefined)

export default user;