# Walk of the 10 Producers
## What is this?
This is a data visualization application (using React, TS, & d3.js) that consumes (via websocket) and displays data in real time from 10 producers. Each producer generates a random walk timeseries dataset at a rate of 1000 data points per second. This repo is just for the frontend - here is a [link](https://github.com/6xzo/challenge-backend) to the corresponding backend.

## Getting Started
**Note:** React + TS boilerplate was generated with [Vite](https://vite.dev/) and was generated with the following versions:
* node - v22.14.0
* npm - 11.2.0


**[Backend:](https://github.com/6xzo/challenge-backend)**

Navigate to folder: `cd challenge-backend`

Start server: `cargo run --release`

**Frontend:**

Navigate to folder: `cd adi-challenge-frontend`

Install dependencies: Run `npm i` to 

Start server: `npm run dev`