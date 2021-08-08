const app = require('./src/app');



function main(){
     app.listen(app.get('port')  , () => console.log('server on http://localhost:' + app.get('port')  ) )
}

main();
