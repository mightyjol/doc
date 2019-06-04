import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
//import { v4 as uuid } from 'uuid';
import session from 'express-session';
import bodyParser from 'body-parser';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		bodyParser.json(),
		session({
			secret: 'test',
			resave: false,
			saveUninitialized: false
		}),
		sapper.middleware({
			session: (req, res) => {
				if(req.session.user !== undefined){
					return {
						user: JSON.parse(req.session.user) //todo replace this with a firebase call
					}
				}

				if(dev) console.log('new session')
				return {}
			}
		})
	);

if (require.main === module) {
    // only listen when started as main
    app.listen(PORT, err => {
        if (err) console.log('error', err);
    });
}

export default app.handler
