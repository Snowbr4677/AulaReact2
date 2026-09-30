// importa a biblioteca Express, responsavel por criar o servidor e as rotas da API 
import express from "express";

// importa a biblioteca Cors, que permite a comunicação 
// entre aplicações executadas em portas diferentes (React e API)
import cors from "cors";

// cria uma instancia de aplicação express
const app = express();

//habilita o cors para permitir requisições vindo do react
app.use(cors());

app.use(express.json());

// Vetor responsavel por armazenar temporariamente todas as consultas realizadas pelo usuario 
let historico = [];

// METODO GET
//Utilizado para consultar informações já armazenadas na API
//Rota responsavel por retornar todo o historico
app.get("/historico", (req, res) => {
    
    //Envia a lista completa de consultas em formato json
    res.json(historico);
});

//METODO POST
//Utilizado para enviar informações para API
app.post("/historico", (req, res) =>{

    // Adiciona os dados recebidos pelo react ao vetor de historico
    historico.push(req.body);

    res.json({
        mensagem: "Consulta salva"
    })
});

// Inicia a API na porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});