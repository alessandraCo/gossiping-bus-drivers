import Driver from "./Driver";
import App from "./App";

test("each driver knows only one gossip at the beginning", () => {
  const randomApp = new App();
  //random app with 2 drivers
  randomApp.generateRandomDriverList(2);
  //drivers list
  const list = randomApp.getDriverList();
  list.forEach((driver) => {
    expect(driver.getNumOfGossip()).toBe(1);
  });
  const testApp = new App();
  //testing app with 2 drivers
  const driver1 = Driver.createTestingDriver("a", [1, 2, 3]);
  const driver2 = Driver.createTestingDriver("b", [2, 3, 4]);
  const newDriverList: Driver[] = [driver1, driver2];
  testApp.generateTestDriverList(newDriverList);
  testApp.getDriverList().forEach((driver) => {
    expect(driver.getNumOfGossip()).toBe(1);
  });
});

test("at the end of the 480 minutes: everyone knows every gossip (result) OR at least one driver doesn't know all the gossip (never)", () => {
  const randomApp = new App();
  //random app with 3 drivers
  randomApp.generateRandomDriverList(3);
  //makes the app run
  const result = randomApp.exchangeGossip();
  //gossipToKnow: number of gossip that every driver should know at the end of the day
  const gossipToKnow: number = randomApp.getTotalGossip();
  //list: drivers list
  const list: Driver[] = randomApp.getDriverList();
  //check results
  let allKnow: boolean = true;
  for (let k = 0; k < list.length; k++) {
    if (list[k].getNumOfGossip() !== gossipToKnow) {
      allKnow = false;
      break; //at least one
    }
  }
  if (result === undefined) {
    expect(allKnow).toBeFalsy();
  } else {
    expect(allKnow).toBeTruthy();
  }
});

test("every number of stops if between 1 and 10 inclusive", () => {
  const randomApp = new App();
  //random app with 3 drivers
  randomApp.generateRandomDriverList(3);
  //list: drivers list
  const list = randomApp.getDriverList();
  list.forEach((driver) => {
    expect(driver.getStopsNumber()).toBeLessThanOrEqual(10);
    expect(driver.getStopsNumber()).toBeGreaterThanOrEqual(0);
  });
  const testApp = new App();
  //testing app with 3 drivers
  const driver1 = Driver.createTestingDriver("a", [1, 2, 3]);
  const driver2 = Driver.createTestingDriver("b", [4, 2]);
  const driver3 = Driver.createTestingDriver("c", [5, 3, 2]);
  const driversArray: Driver[] = [driver1, driver2, driver3];
  testApp.generateTestDriverList(driversArray);
  //test list: drivers list
  const testList = testApp.getDriverList();
  testList.forEach((driver) => {
    expect(driver.getStopsNumber()).toBeLessThanOrEqual(10);
    expect(driver.getStopsNumber()).toBeGreaterThanOrEqual(0);
  });
});

test("every stop value if between 1 and 9 inclusive", () => {
  const randomApp = new App();
  //random app with 3 drivers
  randomApp.generateRandomDriverList(3);
  //list: drivers list
  const list = randomApp.getDriverList();
  list.forEach((driver) => {
    driver.getRoute().forEach((stop) => {
      expect(stop).toBeLessThanOrEqual(9);
      expect(stop).toBeGreaterThanOrEqual(1);
    });
  });
  const testApp = new App();
  //testing app with 3 drivers
  const driver1 = Driver.createTestingDriver("a", [1, 2, 3]);
  const driver2 = Driver.createTestingDriver("b", [4, 2]);
  const driver3 = Driver.createTestingDriver("c", [5, 3, 2]);
  const driversArray: Driver[] = [driver1, driver2, driver3];
  testApp.generateTestDriverList(driversArray);
  //test list: drivers list
  const testList = testApp.getDriverList();
  testList.forEach((driver) => {
    driver.getRoute().forEach((stop) => {
      expect(stop).toBeLessThanOrEqual(9);
      expect(stop).toBeGreaterThanOrEqual(1);
    });
  });
});

test("check if the function checkEnd returns true if all the drivers know all the gossips", () => {
  const testApp = new App();
  //testing app with 3 drivers
  const driver1 = Driver.createTestingDriver("a", [1, 2, 3]);
  const driver2 = Driver.createTestingDriver("b", [4, 2]);
  const driver3 = Driver.createTestingDriver("c", [5, 3, 2]);
  const driversArray: Driver[] = [driver1, driver2, driver3];
  testApp.generateTestDriverList(driversArray);
  expect(testApp.checkEnd()).toBeFalsy();
});