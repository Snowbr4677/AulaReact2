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
}