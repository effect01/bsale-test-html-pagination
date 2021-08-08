const app = require('./src/app');


//// funcion
async function main(){
    await app.listen(app.get('port')  , () => console.log('server on http://localhost:' + app.get('port')  ) )
}

main();
