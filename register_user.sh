#!/usr/bin/bash

curl -X POST -k https://localhost:4443/register -d "@newuser.json" -H "Content-Type: application/json"