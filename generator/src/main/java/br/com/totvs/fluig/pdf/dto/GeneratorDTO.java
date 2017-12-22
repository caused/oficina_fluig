package br.com.totvs.fluig.pdf.dto;

import java.util.SortedMap;
import java.util.TreeMap;

public class GeneratorDTO {
	
	private SortedMap<String, String> atributos = new TreeMap<String, String>();
	
	public GeneratorDTO(){
	}

	public SortedMap<String, String> getAtributos() {
		return atributos;
	}

	public void setAtributos(SortedMap<String, String> atributos) {
		this.atributos = atributos;
	}
	

}
