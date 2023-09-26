import App from "./App";
import Driver from "./Driver";

// const testApp = new App();
// const driver1 = Driver.createTestingDriver("a", [3,1,2,3]);
// const driver2 = Driver.createTestingDriver("b", [3,2,3,1]);
// const driver3 = Driver.createTestingDriver("c", [4,2,3,4,5]);
// const driver4 = Driver.createTestingDriver("d", [5,3]);
// const driversArray: Driver[] = [driver1, driver2,driver3, driver4];
// testApp.generateTestDriverList(driversArray);
// const result = testApp.exchangeGossip();
// console.log("Result: " + result);
// console.log("Final situation:");
// console.table(testApp.getDriverList());

const randomApp = new App();
randomApp.generateRandomDriverList(3);
console.log("Initial situation:");
console.log(randomApp.getDriverList());
const result = randomApp.exchangeGossip();
console.log("Result: " + result);
console.log("Final situation:");
console.table(randomApp.getDriverList());
