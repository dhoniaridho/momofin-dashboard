#!/bin/bash

microk8s kubectl apply -f ./deployment.yml
microk8s kubectl apply -f ./hpa.yml
microk8s kubectl apply -f ./service.yml
microk8s kubectl apply -f ./ingress.yml