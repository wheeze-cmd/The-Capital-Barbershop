<?php

include 'connect.php';

$fullname = $_POST['fullname'];
$phone = $_POST['phone'];
$service = $_POST['service'];
$appointment_time = $_POST['appointment_time'];
$notes = $_POST['notes'];

$sql = "INSERT INTO appointments
(fullname, phone, service, appointment_time, notes)

VALUES
('$fullname', '$phone', '$service', '$appointment_time', '$notes')";

if (mysqli_query($conn, $sql)) {

    echo "Appointment booked successfully!";

} else {

    echo "Error: " . mysqli_error($conn);

}

?>