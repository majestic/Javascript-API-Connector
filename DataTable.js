/* DataTable.js */
var headers = [];
var rows = [];

function DataTable( )
{
	// global variables
	var dataTableVars = [];
	var name = "";

	/*
		importDataTable : Converts the data from XML output format to something usable
	*/
	this.importDataTable = function( xml )
	{
		$xml.find("DataTable").each(function(){
			for ( var i = 0; i < this.attributes.length; i++ )
			{
				dataTableVars[ this.attributes.item(i).nodeName ] = this.attributes.item(i).nodeValue;
			}
		});

		// get the table headers
		headers = new DataTable().stringSplit(dataTableVars["Headers"]);
		delete dataTableVars["Headers"];
		this.name = dataTableVars["Name"];
		delete dataTableVars["Name"];

		rows = [];
		// loop through all of the 'rows' in the data table
		$xml.find("Row").each(function(){
			var rd = new DataTable().stringSplit( $(this).text() );
			var row = [];
			for( var i = 0; i < headers.length; i++ )
			{
				if ( rd[i] == " " )
				{
					rd[i] = "";
				}
				row[ headers[i] ] = rd[i];
			}
			rows.push(row);
		});
	}


	/*
		stringSplit : Splits the input from pipe seperated form into an array.
					  RPC code splits on pipe chars, and double pipes are intended to be quoted.
	*/
	this.stringSplit = function ( listOfHeaders )
	{
		// this is the regex that I should be using:  /(?<!\|)\|(?!\|)/
		// Javascript only supports lookahead - not look behind.
		var ar = listOfHeaders.split( /\|(?!\|)/ );
		var arrayToReturn = [];
		for ( var i = 0; i < ar.length; i++ )
		{
			// check the last char in ar[i] == |
			if ( ar[i].charAt(ar[i].length-1) == "|" )
			{
				arrayToReturn.push( ar[i] + ar[i + 1] );
				i++;
			}
			else
			{
				arrayToReturn.push(ar[i]);
			}
		}
		return arrayToReturn;
	}


	/*
		headers : Returns the table headers as an array
	*/
	this.getHeaders = function()
	{
		return headers;
	}


	/*
		paramForName : Returns a table parameter for a given Name.
	*/
	this.paramForName = function( key )
	{
		if ( key in dataTableVars )
		{
			return dataTableVars[ key ];
		}
		else
		{
			return "undef";
		}
	}


	/*
		rowCount : returns number of rows
	*/
	this.getRowCount = function()
	{
		return rows.length;
	}


	/*
		rowsAsArray : returns the rows as an array - 
					  note - the underlying hashes are references and hence changes are persisted.
	*/
	this.rowsAsArray = function()
	{
		return rows;
	}


	/*
		tableName : returns the table name
	*/
	this.getTableName = function()
	{
		return this.name;
	}
}