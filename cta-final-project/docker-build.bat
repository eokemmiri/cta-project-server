@echo off
REM
REM Windows BATCH script to build docker container
REM
@echo on
docker rmi cta-project-server
docker build -t cta-project-server .
