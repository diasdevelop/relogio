function iniciarRelogio() {
    const ponteiroHoras = document.querySelector(".horas");
    const ponteiroMinutos = document.querySelector(".minutos");
    const ponteiroSegundos = document.querySelector(".segundos");
    const mensagensDiv = document.querySelector(".mensagens");
    const relogioDigital = document.querySelector(".rel-digital");

    let ultimaHora = -1; // Para evitar atualizar mensagens desnecessariamente

    function atualizarRelogio() {
        const agora = new Date();
        const horas = agora.getHours();
        const minutos = agora.getMinutes();
        const segundos = agora.getSeconds() + agora.getMilliseconds() / 1000; // Adiciona fração de segundos para suavizar

        // Calcula os ângulos de rotação
        const grausHoras = (horas % 12) * 30 + minutos * 0.5;
        const grausMinutos = minutos * 6 + segundos * 0.1;
        const grausSegundos = segundos * 6 - 1;

        // Aplica a rotação nos ponteiros
        ponteiroHoras.style.transform = `rotate(${grausHoras}deg)`;
        ponteiroMinutos.style.transform = `rotate(${grausMinutos}deg)`;
        ponteiroSegundos.style.transform = `rotate(${grausSegundos}deg)`;

        requestAnimationFrame(atualizarRelogio); // Mantém a animação fluida
    }

    function atualizarRelogioDigital() {
        const agora = new Date();
        const horas = agora.getHours().toString().padStart(2, "0");
        const minutos = agora.getMinutes().toString().padStart(2, "0");
        const segundos = agora.getSeconds().toString().padStart(2, "0");

        relogioDigital.textContent = `${horas}:${minutos}:${segundos}`;

        // Atualiza a mensagem apenas se a hora mudar
        if (agora.getHours() !== ultimaHora) {
            atualizarMensagem(agora.getHours());
            ultimaHora = agora.getHours();
        }

        setTimeout(atualizarRelogioDigital, 1000); // Atualiza o relógio digital a cada segundo
    }

    function atualizarMensagem(horas) {
        const agora = new Date();
        const nomeDiaSemana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"][agora.getDay()];
        const dia = agora.getDate().toString().padStart(2, "0");
        const mes = (agora.getMonth() + 1).toString().padStart(2, "0");
        const ano = agora.getFullYear();

        let saudacao = "";
        let mensagens = [];

        if (horas >= 5 && horas < 12) {
            saudacao = "Bom dia!";
            mensagens = [
                "Que seu dia comece com energia positiva e muitos sorrisos!",
                "Hoje é um novo começo, aproveite cada instante!",
                "Que o sol ilumine seu caminho e traga muitas conquistas!",
                "Que sua manhã seja leve, produtiva e cheia de boas surpresas!",
                "Um novo dia traz novas oportunidades. Aproveite!"
            ];
        } else if (horas >= 12 && horas < 18) {
            saudacao = "Boa tarde!";
            mensagens = [
                "Que sua tarde seja cheia de boas energias e grandes realizações!",
                "Respire fundo, siga em frente e conquiste seus sonhos!",
                "Nada como uma tarde para renovar as forças e continuar brilhando!",
                "Que essa tarde traga momentos incríveis e muitas alegrias!",
                "O dia ainda não acabou, há sempre tempo para fazer algo especial!"
            ];
        } else {
            saudacao = "Boa noite!";
            mensagens = [
                "Relaxe, descanse e renove suas energias para um novo dia!",
                "Que sua noite seja tranquila e cheia de paz!",
                "Aproveite a noite para refletir sobre as conquistas do dia!",
                "Que o descanso de hoje traga força para os desafios de amanhã!",
                "O dia pode ter sido longo, mas amanhã é uma nova chance de brilhar!"
            ];
        }

        // Escolhe uma mensagem aleatória
        const mensagemAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];

        // Exibe a mensagem
        mensagensDiv.style.fontSize = "1.5em";
        mensagensDiv.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;${saudacao}.<br><br>&nbsp;&nbsp;&nbsp;&nbsp;${mensagemAleatoria}<br><br>&nbsp;&nbsp;&nbsp;&nbsp;Hoje é ${nomeDiaSemana},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${dia}/${mes}/${ano}`;
    }

    atualizarRelogio(); // Inicia a rotação dos ponteiros
    atualizarRelogioDigital(); // Inicia o relógio digital
}

document.addEventListener("DOMContentLoaded", iniciarRelogio);
