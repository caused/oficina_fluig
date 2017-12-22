package br.com.totvs.fluig.pdf.resources;

import java.io.ByteArrayOutputStream;
import java.io.File;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.google.gson.Gson;

import br.com.totvs.fluig.pdf.dto.GeneratorDTO;
import br.com.totvs.fluig.pdf.util.PDFTools;

@Path("/pdf")
public class PDFResource {

	/**
	 * @return
	 */
	@Path("/generate")
	@POST
	@Consumes("application/json")
	@Produces("application/json")
	public Response generate(String json){
		json = json.replaceAll("\\\\", "");
		json = json.replaceAll("\"\"", "");
		ByteArrayOutputStream output = new ByteArrayOutputStream();
		try{
			GeneratorDTO gerador = new Gson().fromJson(json, GeneratorDTO.class);
			PDFTools.createPDF(output, gerador.getAtributos());
			
		}catch(Throwable t){
			t.printStackTrace();
		}

		ResponseBuilder response = Response.ok(new Gson().toJson(output));
		return response.build();
	}
	
	@Path("/test")
	@GET
	@Produces("application/json")
	public String test(){
		return "Hello World";
	}
}
