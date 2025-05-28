<?php
header("Content-Type: application/json");
include "db.php";
// Takes raw data from the request
$json = file_get_contents('php://input');

// https://www.w3schools.com/php/php_mysql_select.asp


$data = json_decode($json);

$stmt = $conn->prepare("SELECT * FROM game_moves where game_id = ? order by move_index");
$stmt->bind_param("i", $data->gameId);
$stmt->execute();

$result = $stmt->get_result();

?>
[
<?php

if ($result->num_rows > 0) {
  // output data of each row
  $rows = [];
  while($row = $result->fetch_assoc()) {
    $rows[] = $row;
  }
  for ($i = 0; $i < count($rows); $i++){
    $row = $rows[$i];
    if($i == count($rows) - 1){
      echo '{ "moveIndex": ' . $row["move_index"] . ', "row": ' . $row["row"]. ', "col": ' . $row["col"]. "}";
    } else{
      echo '{ "moveIndex": ' . $row["move_index"] . ', "row": ' . $row["row"]. ', "col": ' . $row["col"]. "},";
    }
  }
  
}

echo "]";

$stmt->close();
$conn->close();


?>