import Driver from "./Driver";

class App {
  //drivers at work
  private driversList: Driver[] = [];
  //number of gossip to exchange
  private totalGossip: number = this.driversList.length;
  //maximum minutes to get all the gossips around
  private maxMinutes: number = 480;

  //multiple constructors
  //fist constructor: initializes a random list of the given number of drivers
  public generateRandomDriverList(numOfDrivers: number) {
    for (let i = 0; i < numOfDrivers; i++) {
      const driver = new Driver();
      this.driversList.push(driver);
    }
    this.totalGossip = numOfDrivers;
  }

  //second constructor: list made out with specific drivers (for testing purposes)
  public generateTestDriverList(drivers: Driver[]) {
    this.driversList = drivers;
    this.totalGossip = drivers.length;
  }

  public getDriverList(): Driver[] {
    return this.driversList;
  }

  public getTotalGossip(): number {
    return this.totalGossip;
  }

  //returns true if the end condition is true (if every driver knows everything)
  public checkEnd(): boolean {
    //check if every driver knows all the gossip
    let list = this.getDriverList();
    for (let j = 0; j < list.length; j++) {
      const currentDriver = list[j];
      if (currentDriver.getNumOfGossip() < this.getTotalGossip()) {
        //if at least one driver doesn't know all the gossip --> return false
        return false;
      }
    }
    //if every driver knows all the gossip --> return true
    return true;
  }

  //return true if the two drivers are at the same stop at the same time
  //same stop : same value of driver.getRoute()[index]
  //same time : same index (calculated from count)
  public checkSameStopsSameTime(driver1: Driver, driver2: Driver, count: number): boolean {
    let index : number = count;
    //iterating over driver1 stops
    while (index >= driver1.getStopsNumber()) {
      index -= driver1.getStopsNumber();
    }
    const stopValue1 = driver1.getRoute()[index];
    index = count;
    //iterating over driver2 stops
    while (index >= driver2.getStopsNumber()) {
      index -= driver2.getStopsNumber();
    }
    const stopValue2 = driver2.getRoute()[index];
    return (stopValue1 === stopValue2);
  }

  //makes the app run:
  //if it returns a number: it represents the number of stops necessary for all bus drivers to know all the gossips
  //if it returns undefined: the app never stops
  public exchangeGossip(): number | undefined {
    const driverList = this.getDriverList();
    const numOfDrivers = driverList.length;
    //two ending conditions
    let count: number = 0;
    let end: boolean = false;
    while (count < this.maxMinutes && !end) {
      //compare each driver with all the following
      for (let i = 0; i < numOfDrivers; i++) {
        const firstDriver = driverList[i];
        for (let j = i + 1; j < numOfDrivers; j++) {
          const secondDriver = driverList[j];
          //check if the two drivers meet at the same stop at the same time
          let chat: boolean = this.checkSameStopsSameTime(
            firstDriver,
            secondDriver,
            count
          );
          //if they meet: exhange gossips
          if (chat) {
            firstDriver.addNewGossip(secondDriver.getGossip());
            secondDriver.addNewGossip(firstDriver.getGossip());
          }
        }
      }
      count++;
      //checks if all drivers know all gossips
      end = this.checkEnd();
    }
    (count === this.maxMinutes) ? console.log("Never") : console.log("All Gossip exchanged after " + count + " stops");
    return (count === this.maxMinutes) ? undefined : count;
  }
}

export default App;
