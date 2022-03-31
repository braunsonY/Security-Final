#!/usr/bin/bash

curl -X POST -k https://localhost:4443/login -d "@logon.json" -H "Content-Type: application/json"