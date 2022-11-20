const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const porta = 3000;

// adiciona comunicação HTTP para o cliente receber a estrutura da página
// com o input e botão, além da lista de mensagens que será preenchida
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// evento de conexão de um cliente, e adição de um "listener"
// que processará a mensagem recebida e emitirá para outros clientes
io.on("connection", (socket) => {
  socket.on("mensagem", (mensagem) => {
    io.emit("mensagem", mensagem);
  });
});

// inicialização do servidor, com a porta definida na constante "porta"
http.listen(porta, () => {
  console.log(`Servidor socket disponível em http://localhost:${porta}`);
});
