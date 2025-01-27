<?php
header('Content-type: text/xml');
?>
<Response>
    <Dial callerId="+19035183005"><?php  echo $_POST['To'];?></Dial>
</Response>