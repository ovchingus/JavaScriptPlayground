var john = {
  name: "John",
  yearOfBirth: 1990,
  calculateAge: function() {
    // there is a object "this"
    console.log(2019 - this.yearOfBirth);

    // there is a global "this"
    /*
    function innerFunction() {
      console.log(this);
    }
    innerFunction();
    */
  }
};

john.calculateAge();

var mike = {
  name: "Mike",
  yearOfBirth: 1975
};

mike.calculateAge = john.calculateAge;
mike.calculateAge();
