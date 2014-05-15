# IS 217 Final Exam

This is the final exam submission for IS 217 at NJIT.

## Testing

All tests are run with `npm test`, which in turn runs mocha. mocha and chai are used for implementing tests.

## Decorator Pattern

The Decorator pattern is not used in this project because it would add a heck of a lot of cruft and complexity to the code base. I assumed taht you would want use use the Decorator pattern to describe the different laptops, which would mean that I would need 7 different classes to support all the different componenets, as listed below:

- Laptop
- 8GBRAMLaptop
- 16GBRAMLaptop
- 11InchScreenLaptop
- 15InchScreenLaptop
- 128GBHDDLaptop
- 256GBHDDLaptop

I can understand that you might want to do this to call a `price` method on the laptop classes, and have it call each wrapped class to calculate the total cost, but the added overhead would have outweighed the gain from doing that. For example, this could be what I would end up having for a laptop:

`256GBHDDLaptop(11InchScreenLaptop(16GBRAMLaptop(Laptop)))`

Okay, so what happens when I want to instead select an 8GB laptop? Well, I'd have to go in and start unpacking all the laptops, checking to see if that class is the one for the previously selected 16GB configuration. If it is, I'd have to swap out the class with a new instance, and then repack everything. The added complexity to support that, in my mind, didn't make sense, which is why I didn't implement it. If that ends up costing me 10 points, so be it. I didn't want to spend the time to implement that and deal with any bugs or issues that may have arisen because of it when I'm already limited on time to complete this.