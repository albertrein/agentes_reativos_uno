let express = require('express')
let app = express();

app.get('/', (requisicao, resposta)=>{
	resposta.sendFile(__dirname+'/index.html');
});

app.use('/classes', express.static(__dirname + '/classes'));

app.listen(process.env.PORT || 3000);
console.log('Servidor ativo!');