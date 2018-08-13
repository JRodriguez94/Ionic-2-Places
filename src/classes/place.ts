export class Place {

  constructor(public name: string,
              public  images: string[],
              public rating: number,
              public lacation: {lat:number, long:number}){

  }
}
