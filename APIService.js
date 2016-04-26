/* APIService.js */
function APIService( endpoint, appid )
{
	var endpoint = endpoint;
	var appid = appid;
	
	/*
		executeCommand : This method will execute the specified command as an api request.

		'Name' is the name of the command you wish to execute, eg: GetIndexItemInfo.
		'Params' is a string containing the command parameters, eg: 'datasource=fresh&item=majesticseo.com'.
		'Timeout' specifies the amount of time to wait before aborting the transaction. This defaults to 5 seconds which should be plenty for most requests.
	*/
	this.executeCommand = function( name, params, timeout )
	{
		// call the command
		var xmlhttp=new XMLHttpRequest();
		
		var params = "app_api_key=" + encodeURIComponent(appid)
					+ "&cmd=" + encodeURIComponent(name)
					+ "&" + params;
		
		xmlhttp.open("POST",endpoint,false);
		//xmlhttp.timeout = timeout || 5;
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(params);
		
		// check that the request was carried out ok and return the response
		var response = new Response();
		
		if ( xmlhttp.status == "200" )
		{
			response.new_ok( new XMLSerializer().serializeToString(xmlhttp.responseXML) );
		}
		else
		{
			response.new_failed("ConnectionError", "Problem connecting to the data source.");
		}
		
		return response;
	}

	/*
		executeOpenAppRequest : This will execute the specified command as an OpenApp request.

		'AccessToken' is the token provided by the user to access their resources.
		'CommandName' is the name of the command you wish to execute, eg: GetIndexItemInfo
		'Params' is a string containing the command parameters.
		'Timeout' specifies the amount of time to wait before aborting the transaction. 
					This defaults to 5 seconds which should be plenty for most requests.
	*/
	this.executeOpenAppRequest = function( accesstoken, commandname, params, timeout )
	{
		// call the command
		var xmlhttp=new XMLHttpRequest();
		
		var params = "accesstoken=" + encodeURIComponent(accesstoken)
					+ "&privatekey=" + encodeURIComponent(appid)
					+ "&cmd=" + encodeURIComponent(commandname)
					+ "&" + params;
					
		xmlhttp.open("POST",endpoint,false);
		//xmlhttp.timeout = timeout || 5;
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(params);
		
		// check that the request was carried out ok and return the response
		var response = new Response();
		
		if ( xmlhttp.status == "200" )
		{
			response.new_ok( new XMLSerializer().serializeToString(xmlhttp.responseXML) );
		}
		else
		{
			response.new_failed("ConnectionError", "Problem connecting to the data source.");
		}
		
		return response;
	}
}