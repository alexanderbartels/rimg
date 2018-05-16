# rimg
Rimg is a tool created to make life easier for People how must create (responsive) images for the web. rimg stand for *r*esponsive-*im*a*g*e. 

## Documentation
The documentation can be found inside the `docs`folder. We're using [docsify](https://docsify.js.org/) to generate the [documentation website](https://github.com/alexanderbartels/rimg) that ist hosted via GitHub Pages.

## Build yourself

`npm run build`

Es muss eine gepatchte Variante von `pkg` verwendet werden. Der PR it noch offen... 
Dazu nach jedem npm install `rm -rf node_modules/pkg` ausführen. Im gepatchten pkg Package mittels `npm link` eine eigene Version erzeugen. Nur dadurch werden die Bibliotheken korrekt mit in das Binary gepackt.

## Testing 
TODO: for every command or Backend should be an automated test. But currently no tests are there.....


## Releases 
On Every commit or merge to the master Branch the `semantic-release`module will check if release should be created. To take full advantage from the tool, commits shuld be done via `npm run commit`. The command uses the `commitizen` module to generate useful commit messages. These messages are used to generate the GitHub Release. This Build will be triggert via our CircleCI Build Environment.

## Pull Requests 

### Automated Checks
Checks are done via CodeClimate: https://docs.codeclimate.com/docs/github-pull-requests


## Software Design

### Commands 
Ein Kommando kann durch beliebig viele Backends unterstützt werden. Werden mehrere zur Ausführung angegeben, wird pro Datei der Reihe nach geguckt, welches Backend die Datei unterstützt. Nur das erste Backen, dass die Datei unterstützt, prozessiert die Datei letztlich auch.

### Backends
Backends können ein oder mehrere Kommandos unterstützen. 

#### Backend Konfiguration. 
use env variables? 







