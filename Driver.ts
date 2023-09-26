class Driver {
  //gossip known by the driver
  private gossip: string[] = [];
  //driver's route
  private route: number[] = [];
  //number of stops --> route.length
  private stopsNumber: number;

  //initialize every driver with a single random gossip and a random route
  constructor() {
    //generate a random first gossip
    this.gossip = this.firstRandomGossip();
    //generate a random number between 1 and 10 inclusive --> route length / number of stops
    const stopsNumber: number = Math.floor(Math.random() * 10 + 1);
    this.stopsNumber = stopsNumber;
    //generate a random number for each stop to create the route
    for (let i = 0; i < stopsNumber; i++) {
      //random number between 1 and 9 inclusive
      const stopValue: number = Math.floor(Math.random() * 9 + 1);
      this.route.push(stopValue);
    }
  }

  //initialize every driver with a specific gossip and route (for testing purpose)
  public static createTestingDriver(
    firstGossip: string,
    route: number[]
  ): Driver {
    const driver = new Driver();
    driver.gossip.pop(); //remove the first random generated element
    driver.gossip.push(firstGossip);
    driver.stopsNumber = route.length;
    driver.route = route;
    return driver;
  }

  //generate a random first gossip
  private firstRandomGossip(): string[] {
    let gossipInitializer: string[] = [];
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    let letter: string = lowercaseLetters.charAt(
      Math.floor(Math.random() * lowercaseLetters.length)
    );
    gossipInitializer.push(letter);
    return gossipInitializer;
  }

  public getStopsNumber(): number {
    return this.stopsNumber;
  }

  public getRoute(): number[] {
    return this.route;
  }

  public getGossip(): string[] {
    return this.gossip;
  }

  public addNewGossip(newGossip: string[]) {
    const oldGossip = this.getGossip();
    newGossip.forEach((gossip) => {
      //adding the new gossip if it was not present
      if (!oldGossip.includes(gossip)) {
        this.gossip.push(gossip);
      }
    });
  }

  public getNumOfGossip(): number {
    return this.gossip.length;
  }
}

export default Driver;
