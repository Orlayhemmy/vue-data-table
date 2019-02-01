# data-table
[https://vue-data-table.herokuapp.com](https://vue-data-table.herokuapp.com)
This is a web application that displays data on table and also provides the functionalities like filtering, sorting and also editing of the data on the table.
## Project setup
```
- Clone the repo
- Run npm install
```
### Approach and Deployment
The data-table built using Vue and Firebase as its database so as to provide real time communication. The data-table comprise of 2 components which are 
a re-usable table and modal. Data is fetched from the firebase DB and tabulated based off the fields in the data object. It allows data to be sortable if the 
table header have attritube of `sortable` to be true. The modal is a reusable component which holds filter content for the table. The filter allows the data 
in the firebase DB to be fetched based off the filter criteria submitted by the user.
The data-table is deployed to heroku using the heroku cli. It deploys the app based off the master branch.

#### How long did you spend on the test
I spent 3days working on the project. I would add a loading spinner while the data is being fetched from the DB. I would also paginate the data gotten from the DB 
so as to prevent the user from scrolling a long way down and improve the user experience.

#### In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required
I would add a pagination component
I would add a spinner
I would also make the sort functionality robust
I would add a search to enable admin search for specific users

#### What is your favourite JavaScript feature? Why?
I love writing concise and simple code, hence I wouldn’t say I have a favourite javascript feature but I love some features that make writing of code less 
stressful like the Extended parameter handling I.e. the spread operator and default parameter values, Property shorthand, object destructuring. 
Array methods and tons of others

#### What is your favourite CSS feature? Why?
CSS grid became my favourite when I first used it. it makes html code more tidy because it saves me the stress of nesting divs

#### What is your favourite third party Vue feature? Why?
I don’t have a favourite third party due library.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
