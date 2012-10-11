/* Response.js */
function Response()
{
	// global vars
	var xml = "";
	var code = "";
	var errorMessage = "";
	var fullMessage = "";
	var globalVars = [];
	var tables = [];

	/*
		new_ok : returns an instance of the object
	*/
	this.new_ok = function( xml )
	{
		if ( xml )
		{
			this.xml = xml;
			return this.importData( xml );
		}
	}

	/*
		new_failed
	*/
	this.new_failed = function( errorMessage, fullMessage )
	{
		this.errorMessage = errorMessage;
		this.fullMessage = fullMessage;
	}

	/*
		rawXML
	*/
	this.rawXml = function()
	{
		return this.xml;
	}

	/*
		importData : Takes named argument xml, which is the xml document which contains the xml 
					and parses it, storing the result internally
	*/
	this.importData = function( xml )
	{
		// parse the XML and get the Results
		var parsedXML = $.parseXML(xml);
		$xml = $( parsedXML );
		$result = $xml.find("Result");
		this.code = $result.attr("Code");
		this.errorMessage = $result.attr("ErrorMessage");
		this.fullError = $result.attr("FullError");

		// The oddly named "Global Vars"
		$result.find("GlobalVars").each(function(){
			for ( var i = 0; i < this.attributes.length; i++ )
			{
				globalVars[ this.attributes.item(i).nodeName ] = this.attributes.item(i).nodeValue;
			}
		});

		// parse the data tables
		$result.find("DataTables").each(function(){
			// this gets the DataTables and Count value
			$(this).find("DataTable").each(function(){
				// this gets the Name, RowsCount and Headers
				var dt = new DataTable();
				dt.importDataTable( $(this) );
				tables[ dt.getTableName() ] = dt;
			});
		});

		return;
	}

	/*
		isOK : Indicates whether this response is ok.
	*/
	this.isOK = function()
	{
		if ( this.code == "OK" )
		{
			return 'OK';
		}
		else
		{
			return "NotOK"; // ??????
		}
	}

	/*
		code : Returns the message code - "OK" represents predicted state, all else represents an error.
	*/
	this.getCode = function()
	{
		return this.code;
	}

	/*
		errorMessage : Returns the Error message ( if present ) from the message
	*/
	this.getErrorMessage = function()
	{
		return this.errorMessage;
	}

	/*
		fullError : Returns the Full Error message ( if present ) from the message
	*/
	this.getFullError = function()
	{
		return this.fullError;
	}


	/*
		globalParams : Exposes a hash of all global parameters.
	*/
	this.globalParams = function()
	{
		return this.globalVars;
	}

	/*
		paramForName : Takes named argument "Name" - representing the name of the parameter to be quried

		usage: response.paramForName( "setting" );
	*/
	this.paramForName = function( name )
	{
		return globalVars[name];
	}

	/*
		tableForName : Takes named argument "Name" 
						- representing the name of the table - if it exists a table object is returned

		usage: my $table = $response -> tableForName( Name => "table" );
	*/
	this.tableForName = function( name )
	{
		if ( typeof(name) == 'undefined' )
		{
			return new DataTable();
		}

		if ( ! tables[ name ] )
		{
			return new DataTable();
		}

		return tables[ name ];
	}
}