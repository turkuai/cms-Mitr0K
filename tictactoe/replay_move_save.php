<?php
header("Content-Type: application/json");
include "dp.php";

// Takes raw data from the request
$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json);

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO siirrot (game_id, move_index, row, col) VALUES (?, ?, ?, ?)");
$stmt->bind_param("iiii", $data->game_id, $data->move_index, $data->row, $data->col);
$stmt->execute();

$moveid = $stmt->insert_id;

$stmt->close();
$conn->close();
//valmis//
?>
{ "moveid": <?php echo $moveid; ?> }