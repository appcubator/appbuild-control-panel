# Appbuild Control Panel

Appcubator control panel is an application that bridges the app states and the appcubator interfaces.

## Design Goals

* Making it seamless to run the webserver. User doesn't have to know the commandline

* Making the appState file based. This way people can easily copy, transfer or share their appStates over the tools that they are familiar with (e.g. e-mail).

* Diverging from the familiar "folder" concept as least as possible and making it easy to add extra assets. Users can put the project folder at an arbitrary location on their computer and put the images inside the directory. 


## How it works
A project means:

1. A directory `/APPNAME-project`
2. A file called `description.json` in it

The generated code will go into `/APPNAME-project` directory. Extra assets such as images will not be overwritten. This way even if the code is regenerated, the assets and non-appcubator code will stay where it is.

User can:

1. Start a new project: Appbuild Control Panel will create a directory at the give location and create a `description.json` with minimal default parameteres.
2. Import a project: Appbuild Control Panel will let the user import a directory that contains `description.json` in it.


The metadata will be stored in local storage of Appbuild Control Panel with two parameters: `name`, `path`

## How a project works
User can "Launch" or "Test" a project.

**Launch** will open up the appbuild interface with the right appState variable passed to the page. `Save` action on the page will communicate back with the control panel which will update the local file.

**Test** will run the node application on the local server and open up the index page of the generated app.


