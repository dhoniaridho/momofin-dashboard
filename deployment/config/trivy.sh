#!/bin/bash
intro=`cat intro.txt`
result=`cat result3.txt`
report="$intro%0A%0AHasil%20Trivy%20Vulnerability%20Scanner%0A%0A$result"
chat_id=`cat chat_id`
bot_id=`cat bot_id`
curl https://api.telegram.org/bot$bot_id/sendMessage?chat_id=$chat_id\&text=$report