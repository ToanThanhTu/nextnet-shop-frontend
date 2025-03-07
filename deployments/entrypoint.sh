#!/bin/sh

[ -z "$API_BASE_URL" ] && echo "Env $API_BASE_URL is empty"

node server.js