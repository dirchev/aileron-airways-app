# Aileron Airways Timeline Appication

This project is a client applications for the Aileron Airways Timeline API.

## Requirements

In order to develop/run this project, you will need. [NodeJS](https://nodejs.org) version `v8.9.1`. [nvm](https://github.com/creationix/nvm) can be used in order to install node and npm

## How to Install

For the installation of the project follow these steps:

1. Clone the repository locally

```bash
git clone https://github.com/dirchev/aileron-airways-app
```

2. Enter project directory

On Linux

```bash
cd aileron airways-app
```

3. Install dependencies

```bash
npm install
```

## Running

In order to run the application in development mode, execute:

```bash
npm start
```

## Testing

In order to run project's tests, you will need to install it first, then:

* Run all tests

```bash
npm run test
```

* Run all tests with coverage report (TBD)

```bash
npm run coverage
```

## Deploying

### Install heroku

1. Install `heroku-cli` to your computer. More info on that [here](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

2. Log in to your heroku account [more info here](https://devcenter.heroku.com/articles/heroku-cli#getting-started)

   ```
   heroku login
   ```

3. Set heroku as git remote in your project

   ```
   # in the application root folder
   heroku git:remote -a aileron-airways-app
   ```

### Deploy master to heroku

1. Go to master branch and pull

```
git checkout master
git pull origin master
```

2. Sync master with heroku remote

```
git push heroku master
```

3. Done!
