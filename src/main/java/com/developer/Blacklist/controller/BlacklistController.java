package com.developer.Blacklist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.developer.Blacklist.entity.HeroiEntity;
import com.developer.Blacklist.entity.VilaoEntity;
import com.developer.Blacklist.service.HeroiService;
import com.developer.Blacklist.service.VilaoService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class BlacklistController {

	@Autowired
	private HeroiService heroiService;

	@Autowired
	private VilaoService vilaoService;

	@RequestMapping("/home")
	public String home() {
		return "home";
	}

	@RequestMapping("/criarHeroi")
	public String criarHeroi() {
		return "criarHeroi";
	}

	@PostMapping
	@RequestMapping("/processarNome")
	public String processaNome(@RequestParam String nome) {
		heroiService.salvarHeroi(nome.toUpperCase());
		return "redirect:/listarViloes";
	}

	@GetMapping
	@RequestMapping("/listarViloes")
	public String listarViloes(Model model) {
		List<HeroiEntity> herois = heroiService.getListaHeroi();
		List<VilaoEntity> viloes = vilaoService.getListaVilao();
		model.addAttribute("herois", herois);
		model.addAttribute("viloes", viloes);
		return "listarViloes";
	}

	@GetMapping
	@RequestMapping("/listarViloes/distribuirHeroi")
	public String distribuirHeroi(@RequestParam String id, HttpServletRequest request) {
		HeroiEntity distribuirHeroi = heroiService.getInfoHeroi(id);
		request.getServletContext().setAttribute("distribuirHeroi", distribuirHeroi);
		return "fragsListarViloes :: divDistribuirHeroi";
	}

	@PutMapping
	@RequestMapping("/listarViloes/distribuir")
	public String distribuir(@RequestParam(value = "idPontos") String idPontos,
			@RequestParam(value = "adcPontos") String adcPontos, @RequestParam(value = "adcVida") String adcVida,
			@RequestParam(value = "adcAtaque") String adcAtaque, @RequestParam(value = "adcDefesa") String adcDefesa) {
		heroiService.distribuirPontos(idPontos, adcPontos, adcVida, adcAtaque, adcDefesa);
		return "redirect:/listarViloes";
	}

	@GetMapping
	@RequestMapping("/listarViloes/infoHeroi")
	public String infoHeroi(@RequestParam String id, HttpServletRequest request) {
		HeroiEntity inforHeroi = heroiService.getInfoHeroi(id);
		request.getServletContext().setAttribute("inforHeroi", inforHeroi);
		return "fragsListarViloes :: divInfoHeroi";
	}

	@GetMapping
	@RequestMapping("/listarViloes/infoVilao")
	public String infoVilao(@RequestParam String id, HttpServletRequest request) {
		VilaoEntity inforVilao = vilaoService.getInfoVilao(id);
		request.getServletContext().setAttribute("inforVilao", inforVilao);
		return "fragsListarViloes :: divInfoVilao";
	}

	@GetMapping
	@RequestMapping("/listarViloes/deletarHeroi")
	public String deletarHeroi(@RequestParam String id, @RequestParam String nome, HttpServletRequest request) {
		request.setAttribute("deletarNome", nome);
		request.setAttribute("deletarId", id);
		return "fragsListarViloes :: divDeletarHeroi";
	}

	@DeleteMapping
	@RequestMapping("/listarViloes/deletar")
	public String deletar(@RequestParam String id, @RequestParam String nome, HttpServletRequest request) {
		heroiService.deletarHeroi(id);
		return "redirect:/criarHeroi";
	}

	@PostMapping
	@RequestMapping("/batalha")
	public String batalha(@RequestParam String idHeroi, @RequestParam String idVilao, Model model) {
		HeroiEntity batalhaHeroi = heroiService.getInfoHeroi(idHeroi);
		VilaoEntity batalhaVilao = vilaoService.getInfoVilao(idVilao);
		model.addAttribute("batalhaHeroi", batalhaHeroi);
		model.addAttribute("batalhaVilao", batalhaVilao);
		return "batalha";
	}

	@PutMapping
	@RequestMapping("/finalizarBatalha")
	public String finalizarBatalha(@RequestParam String idHeroiBatalha, @RequestParam String qtdLevelHeroi, @RequestParam String qtdMagiaHeroi,
			@RequestParam String qtdPocaoHeroi, @RequestParam String idVilaoBatalha) {
		heroiService.atualizarHeroiBatalha(idHeroiBatalha, qtdLevelHeroi, qtdMagiaHeroi, qtdPocaoHeroi);
		vilaoService.atualizarVilaoBatalha(idVilaoBatalha);
		return "redirect:/listarViloes";
	}

	@RequestMapping("/continueJornada")
	public String continueJornada(@RequestParam String idHeroiBatalha, @RequestParam String nomeHeroiBatalha,
			HttpServletRequest request) {
		System.out.println(idHeroiBatalha + "  " + nomeHeroiBatalha);
		request.setAttribute("idHeroiBatalha", idHeroiBatalha);
		request.setAttribute("nomeHeroiBatalha", nomeHeroiBatalha);
		return "continueJornada";
	}

	@RequestMapping("/finalJornada")
	public String finalJornada() {
		return "finalJornada";
	}

}
