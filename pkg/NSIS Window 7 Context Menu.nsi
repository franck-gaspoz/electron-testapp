Name "NSIS Window 7 Context Menu"
OutFile "nsW7Menu.exe"
RequestExecutionLevel admin
 
InstallDir $PROGRAMFILES\NSIS
InstallDirRegKey HKLM Software\NSIS ""
 
; Pages
Page directory
Page instfiles
 
; Sections
Section ""
	WriteRegStr HKCR ".nsi" "" "NSIS.Script"
 
	;menu-name,submenu,icon
	WriteRegStr	HKCR \
			"NSIS.Script\shell\NSIS.W7Menu" \
			"MUIVerb" \
			"NSIS"
	WriteRegStr	HKCR \
			"NSIS.Script\shell\NSIS.W7Menu" \
			"ExtendedSubCommandsKey" \
			"NSIS.Script\W7Menu"
	WriteRegStr	HKCR \
			"NSIS.Script\shell\NSIS.W7Menu" \
			"Icon" \
			"$INSTDIR\makensisw.exe,1" 
	;compile
	WriteRegStr	HKCR \
			"NSIS.Script\W7Menu\shell\compile" \
			"MUIVerb" "Compile NSIS Script"				
	WriteRegStr	HKCR \
			"NSIS.Script\W7Menu\shell\compile\command" \
			"" \
			'"$INSTDIR\makensisw.exe" "%1"' 
	;compile (choose compressor)
	WriteRegStr	HKCR  \
			"NSIS.Script\W7Menu\shell\compile-compressor" \
			"MUIVerb" \
			"Compile NSIS Script (Choose Compressor)"				
	WriteRegStr	HKCR \
			"NSIS.Script\W7Menu\shell\compile-compressor\command" \
			"" \
			'"$INSTDIR\makensisw.exe" /ChooseCompressor "%1"' 
	;repeat for Unicode NSIS
	IfFileExists "$INSTDIR\Unicode\makensisw.exe" 0 End	
 
	;add separator above the next entry
	WriteRegDWORD	HKCR  \
			"NSIS.Script\W7Menu\shell\ucompile"  \
			"CommandFlags" \
			"32" 
	;compile unicode
	WriteRegStr	HKCR \
			"NSIS.Script\W7Menu\shell\ucompile" \
			"MUIVerb" \
			"Compile Unicode NSIS Script"				
	WriteRegStr	HKCR \
			"NSIS.Script\W7Menu\shell\ucompile\command" \
			"" \
			'"$INSTDIR\Unicode\makensisw.exe" "%1"' 
	;compile unicode (choose compressor)
	WriteRegStr	HKCR \
			"NSIS.Script\W7Menu\shell\ucompile-compressor" \
			"MUIVerb" \
			"Compile Unicode NSIS Script (Choose Compressor)"				
	WriteRegStr	HKCR \
			"NSIS.Script\W7Menu\shell\ucompile-compressor\command" \
			"" \
			'"$INSTDIR\Unicode\makensisw.exe" /ChooseCompressor "%1"' 
	End: 
SectionEnd
