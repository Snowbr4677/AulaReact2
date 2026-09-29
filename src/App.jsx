// importando hook useState da biblioteca react
// Ele permite armazenar valores e atualizar a tela automaticamente
import { useState } from "react";
// Importa o arquivo de estilos CSS personalizado com o tema de Sonserina
import "./App.css";

// cria o componente principal da aplicação
function App() {
  // Estado responsavel por armazenar a cidade digitada
  const [cidade, setCidade] = useState("");

  // Armazena o nome oficial da cidade e país retornado pela API para exibir na tela
  const [cidadeExibida, setCidadeExibida] = useState("");

  // armazenar a temperatura
  const [temperatura, setTemperatura] = useState(null);

  // armazenar informações do clima 
  const [clima, setClima] = useState("");

  // Armazena a categoria meteorológica para controlar as mudanças de fundo no CSS
  const [condicaoClima, setCondicaoClima] = useState("padrao");

  // armaneza info da umidade
  const [umidade, setUmidade] = useState("");

  // Armazena o código do ícone fornecido pela OpenWeather
  const [icone, setIcone] = useState("");

  // Controla o estado de carregamento enquanto aguarda a resposta da API
  const [carregando, setCarregando] = useState(false);

  // Mapeia o grupo meteorológico retornado pela API para acionar o fundo correto
  function identificarTema(mainClima, temp) {
    const status = mainClima.toLowerCase();

    // Se a temperatura estiver negativa/zero ou a API apontar neve
    if (temp <= 0 || status === "snow") return "neve";
    // Se for chuva, garoa ou tempestade de trovões
    if (["rain", "drizzle", "thunderstorm"].includes(status)) return "chuva";
    // Céu limpo e ensolarado
    if (status === "clear") return "sol";
    // Nuvens, névoa ou neblina
    if (["clouds", "mist", "fog", "haze"].includes(status)) return "nublado";

    return "padrao";
  }

  // Função executada quando o usuario clicar no botão consultar ou der Enter
  async function consultarClima(e) {
    // Evita o recarregamento automático da página ao submeter o formulário
    if (e) e.preventDefault();

    // Verifica se o campo está vazio
    if (!cidade.trim()) {
      alert("Por favor, digite o nome de uma cidade!");
      return;
    }

    // Ativa o estado de carregamento
    setCarregando(true);

    try {
      // Chave de autenticação da OpenWeatherMap
      const chaveAPI = "4bfbb21e87c9a59041d898636be892bf";

      // Adiciona ',BR' automaticamente caso o usuário não informe outro país
      const consultaFormatada = cidade.includes(",") ? cidade : `${cidade},BR`;

      // Faz a requisição para a API
      const resposta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          consultaFormatada
        )}&appid=${chaveAPI}&units=metric&lang=pt_br`
      );

      // Converte a resposta para JSON
      const dados = await resposta.json();

      // Verifica se a cidade foi encontrada
      if (dados.cod !== 200) {
        alert("Cidade não encontrada no mapa dos feiticeiros!");
        setCarregando(false);
        return;
      }

      // Converte a temperatura para um número inteiro arredondado
      const tempCalculada = Math.round(dados.main.temp);
      // Pega o grupo meteorológico principal (ex: Rain, Clouds, Clear)
      const mainGrupo = dados.weather[0].main;

      // Atualiza o nome da localidade e país
      setCidadeExibida(`${dados.name}, ${dados.sys.country}`);

      // Atualiza temperatura
      setTemperatura(tempCalculada);

      // Atualiza condição climatica
      setClima(dados.weather[0].description);

      // atualiza umidade
      setUmidade(dados.main.humidity);

      //CONTEUDO DA AULA DE HOJE
      //Enviando dados do React para uma API própria
      // Utilizando metodo POST

      //Faz a requisição para a API de historico de cidade
      await fetch("https://localhost:3000/historico"),{

        //Define o método HTTP utilizado
        method: "POST",
        
        //Informa que os dados enviados estarão em formato JSON
        headers:{
          "Content-Type": "application/json"
        },

        // Converte o objeto JS para JSON
        body: JSON.stringify({
          
          //Envia o nome da cidade consultada
          cidade: Cidade,
          
          //Envia a temperatura retornada pela API OpenWeatherMap
          temperatura: dados.main.temp + "°C",
          
          //Envia a descrição do clima
          clima: dados.weather[0].description,
          
          //Envia a umidade do ar
          umidade: dados.main.humidity + "%",

        })

      });

      // Atualiza o código do ícone
      setIcone(dados.weather[0].icon);

      // Define a classe de fundo dinâmica
      setCondicaoClima(identificarTema(mainGrupo, tempCalculada));

    } catch (erro) {
      // Exibe erros de rede ou conexão no console
      console.error(erro);
      alert("Erro ao consultar a API.");
    } finally {
      // Desativa o aviso de carregamento independentemente do resultado
      setCarregando(false);
    }
  }

  // retorna interface visual do sistema
  return (
    // conteiner principal da aplicação com a classe dinâmica do clima
    <div className={`weather-wrapper ${condicaoClima}`}>
      {/* Camada para efeitos atmosféricos contínuos (chuva e neve no fundo) */}
      <div className="weather-overlay"></div>

      {/* Card central estilizado da Sonserina */}
      <div className="weather-card">
        {/* Cabeçalho do card */}
        <header className="card-header">
          {/* Subtítulo temático */}
          <span className="subtitle">PWIII • Sonserina Weather</span>
          {/* Titulo principal */}
          <h1>Previsão do Tempo</h1>
        </header>

        {/* Formulário de consulta que aceita a tecla Enter */}
        <form onSubmit={consultarClima} className="search-box">
          {/* campo para digitação */}
          <input
            // tipo do campo
            type="text"
            // texto exibido dentro da caixa
            placeholder="Digite o local da consulta..."
            // valor vinculado ao estado cidade
            value={cidade}
            // atualiza o estado conforme o usuário digita
            onChange={(e) => setCidade(e.target.value)}
          />

          {/* Botão de consulta */}
          <button type="submit" disabled={carregando}>
            {/* Texto exibido no botao alternando conforme a busca */}
            {carregando ? "Invocando..." : "Consultar"}
          </button>
        </form>

        {/* Exibe o painel de clima apenas se a busca tiver retornado valores */}
        {temperatura !== null && (
          <div className="weather-info">
            {/* Exibe a cidade informada e confirmada pela API */}
            <div className="location-badge">📍 {cidadeExibida}</div>

            {/* Painel com o ícone meteorológico e os graus */}
            <div className="temp-display">
              {icone && (
                <img
                  className="weather-icon"
                  src={`https://openweathermap.org/img/wn/${icone}@4x.png`}
                  alt={clima}
                />
              )}
              {/* Exibe a temperatura */}
              <span className="degrees">{temperatura}°C</span>
            </div>

            {/* Exibe condição climatica */}
            <p className="weather-desc">{clima}</p>

            {/* Linha/grade de detalhes adicionais */}
            <div className="details-grid">
              <div className="detail-item">
                {/* Exibe a umidade */}
                <span className="detail-label">Umidade</span>
                <strong className="detail-val">{umidade}%</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// exporta o componente App para ser utilizado no React
export default App;