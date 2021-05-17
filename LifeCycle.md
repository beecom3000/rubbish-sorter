https://docs.aurelia.io/getting-started/components/component-lifecycles

binding 
bound
attaching
attached

detaching
unbinding

# The component life-cycle

In Aurelia each component goes through an event life-cycle where a series of callback functions are
called at different times depending on what is happening. This applies to not only Aurelia’s internal
classes, but any component that you create such as a custom element or even just a generic viewmodel goes through this process.

## constructor(...injectables)

The class constructor for your view-model. This is where you tell your view-model about any
injected dependencies. The injected dependencies are parameters on your constructor function.
Technically this is not an Aurelia method, a constructor is a native method for every class.
created
This method is called immediately after both the view and view-model has been created. We
get access to the controller, the parent container, the component definition and the component
parts.

## binding

This method if defined is called after your component bindable properties have been assigned.
You can return a promise from this method to load data or anything else you might need inside
of your components.

## attaching
This is a lifecycle method that is called when the HTML has been attached. This is where you
can initialize 3rd party libraries.

## attached
This method will be called when the current component and its children have been attached. If
you need to work with the DOM, this is where you would run your code. For example, jQuery
or any other library that requires interacting with the HTML itself.

## detaching

This is where you will destroy any 3rd party libraries you have instantiated and cleared up
anything you have created.


Really when it comes down to a real world application, you will find yourself working with only
a few of the above mentioned callback life-cycle hook methods. However, it is convenient to know
when each function is called and what order they are called in.
