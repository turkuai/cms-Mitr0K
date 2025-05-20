<?php
header("Content-Type: application/json");
include "dp.php";

// Takes raw data from the request
$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json);


$stmt = $conn->prepare("INSERT INTO pelit (pelaaja_x, pelaaja_o) VALUES (?, ?)");
$stmt->bind_param("ss", $data -> pelaaja1, $data -> pelaaja2);
$stmt->execute();


$pelitid = $stmt->insert_id;

$stmt->close();
$conn->close();
//valmis//
?>
{ "pelitid": <?php echo $pelitid; ?> }