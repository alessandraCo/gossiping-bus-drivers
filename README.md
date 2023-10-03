# gossiping-bus-drivers
- calculate after how many stops all the bus drivers know all the gossips
---
## Demo
![demo img 1](https://github.com/alessandraCo/gossiping-bus-drivers/blob/main/Gossiping.png)
![demo img 2](https://github.com/alessandraCo/gossiping-bus-drivers/blob/main/NeverGossiping.png)
---
## Description
- this app calculates after how many stops all the bus drivers know all the gossips
- each driver knows one gossip at the beginning: the gossip is represented by a single letter string like "a" and is random generated
- when 2 or more drivers are at the same stop (even if it is the start), they can exchange all the gossips they know
- each driver has a route:
-  the number of stops is between 1 and 10 inclusive and it is random generated
-  each stop is represented by a value between 1 and 9 inclusive and it is random generated
-  the route is repeated over the whole
- all drivers take 1 minute to go from one stop to another and the gossip exchange happens instantly
- all drivers drive 8 hours a day so you have a maximum of 480 minutes to get all the gossiping around (maxMinutes in `App.ts`)
- the app returns the number of stops it takes to have all drivers on board with the latest gossips
- if there is even one driver who does not have all the gossips by the end of the day, the answer is never
---
### how to run the project
- open the terminal and type `ts-node index.ts`
### hot to run the tests
- open the terminal and type `npm test`
