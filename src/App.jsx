import { useState } from "react";
import "./App.css";

function App() {
  const [cidade, setCidade] = useState("");
  const [cidadeExibida, setCidadeExibida] = useState("");
  const [temperatura, setTemperatura] = useState(null);
  const [clima, setClima] = useState("");
  const [condicaoClima, setCondicaoClima] = useState("padrao");
  const [umidade, setUmidade] = useState("");
  const [icone, setIcone] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Mapeia o grupo meteorológico retornado pela API
  function identificarTema(mainClima, temp) {
    const status = mainClima.toLowerCase();

    if (temp <= 0 || status === "snow") return "neve";
    if (["rain", "drizzle", "thunderstorm"].includes(status)) return "chuva";
    if (status === "clear") return "sol";
    if (["clouds", "mist", "fog", "haze"].includes(status)) return "nublado";
    
    return "padrao";
  }

  async function consultarClima(e) {
    if (e) e.preventDefault();

    if (!cidade.trim()) {
      alert("Por favor, digite o nome de uma cidade!");
      return;
    }

    setCarregando(true);

    try {
      const chaveAPI = "4bfbb21e87c9a59041d898636be892bf";
      const resposta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cidade
        )}&appid=${chaveAPI}&units=metric&lang=pt_br`
      );

      const dados = await resposta.json();

      if (dados.cod !== 200) {
        alert("Cidade não encontrada no mapa dos feiticeiros!");
        setCarregando(false);
        return;
      }

      const tempCalculada = Math.round(dados.main.temp);
      const mainGrupo = dados.weather[0].main;

      setCidadeExibida(`${dados.name}, ${dados.sys.country}`);
      setTemperatura(tempCalculada);
      setClima(dados.weather[0].description);
      setUmidade(dados.main.humidity);
      setIcone(dados.weather[0].icon);

      // Define a classe de fundo dinâmica
      setCondicaoClima(identificarTema(mainGrupo, tempCalculada));

    } catch (erro) {
      console.error(erro);
      alert("Erro ao consultar os céus.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className={`weather-wrapper ${condicaoClima}`}>
      {/* Camada para efeitos atmosféricos contínuos */}
      <div className="weather-overlay"></div>

      <div className="weather-card">
        <header className="card-header">
          <span className="subtitle">PWIII • Sonserina Weather</span>
          <h1>Previsão do Tempo</h1>
        </header>

        <form onSubmit={consultarClima} className="search-box">
          <input
            type="text"
            placeholder="Digite o local da consulta..."
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
          <button type="submit" disabled={carregando}>
            {carregando ? "Invocando..." : "Consultar"}
          </button>
        </form>

        {temperatura !== null && (
          <div className="weather-info">
            <div className="location-badge">📍 {cidadeExibida}</div>

            <div className="temp-display">
              {icone && (
                <img
                  className="weather-icon"
                  src={`https://openweathermap.org/img/wn/${icone}@4x.png`}
                  alt={clima}
                />
              )}
              <span className="degrees">{temperatura}°C</span>
            </div>

            <p className="weather-desc">{clima}</p>

            <div className="details-grid">
              <div className="detail-item">
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

export default App;