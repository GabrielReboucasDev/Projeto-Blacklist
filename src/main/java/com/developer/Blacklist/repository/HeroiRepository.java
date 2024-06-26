package com.developer.Blacklist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.developer.Blacklist.entity.HeroiEntity;

import jakarta.transaction.Transactional;

@Repository
public interface HeroiRepository extends JpaRepository<HeroiEntity, Integer> {

	@Query(value = "SELECT a.id, a.nome, a.level, a.vida, a.ataque, a.defesa, a.historia, a.pocao, a.magia, a.imagem, a.logo, a.imgbatalha, a.pontos, a.status FROM HEROI a WHERE a.status = 'VIVO'", nativeQuery = true)
	List<HeroiEntity> getListaHeroi();

	@Query(value = "SELECT id, nome, level, vida, ataque, defesa, historia, pocao, magia, imagem, logo, imgbatalha, pontos, status FROM HEROI WHERE id = :idHeroi", nativeQuery = true)
	HeroiEntity getInfoHeroi(@Param("idHeroi") Integer idHeroi);

	@Transactional
	@Modifying
	@Query(value = "DELETE FROM HEROI WHERE id = :idHeroi", nativeQuery = true)
	void deletarHeroi(@Param("idHeroi") Integer idHeroi);

	@Transactional
	@Modifying
	@Query(value = "UPDATE HEROI SET pontos = :adcPontosHeroi, vida = :adcVidaHeroi, ataque = :adcAtaqueHeroi, defesa = :adcDefesaHeroi WHERE id = :idPontosHeroi", nativeQuery = true)
	void distribuirPontos(@Param("idPontosHeroi") Integer idPontosHeroi,
			@Param("adcPontosHeroi") Integer adcPontosHeroi, @Param("adcVidaHeroi") Integer adcVidaHeroi,
			@Param("adcAtaqueHeroi") Integer adcAtaqueHeroi, @Param("adcDefesaHeroi") Integer adcDefesaHeroi);

	@Transactional
	@Modifying
	@Query(value = "UPDATE HEROI SET level = :levelHeroi, pontos = :pontosHeroi, magia = :magiaHeroi, pocao = :pocaoHeroi WHERE id = :idHeroi", nativeQuery = true)
	void atualizarHeroiBatalha(@Param("idHeroi") Integer idHeroi, @Param("pontosHeroi") Integer pontosHeroi,
			@Param("levelHeroi") Integer levelHeroi, @Param("magiaHeroi") Integer magiaHeroi,
			@Param("pocaoHeroi") Integer pocaoHeroi);

	@Query(value = "SELECT pontos FROM HEROI WHERE id = :idHeroi", nativeQuery = true)
	Integer buscarPontosHeroi(@Param("idHeroi") Integer idHeroi);

}
