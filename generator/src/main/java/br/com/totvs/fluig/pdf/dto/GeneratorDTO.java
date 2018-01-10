package br.com.totvs.fluig.pdf.dto;

import java.util.LinkedHashMap;

public class GeneratorDTO {
	
	private LinkedHashMap<String, String> atributos = new LinkedHashMap<String, String>();
	
	public GeneratorDTO(){
	}

	public LinkedHashMap<String, String> getAtributos() {
		return atributos;
	}

	public void setAtributos(LinkedHashMap<String, String> atributos) {
		this.atributos = atributos;
	}
	

}
