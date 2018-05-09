# rimg
Tool to create responsive-images 


## Build

`npm run build`

Es muss eine gepatchte Variante von `pkg` verwendet werden. Der PR it noch offen... 
Dazu nach jedem npm install `rm -rf node_modules/pkg` ausführen. Im gepatchten pkg Package mittels `npm link` eine eigene Version erzeugen. Nur dadurch werden die Bibliotheken korrekt mit in das Binary gepackt.

## Backends
Backends können ein oder mehrere Kommandos unterstützen. 

### Backend Konfiguration. 
use env variables? 


