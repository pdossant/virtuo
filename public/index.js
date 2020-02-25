'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];



console.log(cars);
console.log(rentals);
console.log(actors);

function dateDiff(date1, date2) {
  var diff = {}                           // Initialisation du retour
  var tmp = date2 - date1;

  tmp = Math.floor(tmp / 1000);             // Nombre de secondes entre les 2 dates
  diff.sec = tmp % 60;                    // Extraction du nombre de secondes
  // console.log(diff.sec);
  tmp = Math.floor((tmp - diff.sec) / 60);    // Nombre de minutes (partie entière)
  diff.min = tmp % 60;                    // Extraction du nombre de minutes
  // console.log(diff.min);
  tmp = Math.floor((tmp - diff.min) / 60);    // Nombre d'heures (entières)
  diff.hour = tmp % 24;                   // Extraction du nombre d'heures
  // console.log(diff.hour);
  tmp = Math.floor((tmp - diff.hour) / 24);   // Nombre de jours restants
  diff.day = tmp;
  //console.log(diff.day);

  return diff;
}

// Step 1 -  Euro-Kilometers

function rentalPrice() {
  for (var rental of rentals) {
    for (var car of cars) {
      if (car.id == rental.carId) {
        var distance = rental.distance * car.pricePerKm;
        var date2 = new Date(rental.returnDate);
        var date1 = new Date(rental.pickupDate);
        var diff = dateDiff(date1, date2);
        var days = diff.day;

        if (days == 0) { days = 1; } //if the car is just for a 1day trip
        //the diff will return 0 because same day

        var time = days * cars.pricePerDay;
        rental.price = (car.pricePerDay * days) + (car.pricePerKm * rental.distance);


        console.log(car.name);
        console.log("Rental price :"+rental.price+"$ \n\n");
      }
    }
  }
}
rentalPrice();

//Step 2 - Drive more, pay less

function rentalPricePromotion()
{
  for (var rental of rentals) {
    for (var car of cars) {
      if (car.id == rental.carId) {
        var distance = rental.distance * car.pricePerKm;
        var date2 = new Date(rental.returnDate);
        var date1 = new Date(rental.pickupDate);
        var diff = dateDiff(date1, date2);
        var days = diff.day;

        if (days == 0) { days = 1; } //if the car is just for a 1day trip
        //the diff will return 0 because same day
        var time = days * car.pricePerDay;
        rental.price = (car.pricePerDay * days) + (car.pricePerKm * rental.distance);

        if(days>1 && days<5)
        {
          rental.price=rental.price*0.9;
        }
        if(days>4 && days<10)
        {
          rental.price=rental.price*0.7;
        }
        if(days>10)
        {
          rental.price=rental.price*0.5;
        }

        console.log(car.name);
        console.log("Rental price :"+rental.price+"$ \n\n");
      }
    }
  }
}
rentalPricePromotion()

//Step 3 - Give me all your money

function commission()
{  
  var commission = 0;
  for(var rental of rentals)
  {
    if(rental.price > 0)
    {
      var date2 = new Date(rental.returnDate);
      var date1 = new Date(rental.pickupDate);
      var diff = dateDiff(date1, date2);
      var days = diff.day;
      if (days == 0) { days = 1; }

      commission = rental.price*0.3;
      rental.commission.insurance = commission * 0.5;
      rental.commission.treasury = 1*days;
      rental.commission.virtuo = commission - rental.commission.insurance - rental.commission.treasury;
    }
  console.log("Commission : "+commission);
  console.log("insurance: "+rental.commission.insurance);
  console.log("treasury: "+rental.commission.treasury);
  console.log("virtuo: "+rental.commission.virtuo +"\n\n");

  }
  
}
commission()

//Step 4 - The famous deductible

function NewRentalPrice()
{
  for (var rental of rentals)
  {
    for (var car of cars)
    {
      if(car.id == rental.carId)
      {
        var date2 = new Date(rental.returnDate);
        var date1 = new Date(rental.pickupDate);
        var diff = dateDiff(date1, date2);
        var days = diff.day;
        if (days == 0) { days = 1; }

        if(rental.options.deductibleReduction === true)
        {
          rental.price=((car.pricePerDay+4)*days)+(car.pricePerKm*rental.distance);
        }
      }
    }
    console.log(car.name);
    console.log("Option : "+rental.options.deductibleReduction);
    console.log("New Rental Price :"+rental.price+"$ \n\n");
  }
  
}
NewRentalPrice()

//Step 5 - Pay the actors

function payActors()
{ 
 for(var rental of rentals)
 {
  for(var actor of actors)
  {
    if(actor.rentalId == rental.id)
    {
      for(var pay of actor.payment)
      {
       if(pay.who == 'driver') 
         pay.amount = rental.price;
       if(pay.who == 'partner') 
         pay.amount = rental.price*0.7;
       if(pay.who == 'insurance') 
         pay.amount = rental.commission.insurance;
       if(pay.who == 'treasury') 
         pay.amount = rental.commission.treasury;       
       if(pay.who == 'virtuo') 
         pay.amount = rental.commission.virtuo;
     }     
   }
 }
}
console.log(actors);
}

payActors();


