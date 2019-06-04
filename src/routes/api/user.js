export async function post(req, res, next){
	console.log('session updated')
	req.session.user = req.body.user
	res.end()
}

export async function del(req, res, next){
	console.log('session destroyed')
	req.session.user = undefined
	res.end()
}