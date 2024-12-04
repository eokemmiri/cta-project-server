#!/bin/bash
#
# Linux/Mac BASH script to build docker container
#
docker rmi cta-project-server
docker build -t cta-project-server .
