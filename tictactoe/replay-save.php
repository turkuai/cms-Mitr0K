<?php
header("Content-Type: application/json");
include "db.php";
// Takes raw data from the request
$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json);

$stmt = $conn->prepare("INSERT INTO games (player_x, player_o) VALUES (?, ?)");
$stmt->bind_param("ss", $data->playerX, $data->playerO);
$stmt->execute();

$gameid = $stmt->insert_id;

$stmt->close();
$conn->close();

?>
{ "gameid": <?php echo $gameid; ?> }