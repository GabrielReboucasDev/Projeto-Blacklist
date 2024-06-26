package com.developer.Blacklist.entity;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name = "vilao")
@Table(name = "vilao")
public class VilaoEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	@Column(name = "nome")
	private String nome;
	@Column(name = "level")
	private Integer level;
	@Column(name = "vida")
	private Integer vida;
	@Column(name = "ataque")
	private Integer ataque;
	@Column(name = "defesa")
	private Integer defesa;
	@Column(name = "historia")
	private String historia;
	@Column(name = "pocao")
	private Integer pocao;
	@Column(name = "magia")
	private Integer magia;
	@Column(name = "imagem")
	private String imagem;
	@Column(name = "logo")
	private String logo;
	@Column(name = "imgbatalha")
	private String imgbatalha;
	@Column(name = "posicao")
	private String posicao;
	@Column(name = "status")
	private String status;

	public VilaoEntity() {
	}

	public VilaoEntity(Integer id, String nome, Integer level, Integer vida, Integer ataque, Integer defesa,
			String historia, Integer pocao, Integer magia, String imagem, String logo, String imgbatalha,
			String posicao, String status) {
		this.id = id;
		this.nome = nome;
		this.level = level;
		this.vida = vida;
		this.ataque = ataque;
		this.defesa = defesa;
		this.historia = historia;
		this.pocao = pocao;
		this.magia = magia;
		this.imagem = imagem;
		this.logo = logo;
		this.imgbatalha = imgbatalha;
		this.posicao = posicao;
		this.status = status;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public Integer getVida() {
		return vida;
	}

	public void setVida(Integer vida) {
		this.vida = vida;
	}

	public Integer getAtaque() {
		return ataque;
	}

	public void setAtaque(Integer ataque) {
		this.ataque = ataque;
	}

	public Integer getDefesa() {
		return defesa;
	}

	public void setDefesa(Integer defesa) {
		this.defesa = defesa;
	}

	public String getHistoria() {
		return historia;
	}

	public void setHistoria(String historia) {
		this.historia = historia;
	}

	public Integer getPocao() {
		return pocao;
	}

	public void setPocao(Integer pocao) {
		this.pocao = pocao;
	}

	public Integer getMagia() {
		return magia;
	}

	public void setMagia(Integer magia) {
		this.magia = magia;
	}

	public String getImagem() {
		return imagem;
	}

	public void setImagem(String imagem) {
		this.imagem = imagem;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getImgbatalha() {
		return imgbatalha;
	}

	public void setImgbatalha(String imgbatalha) {
		this.imgbatalha = imgbatalha;
	}

	public String getPosicao() {
		return posicao;
	}

	public void setPosicao(String posicao) {
		this.posicao = posicao;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		VilaoEntity other = (VilaoEntity) obj;
		return Objects.equals(id, other.id);
	}

}
