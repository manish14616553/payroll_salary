#!/bin/bash

PGPASSWORD=manish_123 pg_dump -U postgres -h localhost -d contractor > /home/manish/auth1/backup_$(date +\%Y\%m\%d_\%H\%M).sql
