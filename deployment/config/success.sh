#!/bin/bash
intro=`cat intro.txt`
log=`cat log.txt`
message=`cat message`
report="$intro%0A%0A$message%20Berhasil"
chat_id=`cat chat_id`
bot_id=`cat bot_id`
curl https://api.telegram.org/bot$bot_id/sendMessage?chat_id=$chat_id\&text=$report