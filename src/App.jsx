// importando hook useState da biblioteca react
// Ele permite armazenar valores e atualizar a tela automaticamente
import { useState } from "react";

// cria o componente principal da aplicação
function App(){

  // Estado responsavel por armazenar a cidade digitada
  const [cidade, setCidade] = useState("");

  // armazenar a temperatura
  const [temperatura, setTemperatura] = useState("");

  // armazenar informações do clima 
  const [clima, setClima] = useState("");
  
  // armaneza info da umidade
  const [umidade, setUmidade] = useState("");

  // Função executada quando o user clicar no botão consultar
  function consultarClima (){
    //verifica se a cidade digitada é são paulo
    if(
      cidade.toLowerCase() === "são paulo" || 
      cidade.toLowerCase() === "sao paulo" 
    ){
      // atualiza temperatura
      setTemperatura("24°C");

      // atualiza condição climatica
      setClima("Ensolarado");
      
      // atualiza umidade
      setUmidade("60%");
    }

    else if(cidade.toLowerCase() === "curitiba"){
      
      setTemperatura("17°C");

      setClima("Chuvoso");
      
      setUmidade("85%");
    }

    else if(cidade.toLowerCase() === "guarujá" || cidade.toLowerCase() === "guaruja" ){
      
      setTemperatura("21°C");

      setClima("chuvoso");
      
      setUmidade("76%");
    }

    else if(cidade.toLowerCase() === "santos"){
      
      setTemperatura("20°C");

      setClima("Nublado");
      
      setUmidade("76%");
    }

    else if(cidade.toLowerCase() === "praia grande"){
      
      setTemperatura("20°C");

      setClima("Nublado");
      
      setUmidade("78%");
    }

    else if(cidade.toLowerCase() === "campos do jordão" || cidade.toLowerCase() === "campos do jordao"){
      
      setTemperatura("17°C");

      setClima("Nublado");
      
      setUmidade("81%");
    }

    // executa caso a cidade não esteja cadastrada
    else {
      
      setTemperatura("--");
     
      setCidade("Cidade não cadastrada");

      setUmidade("--");
    }

    

  }
  //retorna interface visual do sistema
  return (

    // conteiner principal da aplicação
    <div style={{ padding:"20px", fontFamily: "sans-serif"}}>

      {/* Titulo principal */}
      <h1>Sistema de Previsão do tempo</h1>

      {/* campo para digitação */}
      <input 

      //tipo do campo
      
      type="text" 
      
      //texto exibido dentro da caixa
      placeholder="Digite uma cidade" 
      
      //valor vinculado ao estado cidade
      value={cidade} 

      //
      onChange={(e) =>setCidade(e.target.value)}>
      
      </input>

      {/* Botão de consulta */}
      <button
      // executa função de consultar clima
      onClick={consultarClima}

      //define a margem à esquerda
      style={{
        marginLeft:"10px"
      }}
      >
        {/* Texto exibido no botao */}
        Consultar
      </button>
      
      {/* Linha horizontal para separar seçoes */}
      <hr/>

      {/* Exibe a cidade informada */}
      <h2>Cidade: {cidade}</h2>
      
      {/* Exibe a temperatura*/}
      <h2>Temperatura: {temperatura}</h2>
      
      {/* Exibe condição climatica*/}
      <h2>Clima: {clima}</h2>
      
      {/* Exibe a umidade*/}
      <h2>Umidade: {umidade}</h2>
      
    </div>

  )
}

//exporta o componente App para ser utilizado no React
export default App;