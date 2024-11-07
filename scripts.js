const openWeatherKey = "614b3ac38be03af818fe2ad1149f6ff5";
const unsplashKey = "H5zk2c_oT_9m9ergQjNzXhd3iY63sOoglMgRmeo6dU4";

function colocarDadosTela(dados) {
    console.log(dados);
    document.querySelector(".city").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + " °C";
    document.querySelector(".previsao").innerHTML = dados.weather[0].description;
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    
    const favicon = document.querySelector("link[class='icone']");
    favicon.href = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    document.title = `Clima em ${dados.name}`;
    
    buscarImagemCidade(dados.name).then(imagem => {
        if (imagem) {
            document.body.style.backgroundImage = `url(${imagem})`;
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center center";
        } else {
            document.body.style.backgroundColor = '#add8e6';
        }
    });
}

async function buscarCidade(cidade) {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${openWeatherKey}&lang=pt_br&units=metric`)
                        .then(resposta => resposta.json());
    colocarDadosTela(dados);
}

async function buscarImagemCidade(cidade) {
    const palavrasChave = `${cidade} pontos turísticos, landmarks, famous places, events`;

    const url = `https://api.unsplash.com/search/photos?query=${palavrasChave}&client_id=${unsplashKey}&per_page=5&orientation=landscape`;
    const resposta = await fetch(url);
    const dados = await resposta.json();
    
    if (dados.results.length > 0) {
        // Seleciona uma imagem aleatória da lista de imagens
        const imagemAleatoria = dados.results[Math.floor(Math.random() * dados.results.length)];
        return imagemAleatoria.urls.full;
    }
    return null;
}

function cliqueiNoBotao() {
    const cidade = document.querySelector(".input-city").value;
    buscarCidade(cidade);
}
