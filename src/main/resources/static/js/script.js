
function entrar() {
	document.querySelector('.container-fluid').style.display = 'none';
	document.getElementById('loading').style.display = 'block';

	setTimeout(function() {
		window.location.href = "/Blacklist/criarHeroi";
	}, 1500);
}

function verificarNome() {
	var nomeInput = document.getElementById("nome").value;
	var mensagemErro = document.getElementById("mensagemErro");

	if (nomeInput.trim() === "") {
		mensagemErro.textContent = "O NOME NÃO PODE SER BRANCO OU NULO, IDENTIFIQUE-SE!";
	} else {
		mensagemErro.textContent = "";
		comecarJogo();
	}
}

function comecarJogo() {
	document.getElementById("criarHeroiDiv").style.display = "none";
	document.getElementById("loading").style.display = "block";

	setTimeout(function() {
		document.getElementById("nomeForm").submit();
	}, 1500);
}

function distribuirHeroi(id) {
	var url = "/Blacklist/listarViloes/distribuirHeroi?id=" + id;
	url = encodeURI(url);
	$("#divDistribuirHeroi").load(url, function() {
		abrirModalDistribuirHeroi();
		var totalPontos = parseInt(document.getElementById('distribuirPontos').textContent);
		document.getElementById('adcPontos').textContent = totalPontos;
	});
}

function updateValor() {
	var totalPontos = parseInt(document.getElementById('distribuirPontos').textContent);

	var adcVida = parseInt(document.getElementById('adcVida').value);
	var adcAtaque = parseInt(document.getElementById('adcAtaque').value);
	var adcDefesa = parseInt(document.getElementById('adcDefesa').value);

	var pontosVida = parseInt(document.getElementById('pontosVida').value);
	var pontosAtaque = parseInt(document.getElementById('pontosAtaque').value);
	var pontosDefesa = parseInt(document.getElementById('pontosDefesa').value);

	if (adcVida < pontosVida) {
		alert('Os valores não podem ser reduzidos. Por favor, insira pontos!');
		document.getElementById('adcVida').value = pontosVida;
		return;
	}

	if (adcAtaque < pontosAtaque) {
		alert('Os valores não podem ser reduzidos. Por favor, insira pontos!');
		document.getElementById('adcAtaque').value = pontosAtaque;
		return;
	}

	if (adcDefesa < pontosDefesa) {
		alert('Os valores não podem ser reduzidos. Por favor, insira pontos!');
		document.getElementById('adcDefesa').value = pontosDefesa;
		return;
	}

	adcVida = Math.max(adcVida, pontosVida);
	adcAtaque = Math.max(adcAtaque, pontosAtaque);
	adcDefesa = Math.max(adcDefesa, pontosDefesa);

	var diferencaVida = adcVida - pontosVida;
	var diferencaAtaque = adcAtaque - pontosAtaque;
	var diferencaDefesa = adcDefesa - pontosDefesa;

	var totalDistribuido = diferencaVida + diferencaAtaque + diferencaDefesa;
	var pontos = totalPontos - totalDistribuido;

	if (pontos < '0') {
		alert('Não existe pontos a serem distribuidos!');
		document.getElementById('adcPontos').textContent = totalPontos;
		document.getElementById('adcVida').value = pontosVida;
		document.getElementById('adcAtaque').value = pontosAtaque;
		document.getElementById('adcDefesa').value = pontosDefesa;
		return;
	}

	document.getElementById('adcPontos').textContent = pontos;

	var disableFields = pontos === 0;
	document.getElementById('adcVida').disabled = disableFields;
	document.getElementById('adcAtaque').disabled = disableFields;
	document.getElementById('adcDefesa').disabled = disableFields;
}

function resetarPontos() {
	var adcVidaInput = document.getElementById('adcVida');
	var adcAtaqueInput = document.getElementById('adcAtaque');
	var adcDefesaInput = document.getElementById('adcDefesa');

	adcVidaInput.value = document.getElementById('pontosVida').value;
	adcAtaqueInput.value = document.getElementById('pontosAtaque').value;
	adcDefesaInput.value = document.getElementById('pontosDefesa').value;

	updateValor();
}

function salvarPontos() {
	var idPontos = document.getElementById('idPontos').textContent;
	var adcVida = parseInt(document.getElementById('adcVida').value);
	var adcAtaque = parseInt(document.getElementById('adcAtaque').value);
	var adcDefesa = parseInt(document.getElementById('adcDefesa').value);
	var adcPontos = parseInt(document.getElementById('adcPontos').textContent);

	var url = "/Blacklist/listarViloes/distribuir?idPontos=" + idPontos + "&adcPontos=" + adcPontos + "&adcVida=" + adcVida + "&adcAtaque=" + adcAtaque + "&adcDefesa=" + adcDefesa;
	url = encodeURI(url);

	$.ajax({
		type: "PUT",
		url: url,
		data: idPontos, adcPontos, adcVida, adcAtaque, adcDefesa,
		success: function() {
			alert("PONTOS DISTRIBUIDOS SALVOS COM SUCESSO!");
			fecharModalDistribuirHeroi();
			window.location.href = "/Blacklist/listarViloes";
		},
	});
}

function deletarHeroi(id, nome) {
	var url = "/Blacklist/listarViloes/deletarHeroi?id=" + id + "&nome=" + nome;
	url = encodeURI(url);
	$("#divDeletarHeroi").load(url, function() {
		abrirModalDeletarHeroi();
	});
}

function deletar(id, nome) {
	var url = "/Blacklist/listarViloes/deletar?id=" + id + "&nome=" + nome;
	url = encodeURI(url);

	$.ajax({
		type: "DELETE",
		url: url,
		data: id, nome,
		success: function() {
			alert("HEROI: " + nome + " DELETADO COM SUCESSO!");
			fecharModalDeletarHeroi();
			window.location.href = "/Blacklist/criarHeroi";
		},
	});
}

function infoHeroi(id) {
	var url = "/Blacklist/listarViloes/infoHeroi?id=" + id;
	url = encodeURI(url);
	$("#divInfoHeroi").load(url, function() {
		abrirModalInfoHeroi();
	});
}

function infoVilao(id) {
	var url = "/Blacklist/listarViloes/infoVilao?id=" + id;
	url = encodeURI(url);
	$("#divInfoVilao").load(url, function() {
		abrirModalInfoVilao();
	});
}

function desfocarOutrosHerois(element) {
	var imagensHeroi = document.querySelectorAll('#tabelaHeroi img');

	for (var i = 0; i < imagensHeroi.length; i++) {
		var heroiImagem = imagensHeroi[i];
		var heroiRow = heroiImagem.parentNode;

		if (heroiImagem !== element) {
			heroiRow.style.opacity = 0.5;
			heroiImagem.setAttribute('data-selected', 'false');
		} else {
			heroiRow.style.opacity = 1;
			element.setAttribute('data-selected', 'true');
		}
	}
}

function desfocarOutrosViloes(element) {
	var imagensVilao = document.querySelectorAll('#tabelaVilao img');

	for (var i = 0; i < imagensVilao.length; i++) {
		var vilaoImagem = imagensVilao[i];
		var vilaoRow = vilaoImagem.parentNode;

		if (vilaoImagem !== element) {
			vilaoRow.style.opacity = 0.5;
			vilaoImagem.setAttribute('data-selected', 'false');
		} else {
			vilaoRow.style.opacity = 1;
			element.setAttribute('data-selected', 'true');
		}
	}
}

function iniciarBatalha() {
	var selectedHeroi = document.querySelector('#imgLogoHeroi[data-selected="true"]');
	var selectedVilao = document.querySelector('#imgLogoVilao[data-selected="true"]');

	if (selectedHeroi && selectedVilao) {
		var idHeroi = selectedHeroi.getAttribute('data-idHeroi');
		var idVilao = selectedVilao.getAttribute('data-idVilao');

		document.getElementById('tabelaGeral').style.display = 'none';
		document.getElementById('loading-container').style.display = 'flex';

		let progressBarInner = document.getElementById('progress-bar-inner');
		let progressText = document.getElementById('progress-info');
		let width = 0;
		let interval = setInterval(function() {
			if (width >= 100) {
				clearInterval(interval);
				window.location.href = '/Blacklist/batalha?idHeroi=' + idHeroi + '&idVilao=' + idVilao;
			} else {
				width++;
				progressBarInner.style.width = width + '%';
				progressText.innerText = width + '%';
			}
		}, 30);
	} else {
		alert("Por favor, selecione um herói e um vilão.");
	}
}

async function rolarDados() {
	const dadoHeroi = await rolarDadoIndividual('dadoHeroi');
	const dadoVilao = await rolarDadoIndividual('dadoVilao');

	return { dadoHeroi, dadoVilao };
}

async function rolarDadoIndividual(dadoId) {
	return new Promise(resolve => {
		const dado = document.getElementById(dadoId);
		dado.classList.add('spinning');

		const interval = setInterval(() => {
			const randomNumber = Math.floor(Math.random() * 6) + 1;
			dado.innerHTML = randomNumber;
		}, 100);

		setTimeout(() => {
			clearInterval(interval);
			const finalNumber = Math.floor(Math.random() * 6) + 1;
			dado.innerHTML = finalNumber;
			dado.classList.remove('spinning');
			resolve(finalNumber);
		}, 1000);
	});
}

var contadorRodadas = 0;
var vencedor = "";

function reiniciarContadorRodadas() {
	contadorRodadas = 0;
}

async function execucaoBatalha() {
	var heroiVida = parseInt(document.getElementById('heroiVida').textContent);
	var vilaoVida = parseInt(document.getElementById('vilaoVida').textContent);
	document.getElementById("btnRolarDados").disabled = true;

	contadorRodadas++;
	historicoDeBatalha("INÍCIO DA RODADA: " + contadorRodadas);

	if (heroiVida !== 0 && vilaoVida !== 0) {
		var resultHeroi = await ataqueHeroi();

		if (resultHeroi === 1) {
			document.getElementById("btnMagiaHeroi").disabled = true;
			document.getElementById("btnPocaoHeroi").disabled = true;
			document.getElementById("btnMagiaVilao").disabled = true;
			document.getElementById("btnPocaoVilao").disabled = true;
			historicoDeBatalha("FIM DA RODADA: " + contadorRodadas + " VITÓRIA DO HÉROI!");
			historicoDeBatalha("FIM DA BATALHA!");
			var botãoFinalizar = '<button type="button" class="btn btn-dark" onclick="finalizarBatalha(\'HÉROI\')" id="btnFinalizarBatalha">FINALIZAR BATALHA</button>';
			historicoDeBatalha(botãoFinalizar);
			reiniciarContadorRodadas();
			return;
		}

		setTimeout(async function() {
			var resultVilao = await ataqueVilao();

			if (resultVilao === 1) {
				document.getElementById("btnMagiaHeroi").disabled = true;
				document.getElementById("btnPocaoHeroi").disabled = true;
				document.getElementById("btnMagiaVilao").disabled = true;
				document.getElementById("btnPocaoVilao").disabled = true;
				historicoDeBatalha("FIM DA RODADA: " + contadorRodadas + " VITÓRIA DO VILÃO!");
				historicoDeBatalha("FIM DA BATALHA!");
				var botãoFinalizar = '<button type="button" class="btn btn-dark" onclick="finalizarBatalha(\'VILÃO\')" id="btnFinalizarBatalha">FINALIZAR BATALHA</button>';
				historicoDeBatalha(botãoFinalizar);
				reiniciarContadorRodadas();
				return;
			}

		}, 2000);
	} else {
		document.getElementById("btnRolarDados").disabled = true;
	}
}

function finalizarBatalha(resultado) {
	vencedor = resultado;

	var resultadoBatalha = document.getElementById('resultadoBatalha');
	resultadoBatalha.innerHTML = "<strong><u>VITÓRIA DO " + resultado + " !!!</u></strong>";

    if (vencedor === "HÉROI") {
        resultadoBatalha.innerHTML += `
            <div class="resultado-item">
                <img src="/Blacklist/icons/levelHeroi.svg" class="resultado-icone"><span><strong>+1</strong> LEVEL!</span>
            </div>
            <div class="resultado-item">
                <img src="/Blacklist/icons/pontosHeroi.svg" class="resultado-icone"><span><strong>+5</strong> PONTOS!</span>
            </div>
            <div class="resultado-item">
                <img src="/Blacklist/icons/pocaoHeroi.svg" class="resultado-icone"><span><strong>+2</strong> PORÇÕES!</span>
            </div>
            <div class="resultado-item">
                <img src="/Blacklist/icons/magiaHeroi.svg" class="resultado-icone"><span><strong>+1</strong> MAGIA!</span>
            </div>
        `;
    }

	abrirModalFinalizarBatalha();
}

function resultadoFinal() {
	fecharModalFinalizarBatalha();
	var idHeroiBatalha = parseInt(document.getElementById('idHeroiBatalha').textContent);
	var nomeHeroiBatalha = document.getElementById('heroiNome').textContent;
	var qtdLevelHeroi = parseInt(document.getElementById('heroiLevel').textContent);
	var qtdMagiaHeroi = parseInt(document.getElementById('heroiMagia').textContent);
	var qtdPocaoHeroi = parseInt(document.getElementById('heroiPocao').textContent);
	var idVilaoBatalha = parseInt(document.getElementById('idVilaoBatalha').textContent);

	if (vencedor === "HÉROI") {
		document.getElementById('tabelaBatalha').style.display = 'none';
		document.getElementById('loading-container').style.display = 'flex';

		let progressBarInner = document.getElementById('progress-bar-inner');
		let progressText = document.getElementById('progress-info');
		let width = 0;
		let interval = setInterval(function() {
			if (width >= 100) {
				clearInterval(interval);
				var url = "/Blacklist/finalizarBatalha?idHeroiBatalha=" + idHeroiBatalha + "&qtdLevelHeroi=" + qtdLevelHeroi + "&qtdMagiaHeroi=" + qtdMagiaHeroi + "&qtdPocaoHeroi=" + qtdPocaoHeroi + "&idVilaoBatalha=" + idVilaoBatalha;
				url = encodeURI(url);
				window.location.href = url;
			} else {
				width++;
				progressBarInner.style.width = width + '%';
				progressText.innerText = width + '%';
			}
		}, 30);
	} else if (vencedor === "VILÃO") {
		document.getElementById("tabelaBatalha").style.display = "none";
		document.getElementById("loading").style.display = "block";

		setTimeout(function() {
			window.location.href = "/Blacklist/continueJornada?idHeroiBatalha=" + idHeroiBatalha + "&nomeHeroiBatalha=" + nomeHeroiBatalha;
		}, 1500);
	}
}

async function ataqueHeroi() {
	var heroiAtaque = parseInt(document.getElementById('heroiAtaque').textContent);

	var vilaoVida = parseInt(document.getElementById('vilaoVida').textContent);
	var vilaoDefesa = parseInt(document.getElementById('vilaoDefesa').textContent);

	const dadosAtaqueHeroi = await rolarDados();

	somaAtaqueDoHeroi = heroiAtaque + dadosAtaqueHeroi.dadoHeroi;
	somaDefesaDoVilao = vilaoDefesa + dadosAtaqueHeroi.dadoVilao;

	if (somaAtaqueDoHeroi > somaDefesaDoVilao) {
		var resultadoAtaqueHeroi = somaAtaqueDoHeroi - somaDefesaDoVilao;
		barraVidaMovimentoVilao(resultadoAtaqueHeroi);
		vilaoVida -= resultadoAtaqueHeroi;
		var textoHistorico = "ATAQUE DO HEROI: " + somaAtaqueDoHeroi + ", DEFESA DO VILÃO: " + somaDefesaDoVilao + ", DANO CAUSADO: " + resultadoAtaqueHeroi;
		historicoDeBatalha(textoHistorico);
	} else if (somaAtaqueDoHeroi <= somaDefesaDoVilao) {
		var resultadoDefesaVilao = somaDefesaDoVilao - somaAtaqueDoHeroi;
		var textoHistorico = "ATAQUE DO HEROI: " + somaAtaqueDoHeroi + ", DEFESA DO VILÃO: " + somaDefesaDoVilao + ", DEFESA SUPERIOR EM: " + resultadoDefesaVilao;
		historicoDeBatalha(textoHistorico);
	}

	if (vilaoVida <= 0) {
		return 1;
	}

	return 0;
}

async function ataqueVilao() {
	var heroiVida = parseInt(document.getElementById('heroiVida').textContent);
	var heroiDefesa = parseInt(document.getElementById('heroiDefesa').textContent);

	var vilaoVida = parseInt(document.getElementById('vilaoVida').textContent);
	var vilaoAtaque = parseInt(document.getElementById('vilaoAtaque').textContent);

	var qtdVilaoPocao = parseInt(document.getElementById("vilaoPocao").innerText);
	var qtdVilaoMagia = parseInt(document.getElementById("vilaoMagia").innerText);

	const dadosAtaqueVilao = await rolarDados();

	somaDefesaDoHeroi = heroiDefesa + dadosAtaqueVilao.dadoHeroi;
	somaAtaqueDoVilao = vilaoAtaque + dadosAtaqueVilao.dadoVilao

	if (somaAtaqueDoVilao > somaDefesaDoHeroi) {
		var resultadoAtaqueVilao = somaAtaqueDoVilao - somaDefesaDoHeroi;
		barraVidaMovimentoHeroi(resultadoAtaqueVilao);
		heroiVida -= resultadoAtaqueVilao;
		var textoHistorico = "ATAQUE DO VILÃO: " + somaAtaqueDoVilao + ", DEFESA DO HÉROI: " + somaDefesaDoHeroi + ", DANO CAUSADO: " + resultadoAtaqueVilao;
		historicoDeBatalha(textoHistorico);
	} else if (somaAtaqueDoVilao <= somaDefesaDoHeroi) {
		var resultadoDefesaHeroi = somaDefesaDoHeroi - somaAtaqueDoVilao;
		var textoHistorico = "ATAQUE DO VILÃO: " + somaAtaqueDoVilao + ", DEFESA DO HÉROI: " + somaDefesaDoHeroi + ", DEFESA SUPERIOR EM: " + resultadoDefesaHeroi;
		historicoDeBatalha(textoHistorico);
	}

	if (heroiVida <= 0) {
		return 1;
	}

	setTimeout(function() {
		if (vilaoVida <= 5 && vilaoVida > 0 && qtdVilaoPocao > 0) {
			usarPocaoVilao();
		}

		if (vilaoVida <= 5 && vilaoVida > 0 && qtdVilaoMagia > 0) {
			usarMagiaVilao();
		}
	}, 2000);

	setTimeout(function() {
		historicoDeBatalha("FIM DA RODADA: " + contadorRodadas);
		document.getElementById("btnRolarDados").disabled = false;
	}, 2000);

	return 0;
}

function historicoDeBatalha(textoHistorico) {
	var historicoAtual = document.getElementById('historicoLista');
	var textoAtual = historicoAtual.innerHTML;
	var novoTexto = textoHistorico;

	historicoAtual.innerHTML = textoAtual + '<br>' + novoTexto;
}

function usarMagiaHeroi() {
	var magiaElement = document.getElementById("heroiMagia");
	var ataqueElement = document.getElementById("heroiAtaque");

	var magiaValue = parseInt(magiaElement.innerText);
	var ataqueValue = parseInt(ataqueElement.innerText);

	if (magiaValue > 0) {
		magiaElement.innerText = magiaValue - 1;
		ataqueElement.innerText = ataqueValue + 3;
		var textoHistorico = "O HERÓI UTILIZOU MAGIA! ADICIONADO +3 AO SEU ATAQUE";
		historicoDeBatalha(textoHistorico);
	} else {
		alert("Sem munição!");
	}
}

function usarMagiaVilao() {
	var magiaElement = document.getElementById("vilaoMagia");
	var ataqueElement = document.getElementById("vilaoAtaque");

	var magiaValue = parseInt(magiaElement.innerText);
	var ataqueValue = parseInt(ataqueElement.innerText);

	if (magiaValue > 0) {
		magiaElement.innerText = magiaValue - 1;
		ataqueElement.innerText = ataqueValue + 3;
		var textoHistorico = "O VILÃO UTILIZOU MAGIA! ADICIONADO +3 AO SEU ATAQUE";
		historicoDeBatalha(textoHistorico);
	}
}

function usarPocaoHeroi() {
	var pocaoElement = document.getElementById("heroiPocao");
	var vidaElement = document.getElementById("heroiVida");
	var vidaTotalElement = document.getElementById("heroiVidaTotal");
	var barraVidaHeroi = document.getElementById("barraVidaHeroi");

	var pocaoValue = parseInt(pocaoElement.innerText);
	var vidaValue = parseInt(vidaElement.innerText);
	var vidaTotalValue = parseInt(vidaTotalElement.innerText);

	if (pocaoValue > 0) {
		var quantidadeRestaurar = Math.min(10, vidaTotalValue - vidaValue);

		if (vidaValue === vidaTotalValue) {
			alert("A vida do herói já está completa. Não é possível utilizar mais poção.");
			return;
		}

		pocaoElement.innerText = pocaoValue - 1;

		vidaElement.innerText = vidaValue + quantidadeRestaurar;
		var alturaTotal = barraVidaHeroi.parentElement.clientHeight;
		var alturaNova = (vidaValue + quantidadeRestaurar) / vidaTotalValue * alturaTotal;
		barraVidaHeroi.style.height = `${alturaNova}px`;

		var textoHistorico = "O HERÓI UTILIZOU POÇÃO! ADICIONADO +" + quantidadeRestaurar + " À SUA VIDA";
		historicoDeBatalha(textoHistorico);
	} else {
		alert("Sem poção!");
	}
}

function usarPocaoVilao() {
	var pocaoElement = document.getElementById("vilaoPocao");
	var vidaElement = document.getElementById("vilaoVida");
	var vidaTotalElement = document.getElementById("vilaoVidaTotal");
	var barraVidaVilao = document.getElementById("barraVidaVilao");

	var pocaoValue = parseInt(pocaoElement.innerText);
	var vidaValue = parseInt(vidaElement.innerText);
	var vidaTotalValue = parseInt(vidaTotalElement.innerText);

	if (pocaoValue > 0) {
		var quantidadeRestaurar = Math.min(10, vidaTotalValue - vidaValue);

		pocaoElement.innerText = pocaoValue - 1;

		vidaElement.innerText = vidaValue + quantidadeRestaurar;
		var alturaTotal = barraVidaVilao.parentElement.clientHeight;
		var alturaNova = (vidaValue + quantidadeRestaurar) / vidaTotalValue * alturaTotal;
		barraVidaVilao.style.height = `${alturaNova}px`;

		var textoHistorico = "O VILÃO UTILIZOU POÇÃO! ADICIONADO +" + quantidadeRestaurar + " À SUA VIDA";
		historicoDeBatalha(textoHistorico);
	}
}

function barraVidaMovimentoHeroi(resultadoAtaqueVilao) {
	const valorVida = document.getElementById('heroiVida');
	const barraVidaHeroi = document.getElementById('barraVidaHeroi');

	let valorVidaHeroi = parseInt(valorVida.innerText);

	if (valorVidaHeroi > 0) {
		const proporcao = resultadoAtaqueVilao / valorVidaHeroi;
		const alturaAtual = barraVidaHeroi.clientHeight;
		const alturaDiminuida = alturaAtual * proporcao;
		barraVidaHeroi.style.height = `${alturaAtual - alturaDiminuida}px`;
		valorVidaHeroi -= resultadoAtaqueVilao;
		valorVida.innerText = valorVidaHeroi;
		verificarVidaZero(valorVida, barraVidaHeroi);
	}
}

function barraVidaMovimentoVilao(resultadoAtaqueHeroi) {
	const valorVida = document.getElementById('vilaoVida');
	const barraVidaVilao = document.getElementById('barraVidaVilao');

	let valorVidaVilao = parseInt(valorVida.innerText);

	if (valorVidaVilao > 0) {
		const proporcao = resultadoAtaqueHeroi / valorVidaVilao;
		const alturaAtual = barraVidaVilao.clientHeight;
		const alturaDiminuida = alturaAtual * proporcao;
		barraVidaVilao.style.height = `${alturaAtual - alturaDiminuida}px`;
		valorVidaVilao -= resultadoAtaqueHeroi;
		valorVida.innerText = valorVidaVilao;
		verificarVidaZero(valorVida, barraVidaVilao);
	}
}

function verificarVidaZero(vidaElement, barraElement) {
	let valorVida = parseInt(vidaElement.innerText);

	if (valorVida <= 0) {
		barraElement.style.height = '0';
		barraElement.style.display = 'none';
	}
}

function abrirModalDistribuirHeroi() {
	$("#modalDistribuirHeroi").modal('show');
}

function fecharModalDistribuirHeroi() {
	$("#modalDistribuirHeroi").modal('hide');
}

function abrirModalDeletarHeroi() {
	$("#modalDeletarHeroi").modal('show');
}

function fecharModalDeletarHeroi() {
	$("#modalDeletarHeroi").modal('hide');
}

function abrirModalInfoHeroi() {
	$("#modalInfoHeroi").modal('show');
}

function fecharModalInfoHeroi() {
	$("#modalInfoHeroi").modal('hide');
}

function abrirModalInfoVilao() {
	$("#modalInfoVilao").modal('show');
}

function fecharModalInfoVilao() {
	$("#modalInfoVilao").modal('hide');
}

function abrirModalFinalizarBatalha() {
	$("#modalFinalizarBatalha").modal('show');
}

function fecharModalFinalizarBatalha() {
	$("#modalFinalizarBatalha").modal('hide');
}
