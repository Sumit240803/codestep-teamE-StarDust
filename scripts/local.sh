#!/bin/bash

# Start the local replica
dfx start --background

# Install the project dependencies
npm install

# Deploy the project
dfx deploy