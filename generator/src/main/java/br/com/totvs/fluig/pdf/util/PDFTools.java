package br.com.totvs.fluig.pdf.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map.Entry;
import java.util.stream.Collectors;
import java.util.Set;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;



public class PDFTools {

	public static void createPDF(ByteArrayOutputStream output, LinkedHashMap<String, String> atributos){
		try(PDDocument doc = new PDDocument()){
			

			PDFont fonteNome = PDType1Font.HELVETICA_BOLD;
			PDFont fonteValor = PDType1Font.HELVETICA;
			
			PDPageContentStream contents = generatePage(doc);
			Integer quebraLinha = new Integer(0);
			
			criarCabecalho(doc, fonteNome, contents);
			
			Set<Entry<String, String>> entradas = atributos.entrySet();
			for(Entry<String, String> entrada : entradas ){
				if(entrada.getKey().contains("titulo")){
					quebraLinha = write(contents, fonteNome, 18, quebraLinha, 730, 20, entrada.getValue());
				}else{
					if(entrada.getValue().contains(";")){
						quebraLinha = write(contents, fonteNome, 12, quebraLinha, 730, 0, entrada.getKey());
						String[] valores = entrada.getValue().split(";");
						List<String> linhas= filterArray(valores);
						
						for(String linha : linhas){
							quebraLinha = write(contents, fonteValor, 12, quebraLinha, 716, 15,linha);
						}
						quebraLinha+=30;
					}else{
						quebraLinha = write(contents, fonteNome, 12, quebraLinha, 730, 0, entrada.getKey());
						quebraLinha = write(contents, fonteValor, 12, quebraLinha, 716, 40, entrada.getValue());
					}
				}
				
				if(quebraLinha >= 700){
					contents.close();
					contents = generatePage(doc);
					criarCabecalho(doc, fonteNome, contents);
					quebraLinha = 0;
				}
			}

			contents.close();


			doc.save(output);
		}catch(Throwable t){
			t.printStackTrace();
		}

	}

	private static List<String> filterArray(String[] linhas) {
		List<String> list = Arrays.asList(linhas);
		
		list = list.stream().filter( linha -> linha != null && !linha.trim().isEmpty()).collect(Collectors.toList());
		List<String> listaComTracos = list.stream().filter(f -> f.trim().startsWith("-")).collect(Collectors.toList());
		List<String> listaSemTracos = list.stream().filter(f -> !f.trim().startsWith("-")).collect(Collectors.toList());
		
		listaSemTracos.addAll(listaComTracos.stream()
	    .map(f -> new String(f.trim().substring(1).trim()))
	    	    .collect(Collectors.toList()));
		
		return listaSemTracos;
	}

	private static PDPageContentStream generatePage(PDDocument doc) throws IOException {
		PDPage pagina = new PDPage(PDRectangle.A4);
		doc.addPage(pagina);
		PDPageContentStream contents = new PDPageContentStream(doc, pagina);
		return contents;
	}

	private static void criarCabecalho(PDDocument doc, PDFont nome, PDPageContentStream contents) throws IOException {
		ClassLoader classLoader = PDFTools.class.getClassLoader();
		
		PDImageXObject pdImageLogo = PDImageXObject.createFromFile(classLoader.getResource("images/fluig.png").getFile(), doc);
		PDImageXObject pdImageCabecalho = PDImageXObject.createFromFile(classLoader.getResource("images/cabecalho.png").getFile(), doc);
		contents.drawImage(pdImageLogo, 10, 770, pdImageLogo.getWidth() * 0.3f, pdImageLogo.getHeight() * 0.3f);
		contents.drawImage(pdImageCabecalho, 0, 830, pdImageCabecalho.getWidth() * 0.8f, pdImageCabecalho.getHeight() * 0.5f);
		
		criarTitulo(nome, contents);
	}

	private static void criarTitulo(PDFont nome, PDPageContentStream contents) throws IOException {
		
		contents.beginText();
		contents.setFont(nome, 23);
		contents.newLineAtOffset(99, 760);
		contents.showText("Relatório dos campos do formulário");
		contents.endText();
	}
	
	private static int write(PDPageContentStream contents, PDFont fonte,long fonteTamanho,  Integer quebraLinha,int pixelsOffset, int pixelsProximaLinha, String valor){
		try {
			contents.beginText();
			contents.setFont(fonte, fonteTamanho);
			contents.newLineAtOffset(5, pixelsOffset-quebraLinha);
			contents.showText(valor);
			contents.endText();
			quebraLinha +=pixelsProximaLinha;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}				
		return quebraLinha;
	}
}
