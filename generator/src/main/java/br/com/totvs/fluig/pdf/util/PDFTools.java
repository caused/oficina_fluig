package br.com.totvs.fluig.pdf.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map.Entry;
import java.util.Set;
import java.util.SortedMap;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;



public class PDFTools {

	public static void createPDF(ByteArrayOutputStream output, SortedMap<String, String> atributos){
		try(PDDocument doc = new PDDocument()){
			

			PDFont fonteNome = PDType1Font.HELVETICA_BOLD;
			PDFont fonteValor = PDType1Font.HELVETICA;
			
			PDPageContentStream contents = generatePage(doc);
			int quebraLinha = 0;
			
			criarCabecalho(doc, fonteNome, contents);
			
			Set<Entry<String, String>> entradas = atributos.entrySet();
			for(Entry<String, String> entrada : entradas ){
				contents.beginText();				
				contents.setFont(fonteNome, 12);
				contents.newLineAtOffset(5, 740-quebraLinha);
				contents.showText(entrada.getKey());
				contents.endText();
				
				contents.beginText();				
				contents.setFont(fonteValor, 12);
				contents.newLineAtOffset(5, 726-quebraLinha);
				contents.showText(entrada.getValue());
				contents.endText();
				quebraLinha +=40;
				
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
}
