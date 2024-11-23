#----------------------------------------------------------------- 
# Movie Db Viewer
# NullSoft install script
#----------------------------------------------------------------- 

!include MUI2.nsh

#----------------- properties ------------------------------------------------ 

!define APPNAME "Movie Db Viewer"
!define APPEXE "Electron Test App.exe"
!define UNINSTALLEXE "uninstall.exe"
!define BMPFILE "assets\\moviedbviewersnap1.bmp"
!define ICONFILE "assets\\movie.ico"
!define ICONFILEINST "movie.ico"
!define LICENSEFILE "assets\\license.rtf"
!define COMPANYNAME "Franck Gaspoz Software"
!define DESCRIPTION "Display && browse movie catalogs"

!define VERSIONMAJOR 1
!define VERSIONMINOR 0
!define VERSIONBUILD 0
!define APPVER "${VERSIONMAJOR}.${VERSIONMINOR}.${VERSIONBUILD}"

# These will be displayed by the "Click here for support information" link in "Add/Remove Programs"
# It is possible to use "mailto:" links in here to open the email client
!define HELPURL "https://github.com/franck-gaspoz/MovieDbAssistant/blob/main/README.md" ; "Support Information" link
!define UPDATEURL "https://github.com/franck-gaspoz/MovieDbAssistant/blob/main/README.md" ; "Product Updates" link
!define ABOUTURL "hhttps://github.com/franck-gaspoz/MovieDbAssistant/blob/main/README.md" ; "Publisher" link

# files from package (out/)
!define PKG "../out/Electron Test App-win32-x64"
# This is the size (in kB) of all the files copied into "Program Files"
!define INSTALLSIZE 281411

!define ACCOUNTTYPE admin

RequestExecutionLevel "${ACCOUNTTYPE}" ;Require admin rights on NT6+ (When UAC is turned on) - user for speed test (no prompt)
 
InstallDir "$PROGRAMFILES64\\${APPNAME}"
 
# rtf or txt file - remember if it is txt, it must be in the DOS text format (\r\n)
LicenseData "${LICENSEFILE}"
# This will be in the installer/uninstaller's title bar
Name "${APPNAME}"
Icon "${ICONFILE}"
outFile "${APPNAME}-${APPVER}.exe"

#----------------- interface settings ------------------------------------------------ 

!define MUI_PAGE_HEADER_TEXT "${APPNAME} ${APPVER}"
!define MUI_PAGE_HEADER_SUBTEXT "${DESCRIPTION}"

!define MUI_BRANDING_TEXT "${COMPANYNAME} ${APPNAME} ${APPVER}"

!define MUI_WELCOMEPAGE_TEXT "Welcome to the setup program of ${APPNAME} ${APPVER}.$\n$\nThe Setup Assistant will guide you through the complete setup and configuration of ${APPNAME} version ${APPVER}.$\n$\nClick the button 'Next' to begin the installation. Click on the button 'Cancel' to abort the installation and close the setup assistant"
!define MUI_WELCOMEPAGE_TITLE "${APPNAME} ${APPVER}$\n${DESCRIPTION}"
#!define MUI_WELCOMEPAGE_TITLE_3LINES "${DESCRIPTION}"
!define MUI_WELCOMEFINISHPAGE_BITMAP "${BMPFILE}"
!define MUI_UNWELCOMEFINISHPAGE_BITMAP "${BMPFILE}"

#!define MUI_LICENSEPAGE_TEXT_TOP "${APPNAME} ${APPVER}"
#!define MUI_LICENSEPAGE_TEXT_BOTTOM "bottom text test"

#!define MUI_HEADERIMAGE_BITMAP_STRETCH NoStretchNoCropNoAlign
#!define MUI_HEADERIMAGE_UNBITMAP_STRETCH NoStretchNoCropNoAlign
#!define MUI_WELCOMEFINISHPAGE_BITMAP_STRETCH NoStretchNoCropNoAlign

!define MUI_HEADERIMAGE_BITMAP "${ICONFILE}"
!define MUI_HEADERIMAGE_UNBITMAP "${ICONFILE}"
!define MUI_ICON "${ICONFILE}"
!define MUI_UNICON "${ICONFILE}"

!define MUI_TEXTCOLOR EEEEEE
!define MUI_HEADERIMAGE_RIGHT
!define MUI_HEADER_TRANSPARENT_TEXT
!define MUI_BGCOLOR 111122

# the old style gradiant behind setup window
#BGGradient
AutoCloseWindow true
BrandingText " "
Caption "${APPNAME} ${APPVER} Setup"
InstallColors EEEEEE 000000 #no effect

!include LogicLib.nsh

#----------------- pages ------------------------------------------------------------------- 

#page license
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_LICENSE "${LICENSEFILE}"
#!insertmacro MUI_PAGE_COMPONENTS
#page directory
!insertmacro MUI_PAGE_DIRECTORY
#Var StartMenuFolder
#!insertmacro MUI_PAGE_STARTMENU "Application" $StartMenuFolder
#Page instfiles
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_LANGUAGE "English"

#----------------- code install / uninstall ------------------------------------------------ 

!macro VerifyUserIsAdmin
UserInfo::GetAccountType
pop $0
${If} $0 != "${ACCOUNTTYPE}" ;Require admin rights on NT4+
        messageBox mb_iconstop "Administrator rights required!"
        setErrorLevel 740 ;ERROR_ELEVATION_REQUIRED
        quit
${EndIf}
!macroend
 
function .onInit
	setShellVarContext all
	!insertmacro VerifyUserIsAdmin
functionEnd
 
section "install"
	# Files for the install directory - to build the installer, these should be in the same directory as the install script (this file)
	setOutPath $INSTDIR
	# Files added here should be removed by the uninstaller (see section "uninstall")
	#file "app.exe"
	#file "logo.ico"

	file "${ICONFILE}"
	#file /r "${PKG}\\*.*" 	; disabled for speed

	# Add any other files for the install directory (license files, app data, etc) here
 
	# Uninstaller - See function un.onInit and section "uninstall" for configuration
	writeUninstaller "$INSTDIR\\${UNINSTALLEXE}"
 
	# Start Menu
	createDirectory "$SMPROGRAMS\\${COMPANYNAME}"
	createShortCut "$SMPROGRAMS\\${COMPANYNAME}\\${APPNAME}.lnk" "$INSTDIR\\${APPEXE}" "" "$INSTDIR\\${ICONFILEINST}"
 
	# Registry information for add/remove programs
	WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${COMPANYNAME} ${APPNAME}" "DisplayName" "${APPNAME} - ${DESCRIPTION}"
	WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${COMPANYNAME} ${APPNAME}" "UninstallString" "$\"$INSTDIR\\${UNINSTALLEXE}$\""
	WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${COMPANYNAME} ${APPNAME}" "QuietUninstallString" "$\"$INSTDIR\\${UNINSTALLEXE}$\" /S"
	WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${COMPANYNAME} ${APPNAME}" "InstallLocation" "$\"$INSTDIR$\""
	WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${COMPANYNAME} ${APPNAME}" "DisplayIcon" "$\"$INSTDIR\\${ICONFILEINST}$\""
	WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${COMPANYNAME} ${APPNAME}" "Publisher" "${COMPANYNAME}"
	WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${COMPANYNAME} ${APPNAME}" "HelpLink" "$\"${HELPURL}$\""
	WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${COMPANYNAME} ${APPNAME}" "URLUpdateInfo" "$\"${UPDATEURL}$\""
	WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${COMPANYNAME} ${APPNAME}" "URLInfoAbout" "$\"${ABOUTURL}$\""
	WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${COMPANYNAME} ${APPNAME}" "DisplayVersion" "${VERSIONMAJOR}.${VERSIONMINOR}.${VERSIONBUILD}"
	WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${COMPANYNAME} ${APPNAME}" "VersionMajor" ${VERSIONMAJOR}
	WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${COMPANYNAME} ${APPNAME}" "VersionMinor" ${VERSIONMINOR}
	# There is no option for modifying or repairing the install
	WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${COMPANYNAME} ${APPNAME}" "NoModify" 0
	WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${COMPANYNAME} ${APPNAME}" "NoRepair" 0
	# Set the INSTALLSIZE constant (!defined at the top of this script) so Add/Remove Programs can accurately report the size
	WriteRegDWORD HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${COMPANYNAME} ${APPNAME}" "EstimatedSize" ${INSTALLSIZE}
sectionEnd
 
# Uninstaller
 
function un.onInit
	SetShellVarContext all
 
	#Verify the uninstaller - last chance to back out
	MessageBox MB_OKCANCEL "Dou you really want to uninstall ${APPNAME} and all its components ?" IDOK next
		Abort
	next:
	!insertmacro VerifyUserIsAdmin
functionEnd
 
section "uninstall"
 
	# Remove Start Menu launcher
	delete "$SMPROGRAMS\\${COMPANYNAME}\\${APPNAME}.lnk"
	# Try to remove the Start Menu folder - this will only happen if it is empty
	rmDir "$SMPROGRAMS\\${COMPANYNAME}"
 
	# Remove files

	delete "$INSTDIR\\${ICONFILEINST}"
 
	# Always delete uninstaller as the last action
	delete "$INSTDIR\\${UNINSTALLEXE}"
 
	# Try to remove the install directory - this will only happen if it is empty
	rmDir $INSTDIR
 
	# Remove uninstaller information from the registry
	DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${COMPANYNAME} ${APPNAME}"
sectionEnd
