# node-google-maps-autocomplete

Esta aplicação é um exemplo para realizar consultas de autocomplete de endereços utilizando a API do Google Maps.

A ideia é consultar o Google porém salvar as requisições realizadas em uma base de dados própria, MongoDB neste exemplo.

Para rodar a aplicação é necessário ter o [node.js](https://nodejs.org/pt-br/download/) instalado na máquina.

Basta entrar no repositório e executar `npm install` para baixar as dependências do projeto, em seguida `npm start` para iniciar o servidor.

Agora é só acessar `http://localhost:8080/autocomplete?q=SEU_TEXTO_DE_BUSCA` ou realizar uma requisição do tipo GET para o mesmo endereço.

A porta do servidor, chave da API do Google Maps e URI de conexão com o MongoDB podem ser alteradas em `config/default.js`
