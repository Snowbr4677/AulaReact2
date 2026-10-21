//Aula 20/10/2026
//conectando nossa api ao firebase
//realtime database
//====================================

//importa a função responsavel por iniciar o firebase
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";

//importa a função responsavel por conectar o Realtime Database
import { Database, getDatabase } from "firebase/database";

//====================================
// configuração do projeto firebase
//
// essas informações são geradas automaticamente pelo firebase 
// quando registramos nossa aplicação
// elas funcionam como um endereço que permite que nossa 
// aplicação encontre e se conecte ao banco de dados na nuvem
//====================================
const firebaseConfig = {
    //identificador unico do aplicativo
    apiKey: "AIzaSyC8noNSxQY89dhKSYvtlvuqlzeWTIuUJ0I",

    // Dominio de autenticação do projeto
    authDomain: "http://sistema-de-previsao-do-tempo.firebaseapp.com/",

    databaseURL:"https://sistema-de-previsao-do-tempo-default-rtdb.firebaseio.com/",

    //identificador do projeto firebase
    projectId: "sistema-de-previsao-do-tempo",

    // serviço de armazenamento de arquivos
    storageBucket: "sistema-de-previsao-do-tempo.firebasestorage.app",

    // identificador responsavel pela troca de mensagens
    messagingSenderId: "178811878438",

    //identificador unico da aplicação web
    appId: "1:178811878438:web:fa2b6758a988514387fae7",
    
    //identificador utilizado pelo google Analytics
    measurementId: "G-E3JSRDS9F4"
};

// Inicialização do firebase utilizando as configurações acima 
const app = initializeApp(firebaseConfig);

// cria uma conexão com o realtime database a partir desde objeto sera possivel:
//  - Ler Dados 
//  - Salvar Dados 
//  - Atualizar Dados 
//  - Excluir Dados
const db = getDatabase(app);

// Exporta a conexão para que ela possa ser utilizada 
// em outros arquivos, como o server.js
export default db;