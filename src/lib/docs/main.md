## docs for Saffron Premium Eats website

### Types of objects
An object is a category, product etc..., there are a couple of different objects with parents

The first object is the `category` object, this is simply a category of packages, this object has no parent

The second type of object is a `Package`, each package has a parent category, for example `classic lunch` is a package and has `lunch` category as a parent

The third object is an Item, which has a package as a parent, for example `Main dish` is a porduct and has `classic lunch` package as a parent

The fourth type of object is a `product` this has a item (or multiple items) as a parent, for example `chicken cutlets`, is a product and has `main dish` item for a parent

> products can also have a `product category` for a parent, more on this later

The fifth and final object type is an option, this is like variants of products, for example `BBQ cutlets`, and `Garlic cutlets`, are both options of `Chicken cutlets`, each product should have a price and each option can be separately priced

Prducts have a field called list as product, this should be checked if you want to display this product in the products section (for now this is only available on tablets), if checked you also need to specify a porduct category, this is unrelated to the package categories discussed earlier

> Every product you add (and has `list as porduct` checked) will be listed on the tablets, so if for example you add `water bottles` as a porduct in two packages this will show up twice, there are two ways to get around this, the first one is to only check `list as product` on one of those two, the second one is to only create the product once and add it to both paclages, more on this in the `creating packages` section of this guide