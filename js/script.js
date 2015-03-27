	var debug = "";
	var operacion = "";
	var cifras = []; //Guardará las cifras...
window.onload = function()
{
	var operaciones = [
						{
							"tipo" 		: "Suma", 
							"operador"	: "+"
						},
						{
							"tipo" 		: "Resta", 
							"operador"	: "-"
						},
						{
							"tipo" 		: "Multiplicación", 
							"operador"	: "*"
						},
						{
							"tipo" 		: "División", 
							"operador"	: "/"
						}];
	//Para capturar los números...
	for(var i = 0; i <= 9; i++)
	{
		nom_div("numero_" + i).addEventListener('click', function(event)
		{
			//console.log("Valor de I: " + i);
			var numero = event.target.id.split("_")[1];
			insertaNumeros(numero);
			window.onkeyup();

		});
		if(i >= 1 && i <= 4)
		{
			//Para los operadores...
			nom_div("operador_" + i).addEventListener('click', function(event)
			{
				//Saber si el final hay un operador...
				var ultimo = operacion.charAt(operacion.length - 1);
				if(!existeOperador(ultimo) && operacion !== "")
				{
					var operador = Number(event.target.id.split("_")[1]);
					var txtOperador = operaciones[operador - 1].operador;					
					operacion += txtOperador;
					nom_div("pantalla").innerHTML = operacion;
					//console.log(operaciones[operador - 1].tipo);
				}
			});
			//Para las demás acciones (limpiar, igual y punto)...
			if(i <= 3)
			{
				//console.log("acciones_" + i);
				nom_div("acciones_" + i).addEventListener('click', function(event)
				{
					var accion = Number(event.target.id.split("_")[1]);
					//console.log("Acción es: " + accion);
					var resultado = "";
					switch(accion)
					{
						case 1: operacion = ""; cifras = []; break;
						case 2: //Primero saber si ya existe un punto...
								//Traer la última cifra...
								var ultimaCifra = cifras[cifras.length - 1];
								//console.log(ultimaCifra);
								//Buscar si ya existe un punto...
								if(ultimaCifra.indexOf(".") < 0)
								{
									operacion += ".";
									cifras[cifras.length - 1] += ".";
								}
								resultado = operacion;
								break;
						case 3: 
								//Buscar al final si existe un operador
								if(operacion !== "")
								{
									var ultimo = operacion.charAt(operacion.length - 1);
									if(existeOperador(ultimo))
									{
										//Eliminar el último operador...
										operacion = operacion.substr(0, operacion.length - 1);
									}
									cifras = [];
									resultado = eval(operacion);
									operacion = cifras[0] = String(resultado);
								}
								break;
					}
					nom_div("pantalla").innerHTML = resultado;
				});
			}
		}
	}


	var insertaNumeros = function(numero)
	{
		operacion += numero;
		var cont = 0;
		cifras[cont] = "";
		for(var c = 0; c < operacion.length; c++)
		{
			if(!existeOperador(operacion.charAt(c)) || operacion.charAt(c) === ".")
			{
				cifras[cont] += operacion.charAt(c);
			}
			else
			{
				cont++;
				cifras[cont] = "";
			}
		}
		nom_div("pantalla").innerHTML = operacion;
	};

	//Para saber si existe un operador...
	var existeOperador = function(operador)
	{
		var existe = false; //Para saber si existe un operador al final...
		//Saber si es un operador...
		for(var c in operaciones)
		{
			if(operaciones[c].operador === operador)
			{
				existe = true;
				break;
			}
		}
		return existe;
	};
	
		
	window.onkeyup = function(e)
	{
		
		//var code = e.keyCode ? e.keyCode : e.which;
		var code;

		if(e.keyCode != null){
			code =  e.keyCode
		}else{
			code= e.which;
		}
		
		if(code >= 48 && code <= 57)
		{		
				
			insertaNumeros(String.fromCharCode(code));
		}
		switch(code){
			case 8:
								{
									var ultimo = operacion.charAt(operacion.length - 1);
									if(existeOperador(ultimo))
									{
										//Eliminar el último operador...
										operacion = operacion.substr(0, operacion.length - 1);
									}
									cifras = [];
									resultado = eval(operacion);
									operacion = cifras[0] = String(resultado);
								}
								nom_div("pantalla").innerHTML = resultado ;
			break;

			case 13:
				if(operacion !== "")
								{
									var ultimo = operacion.charAt(operacion.length - 1);
									if(existeOperador(ultimo))
									{
										//Eliminar el último operador...
										operacion = operacion.substr(0, operacion.length - 1);
									}
									cifras = [];
									resultado = eval(operacion);
									operacion = cifras[0] = String(resultado);
								}
								nom_div("pantalla").innerHTML = resultado ;

				break;
			

			case 27:
				
				operacion = ""; cifras = [];
					nom_div("pantalla").innerHTML = null ; //remplazar mas adelante con resultado de operacion
			break;
			case 190:
				var ultimaCifra = cifras[cifras.length - 1];
								//console.log(ultimaCifra);
								//Buscar si ya existe un punto...
				if(ultimaCifra.indexOf("¾") < 0)
					{
						operacion += ".";
						cifras[cifras.length - 1] += ".";
						resultado = operacion;
					}
					nom_div("pantalla").innerHTML = resultado;
			break;
			case 187:
				var ultimaCifra = cifras[cifras.length - 1];
								//console.log(ultimaCifra);
								//Buscar si ya existe un punto...
				if(ultimaCifra.indexOf("»") < 0)
					{
						operacion += "+";
						cifras[cifras.length - 1] += "+";
						resultado = operacion;
					}
					nom_div("pantalla").innerHTML = resultado;
			break;
			
			case 189:
				var ultimaCifra = cifras[cifras.length - 1];
								//console.log(ultimaCifra);
								//Buscar si ya existe un punto...
				if(ultimaCifra.indexOf("½") < 0)
					{
						operacion += "-";
						cifras[cifras.length - 1] += "-";
						resultado = operacion;
					}
					nom_div("pantalla").innerHTML = resultado;
			break;

		
			}
			
		};	

	

	
 


	
	
	function nom_div(div)
	{
		return document.getElementById(div);
	}
};