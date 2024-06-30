package com.developer.Blacklist.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.developer.Blacklist.entity.HeroiEntity;
import com.developer.Blacklist.repository.HeroiRepository;

@Service
public class HeroiService {

	@Autowired
	private HeroiRepository heroiRepository;

	public HeroiEntity salvarHeroi(String nome) {
		HeroiEntity heroi = new HeroiEntity();
		heroi.setNome(nome);
		heroi.setLevel(1);
		heroi.setVida(20);
		heroi.setAtaque(5);
		heroi.setDefesa(5);
		heroi.setHistoria("HISTÓRIA");
		heroi.setPocao(5);
		heroi.setMagia(5);
		heroi.setImagem("/Blacklist/img/heroiCompletoIniciante.png");
		heroi.setLogo("/Blacklist/img/logoHeroiIniciante.png");
		heroi.setImgbatalha("/Blacklist/img/heroiBatalhaIniciante.png");
		heroi.setPontos(0);
		heroi.setStatus("VIVO");
		return heroiRepository.save(heroi);
	}

	public List<HeroiEntity> getListaHeroi() {
		List<HeroiEntity> listaHeroi = heroiRepository.getListaHeroi();
		return listaHeroi;
	}

	public HeroiEntity getInfoHeroi(String id) {
		Integer idHeroi = Integer.parseInt(id);
		HeroiEntity heroi = heroiRepository.getInfoHeroi(idHeroi);
		return heroi;
	}

	public void deletarHeroi(String id) {
		Integer idHeroi = Integer.parseInt(id);
		heroiRepository.deletarHeroi(idHeroi);
	}

	public void distribuirPontos(String idPontos, String adcPontos, String adcVida, String adcAtaque, String adcDefesa) {
		Integer idPontosHeroi = Integer.parseInt(idPontos);
		Integer adcPontosHeroi = Integer.parseInt(adcPontos);
		Integer adcVidaHeroi = Integer.parseInt(adcVida);
		Integer adcAtaqueHeroi = Integer.parseInt(adcAtaque);
		Integer adcDefesaHeroi = Integer.parseInt(adcDefesa);
		heroiRepository.distribuirPontos(idPontosHeroi, adcPontosHeroi, adcVidaHeroi, adcAtaqueHeroi, adcDefesaHeroi);
	}

	public void atualizarHeroiBatalha(String idHeroiBatalha, String qtdLevelHeroi, String qtdMagiaHeroi, String qtdPocaoHeroi) {
		Integer idHeroi = Integer.parseInt(idHeroiBatalha);
		Integer pontosHeroi = heroiRepository.buscarPontosHeroi(idHeroi) + 5;
		Integer levelHeroi = Integer.parseInt(qtdLevelHeroi) + 1;
		Integer magiaHeroi = Integer.parseInt(qtdMagiaHeroi) + 1;
		Integer pocaoHeroi = Integer.parseInt(qtdPocaoHeroi) + 2;
		heroiRepository.atualizarHeroiBatalha(idHeroi, pontosHeroi, levelHeroi, magiaHeroi, pocaoHeroi);
	}

}
