# Workshop NGRX

If you get stuck during the assignments you can always check out the solution branch to see the solutions.

## Setup

1. Add `@ngrx/store` as a dependency and set it up in your application. To see how check [this](https://github.com/ngrx/platform/blob/master/docs/store/README.md) out. For now just registering the store on your app module is fine.
1. Add the devtools to the project. Install the chrome or firefox redux extension as well. See the [docs](https://github.com/ngrx/platform/blob/master/docs/store-devtools/README.md) to see how.
1. Let's add the first "state" of our application. Let's start with a piece of UI state. Add a loading property to the app state. It will start out as "true" and when our todos are loaded we will set to false. The steps to do so are as follows:
    * Write a reducer function like `appReducer`. It should just have a default case for now.
    * Add it to the `forRoot` declaration of the store. 
    * Define an interface which describes the app state.
    * Give the reducer function initial state with loading false.

If everything went correctly you should see something in the state in the redux tools.

## Getting state from the store

1. Now we have state in our application... We just don't use it yet. Let's change that. In the home component, let's use the store to toggle the loading indicator. To do so you need to do the following:
    * Inject the store in the home component
    * Subscribe to the store and get the loading value
    * Remove the loading interactions in the `getTodos` method

You should see the loading indicator running forever now.

2. This is working, but we can improve. A first improvement we can make is to write a [selector](https://github.com/ngrx/platform/blob/master/docs/store/selectors.md).
    * Write a selector function which returns the `loading` state
    * Use the selector in the home component to avoid traversing the state with dots. There is a special [operator](https://github.com/ngrx/platform/blob/master/docs/store/selectors.md#using-a-selector-with-the-store) called `select` which we can use observable.

You should still see the same result except that we can now use a convenient function to access the loading state.

3. We still have to manually subscribe to the loading state. Angular can help us out here. The second improvement is to use the [`async` pipe](https://angular.io/api/common/AsyncPipe) that angular offers in our template. This way angular can subscribe and unsubscribe for us.
    * Remove the loading subscribe in the home component.
    * Store the observable in a variable like `loading$`
    * In the `home.component.html` use the async pipe to get the loading variable asynchronously

This should still work the same as before but now the boilerplate of subscribing and unsubscribing is mostly gone.

Awesome. We now know how to get state from the store. Remember, we can compose our selectors to give use easy access to any slice of state.

## Mutating state in the store

Our store is working, but now the only thing our application is doing is showing a nice loader. Lets change that.

1. Create a new file which will hold our actions: `app.actions.ts`.
1. In this file create a new enum which will describe our action types.
1. Add the action type: TODOS_LOADED and LOADING_TODOS to the enum.
1. Create new [action creators](https://github.com/ngrx/platform/blob/master/docs/store/actions.md#typed-actions) in the file, It should implement from the ngrx `Action` interface. Do this for both action types.
1. Now switch to the app reducer and add a new case to the switch. Here we add the TODOS_LOADED and LOADING_TODOS cases.
1. We can now mutate the state. In the TODOS_LOADED case create a new state object in which the loading property is false. Use either the spread operator or Object.assign to do so easily. **Never, ever mutate the state directly.**
1. Write another case where we handle the LOADING_TODOS action.
1. In the home component dispatch the loading todos action before making the getTodos request to the service.
1. When the response has been returned dispatch the todos loaded action.

We have now modelled our first app interaction using ngrx. Be sure to check out the awesomeness of the redux devtools at this point. You can now use timetravel to alternate between loading and loaded. This is one of the biggest benefits of using an immutable state.

## Schematics and effects module

Next up we are going to create effects to model our side effects. In this case loading our todo's from the "server". To do so we will also use the schematics module. This will aid us in generating our boilerplate code and it hooks into the angular-cli.

1. Model the todos in our state.
1. Write a selector for the todos and use it in the home component to retrieve the todos.
1. Make the todos property in the home component an observable array of todos and use the async pipe in the template to resolve the todos asynchronously
1. Add the schematics dependency `npm install github:ngrx/schematics-builds --save-dev`
1. Add the schematics info to our `angular-cli.json` file. Add a new key for `cli` and in that object add `"defaultCollection": "@ngrx/schematics"`. We can now use schematics to generate ngrx files.
1. Use the cli to generate our effects root module: `ng generate effect App --root --module app.module.ts --collection @ngrx/schematics`. It generates the effects file and required setup.
1. Add three new actions to our app actions called GetTodos, AddTodo and UpdateTodo.
1. Model getting the todos with an [effect](https://github.com/ngrx/platform/blob/master/docs/effects/README.md#example).
1. In the home component dispatch the GetTodos action instead of subscribing to the todo service in the `getTodos` method.
1. Remove the calls to the todo service for updating and adding todos from the home component.
1. Handle the update and add actions in our new [effect](https://github.com/ngrx/platform/blob/master/docs/effects/README.md#example).
1. The loading action we wrote in the first assignment can now be removed. The loading state should now be set to true in the reducer for the GetTodos, AddTodo and UpdateTodo actions.

## A bit more practice (Todo dialog)

Lets model the next interaction in our application. Opening and closing the todo dialog. We use the dialog to both create new todos and to edit existing todos. This another good example of UI state.

1. Add two new action in the `app.actions.ts` file. One for opening and one for closing the todo dialog.
1. Add the new state to the state interface and initialstate in the reducer. It should have a boolean indicating whether the dialog is open and it should have the dialog data.
1. Go to the `app.reducer.ts` file and add handlers for the open and close action. The open action needs a payload to contain the dialog configuration.
1. Create a new selector for this piece of state.
1. Dispatch the open action in the update and create todo handlers in the home component.
1. When the home component is initialized, setup a listener for when the dialog should open.
1. Also setup a listener for when the dialog should close.
1. Dispatch the close action when the buttons in the dialog are clicked. If the submit button is clicked also pass the dialog data as a payload for the action.

## Bonus stuff for really fast people (no solutions for these)

1. Split up the reducers and make the app more maintainable by splitting it up in features.
1. Also model the snackbar with ngrx.
1. Use the `@ngrx/entities` package to model our todos as entities, simplifying and speeding up entity lookups
1. Model clicking the todos and expanding and closing them
1. Add login to the app, this page should be shown before we can see the home screen. After logging in in the app we should be able to see the home component. Model everything using ngrx and use the `@ngrx/router-store` package to model router events as actions. A good example of this would be the router guard which you should make for the home component.
