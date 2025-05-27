<?php
header("Content-Type: application/json");
include "db.php";
// Takes raw data from the request
$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json);

$stmt = $conn->prepare("INSERT INTO game_moves (game_id, move_index, row, col) VALUES (?, ?, ?, ?)");
$stmt->bind_param("iiii", $data->gameId, $data->moveIndex, $data->row, $data->col);
$stmt->execute();

$stmt->close();
$conn->close();

?>
{ "status": "ok" }
