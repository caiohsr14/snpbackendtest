# snpbackendtest

This is a backend test for an application at Shaw and Partners. The framework of choice was NodeJS.

## Running locally

Assuming you already have NodeJS and npm in your local machine, you can download the dependencies with:
```
$ npm install
```

And run the application (by default on port 3000 and using nodemon), by running:
```
$ npm run start
```

The application now should be available at your localhost with your desired port.

## Running locally using Docker

In order to run using Docker, you will need to first build the image:
```
$ docker build -t snpbackendtest .
```

And then run it in your desired port, in this example I will be using port 3070, either using interactive (-it) or detached (-d) modes:
```
$ docker run -d -p 3070:3000 -v $(pwd):/app snpbackendtest
```

The volume (-v) argument is used so nodemon can still pick up any source code changes and refresh the application.

## Testing

In order to test the application, you can simply run:
```
$ npm test
```
