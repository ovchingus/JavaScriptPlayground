const foo = function(count, acc, fun) {
  let i = acc;

  i++;
  if (i < count) {
    foo(count, i, fun);
  }

  console.log("called: " + acc);

  if (fun !== undefined && count - 1 === acc) fun();
};

const cb = function() {
  console.log("Happened");
};

foo(5, 0);
console.log("\n");
foo(5, 0, cb);
