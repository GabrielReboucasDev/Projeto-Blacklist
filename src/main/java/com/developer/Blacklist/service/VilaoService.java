package com.developer.Blacklist.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.developer.Blacklist.entity.VilaoEntity;
import com.developer.Blacklist.repository.VilaoRepository;

@Service
public class VilaoService {

	@Autowired
	public VilaoRepository vilaoRepository;

	public List<VilaoEntity> getListaVilao() {
		List<VilaoEntity> listaVilao = vilaoRepository.getListaVilao();
		return listaVilao;
	}

	public VilaoEntity getInfoVilao(String idVilao) {
		Integer id = Integer.parseInt(idVilao);
		VilaoEntity vilao = vilaoRepository.getInfoVilao(id);
		return vilao;
	}

	public void atualizarVilaoBatalha(String idVilaoBatalha) {
		Integer idVilao = Integer.parseInt(idVilaoBatalha);
		vilaoRepository.atualizarVilaoBatalha(idVilao);
	}

}
