/////////////////////////////
// Lecture: Function constructor

var jahn = {
  name: "John",
  yearOfBirth: 1990,
  job: "teacher"
};

var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
  /*this.calculateAge = function() {
      console.log(2019 - this.yearOfBirth);
    };*/
};

Person.prototype.calculateAge = function() {
  console.log(2019 - this.yearOfBirth);
};

Person.prototype.lastName = "Smith";

var john = new Person("John", 1990, "teacher");
var jane = new Person("Jane", 1969, "designer");
var mark = new Person("Mark", 1998, "retired");

john.calculateAge();
mark.calculateAge();
jane.calculateAge();

console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);

/////////////////////////////
// Lecture: Object.create

var personProto = {
  calculateAge: function() {
    console.log(2019 - this.yearOfBirth);
  }
};

var bob = Object.create(personProto);
bob.name = "John";
bob.yearOfBirth = 1986;
bob.job = "teacher";

var luke = Object.create(personProto, {
  name: { value: "Luke" },
  yearOfBirth: { value: 0 },
  job: { value: "Master Jedi" }
});

console.log(bob);

/////////////////////////////
// Lecture: Primitives vs objects

// Primitives
var a = 23;
var b = a;

a = 43;
console.log(a, b);

// Objects
var obj1 = {
  name: "john",
  age: 24
};
var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age, obj2.age);

// Functions
var age = 27;
var obj = {
  name: "Jonas",
  city: "SPb"
};

function change(a, b) {
  a = 30;
  b.city = "Moscow";
}

change(age, obj);

console.log(age);
console.log(obj.city);

/////////////////////////////
// Lecture: Passing functions as arguments

var years = [1956, 1235, 1989, 2015, 2000];

function arrayCalc(arr, fn) {
  var arrRes = [];
  for (var i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}

function calculateAge(el) {
  return 2019 - el;
}

function isFullAge(el) {
  return el >= 18;
}

function maxHearthRate(el) {
  if (el >= 18 && el <= 81) {
    return Math.round(206.9 - 0.67 * el);
  } else return -1;
}

var ages = arrayCalc(years, calculateAge);
console.log(ages);

console.log(arrayCalc(ages, isFullAge));
console.log(arrayCalc(ages, maxHearthRate));

/////////////////////////////
// Lecture: Functions returning functions

function interviewQuestion(job) {
  if (job === "designer") {
    return function(name) {
      console.log(name + ", can you please explain what UX design is?");
    };
  } else if (job === "teacher") {
    return function(name) {
      console.log("What subject do you teach, " + name + "?");
    };
  } else {
    return function(name) {
      console.log("Hello " + name + ", what do you do?");
    };
  }
}

var teacherQuestion = interviewQuestion("teacher");
var designerQuestion = interviewQuestion("designer");

teacherQuestion("John");
designerQuestion("John");
designerQuestion("jane");
designerQuestion("Mark");
designerQuestion("Mike");

interviewQuestion("teacher")("Mark");

/////////////////////////////
// Lecture: IIFE

function game() {
  var score = Math.random() * 10;
  console.log(score >= 5);
}
game();

(function() {
  var score = Math.random() * 10;
  console.log(score >= 5);
})();

//console.log(score);

(function(goodLuck) {
  var score = Math.random() * 10;
  console.log(score >= 5 - goodLuck);
})(5);

/////////////////////////////
// Lecture: Closures

function retirement(retirementAge) {
  var a = " years left until retirement";
  return function(yearOfBirth) {
    var age = 2019 - yearOfBirth;
    console.log(retirementAge - age + a);
  };
}

var retirementUS = retirement(66);
retirementUS(1990);

var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

retirement(66)(1990);
retirementGermany(1998);
retirementIceland(2001);

function newInterviewQuestion(job) {
  var designerQuestion = ", can you please explain what UX design is?";
  var teacherQuestion = "What subject do you teach, ";
  var otherQuestion = ", what do you do?";

  return function(name) {
    if (job === "designer") {
      console.log(name + designerQuestion);
    } else if (job === "teacher") {
      console.log(teacherQuestion + name + "?");
    } else console.log("Hello " + name + otherQuestion);
  };
}

var newDesignerQuestion = newInterviewQuestion("designer");
newDesignerQuestion("Jack");

newInterviewQuestion("teacher")("bob");

/////////////////////////////
// Lecture: Bind, call and apply

var michael = {
  name: "Michael",
  age: 29,
  job: "teacher",
  presentation: function(style, timeOfDay) {
    if (style === "formal") {
      console.log(
        "Good " +
          timeOfDay +
          ", Ladies and gentlemen! I'm " +
          this.name +
          ", I'm a " +
          this.job +
          " and I'm " +
          this.age +
          " years old. Have a nice " +
          timeOfDay +
          "."
      );
    } else if (style === "friendly") {
      console.log(
        "Hey! What's up? I'm " +
          this.name +
          ", I'm a " +
          this.job +
          " and I'm " +
          this.age +
          " years old. Have a nice " +
          timeOfDay +
          "."
      );
    }
  }
};

var emily = {
  name: "Emily",
  age: 29,
  job: "designer"
};

michael.presentation("formal", "morning");

michael.presentation.call(emily, "friendly", "afternoon");

//michael.presentation.apply(emily, ["friendly", "afternoon"]);

var michaelFriendly = michael.presentation.bind(michael, "friendly");

michaelFriendly("morning");

michaelFriendly("night");

var emilyFormal = michael.presentation.bind(emily, "formal");

emilyFormal("day");

// Another cool example
var newYears = [1990, 1965, 1937, 2005, 1998];

function newArrayCalc(arr, fn) {
  var arrRes = [];
  for (var i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}

function newCalculateAge(el) {
  return 2016 - el;
}

function newIsFullAge(limit, el) {
  return el >= limit;
}

var newAges = newArrayCalc(newYears, newCalculateAge);
var fullJapan = newArrayCalc(newAges, newIsFullAge.bind(this, 20));
console.log(newAges);
console.log(fullJapan);