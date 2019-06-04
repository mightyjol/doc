import { writable } from 'svelte/store'

let scrollStore = writable(undefined);

export default scrollStore;