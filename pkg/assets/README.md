About Movie Db Viewer
-------------------------------------------------------------------------

icon Movie Db Assistant
GPLv3 license
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="65" height="18" role="img" aria-label=".NET 8"><title>.NET 8</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".1" stop-color="#aaa" stop-opacity=".1"/><stop offset=".9" stop-color="#000" stop-opacity=".3"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient><clipPath id="r"><rect width="65" height="18" rx="4" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="0" height="18" fill="#555"/><rect x="0" width="65" height="18" fill="#307639"/><rect width="65" height="18" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><image x="5" y="2" width="14" height="14" xlink:href="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJ3aGl0ZXNtb2tlIiByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+Lk5FVDwvdGl0bGU+PHBhdGggZD0iTTI0IDguNzdoLTIuNDY4djcuNTY1aC0xLjQyNVY4Ljc3aC0yLjQ2MlY3LjUzSDI0em0tNi44NTIgNy41NjVoLTQuODIxVjcuNTNoNC42M3YxLjI0aC0zLjIwNXYyLjQ5NGgyLjk1M3YxLjIzNGgtMi45NTN2Mi42MDRoMy4zOTZ6bS02LjcwOCAwSDguODgyTDQuNzggOS44NjNhMi44OTYgMi44OTYgMCAwIDEtLjI1OC0uNTFoLS4wMzZjLjAzMi4xODkuMDQ4LjU5Mi4wNDggMS4yMXY1Ljc3MkgzLjE1N1Y3LjUzaDEuNjU5bDMuOTY1IDYuMzJjLjE2Ny4yNjEuMjc1LjQ0Mi4zMjMuNTRoLjAyNGMtLjA0LS4yMzMtLjA2LS42MjktLjA2LTEuMTg1VjcuNTI5aDEuMzcyem0tOC43MDMtLjY5M2EuODY4LjgyOSAwIDAgMS0uODY5LjgyOS44NjguODI5IDAgMCAxLS44NjgtLjgzLjg2OC44MjkgMCAwIDEgLjg2OC0uODI4Ljg2OC44MjkgMCAwIDEgLjg2OS44MjlaIi8+PC9zdmc+"/><text aria-hidden="true" x="415" y="140" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="370">.NET 8</text><text x="415" y="130" transform="scale(.1)" fill="#fff" textLength="370">.NET 8</text></g></svg>

csharp
javascript
json
html5 css3
linux windows osx
🚧 under construction 🚧 ⚡beta release available! ⚡

Generates Movie catalogs documents (HTML, stand alone ZIP,...) from a list of movies titles using Web Crawlers and a templating system.
Can scrap data from IMDb






















flow chart
User & Developer manual: manual.md


html movie catalog in browser: movie list

html movie catalog in browser: movie list

html movie catalog in browser: movie details

html movie catalog in browser: movie details

Install
👉 download last release: 1.0.0-beta (Inno Setup) for Windows 10 x64 >= 10.0.22621.0

Inno Setup

Run
This application run as a tray icon

➡️ run from the Windows Start Menu: Movie Db Assistant


tray icon

tray icon

tray menu

tray menu

Build
optional steps if you wish to build the app from source

System Tray application for windows™ 10.0.22621.0 and above
Available on Windows 10.0.22621.0 and more

The project has currently no GUI for OSX and Linux systems, even if the app core is multi plateform.

Build & Run from source
➡️ build MovieDbAssistant.app and run 🗔 MovieDbAssistant.exe

➡️ select an action from the tray menu

👉 consult the manual here : manual.md

Build an application appx package
You can build an appx app from the command line:

➡️ folder /package in repo root contains scripts (that must be adapted to your needs) that helps to build an msix application package:

make.ps1: prepare a package
maje-cert.ps1: create a certificate and sign a package
Projects & Dependencies
App : Tray Icon GUI for Windows™

SDK: Microsoft.NET.Sdk (Microsoft.NETCore.App)
framework net8.0-windows10.0.22621.0 (Microsoft.Windows.Desktop.App.WindowsForms)
OS: Windows 10.0.22621.0 and +
windows
App.Core : application core (🚧coming soon🚧)

SDK: Microsoft.NET.Sdk (Microsoft.NETCore.App)
OS: linux windows osx
Dmn : app domain

SDK: Microsoft.NET.Sdk (Microsoft.NETCore.App)
MovieDbSpiders: /MovieDbScraper/blob/master/README.md
NewtonSoft.Json: https://github.com/JamesNK/Newtonsoft.Json
OS: linux windows osx
Lib : library (infrastructure)

SDK: Microsoft.NET.Sdk (Microsoft.NETCore.App)
OS: linux windows osx
Credits
Movie theater icons created by Freepik - Flaticon
Backward icons created by Md Tanvirul Haque - Flaticon
House-agent icons created by Ihdizein - Flaticon
Back icon by Icons8
Play icon by Icons8
Download icon by Icons8
Settings icon by Icons8
Close Window icon by Icons8
Circular Arrows icon by Icons8
Spinner icon by Icons8
Releases History
2024/04/11 - 1.0.0 - initial version

functionalities:

build html movie catalogs documents from:
use MovieDbSpiders json output
direct scrap from queries given in files (several formats are supported)
multi format queries
direct scrap from a query given in last text clipboard entry
html catalog templates
html catalog resources : backgrounds, fonts, css, js template engine
Windows setup for System Tray GUI
Inno Setup
Windows™.msix/.appx