package com.developer.Blacklist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.developer.Blacklist.entity.VilaoEntity;

import jakarta.transaction.Transactional;

@Repository
public interface VilaoRepository extends JpaRepository<VilaoEntity, Integer> {

	@Query(value = "SELECT a.id, a.nome, a.level, a.vida, a.ataque, a.defesa, a.historia, a.pocao, a.magia, a.imagem, a.logo, a.imgbatalha, a.posicao, a.status FROM VILAO a WHERE a.status = 'VIVO' ORDER BY a.id DESC", nativeQuery = true)
	List<VilaoEntity> getListaVilao();

	@Query(value = "SELECT id, nome, level, vida, ataque, defesa, historia, pocao, magia, imagem, logo, imgbatalha, posicao, status FROM VILAO WHERE id = :id", nativeQuery = true)
	VilaoEntity getInfoVilao(@Param("id") Integer id);

	@Transactional
	@Modifying
	@Query(value = "UPDATE VILAO SET status = 'MORTO' WHERE id = :idVilao", nativeQuery = true)
	void atualizarVilaoBatalha(@Param("idVilao") Integer idVilao);

}
