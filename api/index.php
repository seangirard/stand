<?php


ini_set('display_errors', true);
error_reporting(E_ALL ^ E_NOTICE);

$api = new SG_STA_GTFS();

class SG_STA_GTFS {

	var $db = './db/sta-gtfs.sqlite';
	var $pdo;
	var $api;

	function __construct() {
		$this->pdo = new PDO('sqlite:'.$this->db); 
		// Some PDO errors (e.g. execute) will fail silently w/o this attribute set
    $this->pdo->setAttribute(PDO::ATTR_ERRMODE 
                            ,PDO::ERRMODE_EXCEPTION);
		$this->api = new stdClass();
		
		$this->init();
	}

	public function output() {
		header('Content-Type: application/json');
		echo json_encode($this->api);
	}

	public function query($sql, $params) {
		$db = $this->pdo->prepare($sql);
		$db->execute($params);

		return $db->fetchAll(PDO::FETCH_OBJ);
	}

	public function init() {
		$rest = explode('/', $_REQUEST['endpoint']);
		switch ($rest[0]) {
			case 'params':
				$this->api = $this->getParams();
				break;
			case 'agency':
				$this->api = $this->getAgency();
				break;
			case 'calendar':
				$sid = isset($rest[1]) ? $rest[1] : null;
				$this->api = $this->getCalendar($sid);
				break;
			case 'route':
				$this->api = $this->getRoute($rest[1]);
				$api = new stdClass();
				$api->route = $this->getRoute($rest[1]);
				$api->trips = $this->getTrips($api->route->route_id);
				$this->api = $api;
				break;
			case 'routes':
				$this->api = $this->getRoutes();
				break;
			case 'trips':
				$this->api = $this->getTrips();
				break;
			case 'trip':
				$this->api = $this->getTrip($rest[1]);
				break;
			case 'times':
				$this->api = $this->getTimes($rest[1]);
				break;
			default:
				break;
		}
		
		if ( $this->api && !empty($this->api) ) {
			$this->output();
		}

	}

	protected function getParams() {
		$params = new stdClass();

		$params->direction->outbound = 0;
		$params->direction->inbound = 1;

		$params->service->weekday = 1;
		$params->service->saturday = 2;
		$params->service->sunday = 3;
		
		$params->today->weekday = false;
		$params->today->saturday = false;
		$params->today->sunday = false;
		$now = new DateTime;
		switch($now->format('N')) {
			case 6:
				$params->today->saturday = true;
				break;
			case 7:
				$params->today->sunday = true;
				break;
			default:
				$params->today->weekday = true;
				break;
		}


		return $params;
	}

	protected function getAgency() {
		$params = array();
		
		$sql = "SELECT
						*
						FROM agency
					";
		
		return $this->query($sql, $params);
	}

	protected function getCalendar($sid=null) {
		$params = array();
		
		$sql = "SELECT
						*
						FROM calendar
					";

		if ( !is_null($sid) ) {
			$params[':sid'] = $sid;
			$sql .= "
							WHERE
							service_id = :sid
							";
		}
		
		return $this->query($sql, $params);
	}

	protected function getRoutes() {
		$params = array();
		
		$sql = "SELECT
						*
						FROM routes
						ORDER BY route_short_name*100 -- fake a natsort
					";
		
		return $this->query($sql, $params);
	}

	protected function getRoute($route) {
		$params = array(':route'=>$route);
		
		$sql = "SELECT
						*
						FROM routes
						WHERE route_short_name = :route
					";

		$q = $this->query($sql, $params);
		return $q[0];
	}

	protected function getTrips ( $rid=null, $sid=null, $did=null ) {
		$params = array();
		
		$sql = "SELECT
						*
						FROM trips
						WHERE route_id = '4876'
						AND service_id = '1'
						AND direction_id = '1'
					";
		
		return $this->query($sql, $params);
	}

	protected function getTrip($trip) {
		$params = array(':trip'=>$trip);

		$sql = "SELECT
						*
						FROM trips
						WHERE trip_id = :trip
					";

		return $this->query($sql, $params);
	}

	protected function getTimes($trip) {
		$params = array(':trip'=>$trip);

		$sql = "SELECT
						*
						FROM stop_times
						JOIN stops
							ON stop_times.stop_id = stops.stop_id
						WHERE trip_id = :trip
						ORDER BY stop_sequence*100 -- fake a natsort
					";

		return $this->query($sql, $params);
	}

}

?>
