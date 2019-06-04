import config from '../config/firebase.js'
 
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

let app = firebase.initializeApp(config)

export const userKey = {};
export const auth = app.auth()
export const db = app.firestore()

//TODO move login/signup to server ?
//TODO add a check to see if user has rights to client
export const login = (email, password) => {
    console.log('logging in under ', email, password);
    let promise = auth.signInWithEmailAndPassword(email, password)
    
    promise.then(data => {
    	 
    })
    .catch(e => console.error(e))
	
	return promise
}

export const loginTest = () => {
    return login('test@test.com', 'testing')
}

export const signup = (data) => {
	let pwd = data.password;
	delete data['password']

	data.clients = ['MrZ0HvxcOqoKmdeUm2ca'];
	data.isActive = false;
	//TODO call to server
	let promise = auth.createUserWithEmailAndPassword(data.email, pwd);
	promise.then(res => {
		data.uid = res.user.uid
		db.collection('users').doc(res.user.uid).set(data);
	})

	return promise
}