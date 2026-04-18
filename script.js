const corpoTabela = document.getElementById("corpo-tabela");
const painelGrafico = document.getElementById("resumo-grafico");

const tabelaSalva = localStorage.getItem("memoriaTabela");
const graficoSalvo = localStorage.getItem("memoriaGrafico");
const graficoVisivel = localStorage.getItem("graficoVisivel");

if (tabelaSalva) {
  corpoTabela.innerHTML = tabelaSalva;
}

if (graficoSalvo && graficoVisivel === "sim") {
  painelGrafico.innerHTML = graficoSalvo;
  painelGrafico.classList.remove("escondido");
}

const formSimulador = document.getElementById("form-investimento");

formSimulador.addEventListener("submit", (event) => {
  event.preventDefault();
  const valorInicial = document.getElementById("valor-inicial").value;
  const aporteMensal = document.getElementById("aporte-mensal").value;
  const taxaJuros = document.getElementById("taxa-juros").value;
  const tempoMeses = document.getElementById("tempo-meses").value;

  let capital = parseFloat(valorInicial);
  const aporte = parseFloat(aporteMensal);
  const taxa = parseFloat(taxaJuros) / 100; //transforma 1% em 0.01
  const meses = parseInt(tempoMeses);

  const corpoTabela = document.getElementById("corpo-tabela");
  corpoTabela.innerHTML = "";

  const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  for (let mes = 1; mes <= meses; mes++) {
    let jurosDoMes = capital * taxa;
    capital = capital + jurosDoMes + aporte;

    const linha = document.createElement("tr");

    linha.innerHTML = `

        <td>Mês ${mes}</td>
        <td>${formatadorMoeda.format(jurosDoMes)}</td>
        <td>${formatadorMoeda.format(capital)}</td>


        `;

    corpoTabela.appendChild(linha);
  }

  const totalDinheiroSuado = parseFloat(valorInicial) + aporte * meses;
  const totalJuros = capital - totalDinheiroSuado;

  const porcentagemInvestido = (totalDinheiroSuado / capital) * 100;
  const porcentagemJuros = (totalJuros / capital) * 100;

  document.getElementById("area-resultado").classList.remove("escondido");
  document.getElementById("resumo-grafico").classList.remove("escondido");

  document.getElementById("legenda-investido").innerText =
    `Investimento: R$ ${totalDinheiroSuado.toFixed(2)}`;

  document.getElementById("legenda-juros").innerText =
    `Juros Ganhos: R$ ${totalJuros.toFixed(2)}`;

  setTimeout(() => {
    document.getElementById("barra-investido").style.width =
      `${porcentagemInvestido}%`;
    document.getElementById("barra-juros").style.width = `${porcentagemJuros}%`;

    localStorage.setItem(
      "memoriaGrafico",
      document.getElementById("resumo-grafico").innerHTML,
    );
    localStorage.setItem("graficoVisivel", "sim");
  }, 50);

  localStorage.setItem("memoriaTabela", corpoTabela.innerHTML);
});

const btnLimpar = document.getElementById("btn-limpar");

btnLimpar.addEventListener("click", () => {
  localStorage.clear();

  const corpoTabela = document.getElementById("corpo-tabela");
  corpoTabela.innerHTML = "";

  document.getElementById("area-resultado").classList.add("escondido");

  const painelGrafico = document.getElementById("resumo-grafico");
  painelGrafico.classList.add("escondido");

  document.getElementById("barra-investido").style.width = "0%";
  document.getElementById("barra-juros").style.width = "0%";

  const formSimulador = document.getElementById("form=investimento");
  formSimulador.reset();
});
