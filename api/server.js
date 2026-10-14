import express from "express";

import cors from "cors";

// importa o modulo File System
// este modulo permite ler e escrever arquivos usando JS
import fs from "fs";

// importa a conexão criada com o Firebase
import db from "./firebase.js";


import {
    ref,
    push
} from "firebase/database";

const app = express();

app.use(cors());

// permite que a API receba e interprete dados no formato jsob
app.use(express.json());

let historico = [];

//verifica se arquivo historico.json exista
//caso exista, os dados serão carregados para dentro do vetor historico
if (fs.existsSync("./api/historico.json")) {

    // lê o conteudo do arquivo historico.json
    const dadosArquivo = fs.readFileSync(
        "./api/historico.json",
        "utf-8",
    );

    try {


        if (dadosArquivo.trim() !== "") {

            // converte JSON do arquivo para um array JS
            historico = JSON.parse(dadosArquivo);

        } else {

            historico = [];
        }

    } catch {
        historico = [];
    }
}

app.get("/historico", (req, res) => {
    res.json(historico);
});

app.post("/historico", async (req, res) => {
    historico.push(req.body);


    //Cria uma refencia chamada "historico" no banco de dados do firebase.
    //caso ela não exista, o firebase ira cria-la automaticamente.
    const referenciaFirebase = ref(db, "historico");

    //Salva uma copia dos dados tambem no firebase
    //Realtime Database
    await push(referenciaFirebase, req.body);

    const historicoJSON = JSON.stringify(
        historico,
        null,
        2
    );

    // Salva os dados atualizados no arquivo historico.json
    // Assim os registros permanecem armazenados mesmo apos desligar o servidor
    fs.writeFileSync(
        "./api/historico.json",
        historicoJSON
    );
    
    // Retorna uma mensagem informando que o registro foi salvo com sucesso 
    res.json ({
        mensagem: "Consulta salva"
    });
});

// inicialização do servidor

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});