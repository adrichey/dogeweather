<?php

// Change the line below to your Google Geocode API Key
$google_geocode_api_key = "GOOGLE_API_KEY_GOES_HERE";

$postal_code = isset($_GET['postal_code']) ? urldecode($_GET['postal_code']) : false;

$json = json_encode( array('status'=>'MUCH_FAILURE','code'=>$postal_code) );

if( $postal_code != false ) {

	// Make sure the input is alphanumeric and only containing dashes in case someone hits this page via something other than AJAX
	if( preg_match('/^[A-Za-z0-9\-\s]+$/', $postal_code, $matches) ) {
		$json = file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?address=' . urlencode($postal_code) . '&sensor=false&key=' . $google_geocode_api_key);
	}

}

echo $json;
exit;

?>