;{- Code Header
; ==- Basic Info -================================
;         Name: FCGI-Staticresponder.pb
;      Version: 0.0.1
;       Author: Herwin Bozet
;  Create date: 10 October 2025, 10:16:22
;
;  Description: ???
;
; ==- Compatibility -=============================
;  Compiler version: PureBasic 5.62-5.70 (x86/x64)
;  Operating system: Windows (Other platforms untested)
;
; ==- Links & License -===========================
;   Github: https://github.com/aziascreations/PB-Utils
;     Doc.: https://github.com/aziascreations/PB-Utils/Documentation/Strings
;  License: Public Domain
;
;}


;- Compiler Options
;{

; The following line is only use to see if it works with it and for debugging
;EnableExplicit

XIncludeFile "./Core-Pages.pbi"
XIncludeFile "./Core-Brands.pbi"

; Forces each pages to be read from disk when needed instead of being preloaded.
; Only enable during development !
#NP_FGCI_DisablePreloading = #True

;}


;- Constants
;{

#NP_FCGI_ServerPort_Variable$ = "NP_FCGI_SERVER_PORT"
#NP_FCGI_BrandsFile_Variable$ = "NP_FCGI_BRANDS_FILE"
#NP_FCGI_PagesFile_Variable$ = "NP_FCGI_PAGES_FILE"
#NP_FCGI_PagesRoot_Variable$ = "NP_FCGI_PAGES_ROOT"

;}


;- Main program
;{

;-> Procedures
Procedure PrintHelp()
	CompilerIf #PB_Compiler_OS = #PB_OS_Windows
		PrintN("NPFCGISR.EXE [/Help] </Port=<1-65535>> </BrandsDef=<PATH>> </PagesDef=<PATH>> </PagesRoot=<PATH>>")
	CompilerElse
		PrintN("NPFCGISR [/Help] </Port=<1-65535>> </BrandsDef=<PATH>> </PagesDef=<PATH>> </PagesRoot=<PATH>>")
	CompilerEndIf
	PrintN("")
	PrintN("Options:")
	PrintN("  /Help              Shows this help text.")
	PrintN("  /Port=<1-65535>    Sets the FCGI port.")
	PrintN("  /BrandsDef=<PATH>  Indicates the brands definition file location.")
	PrintN("  /PagesDef=<PATH>   Indicates the pages definition file location.")
	PrintN("  /PagesRoot=<PATH>  Indicates the directory that contains the pre-rendered HTML files.")
	PrintN("")
	PrintN("Environment variables:")
	PrintN("  " + #NP_FCGI_ServerPort_Variable$ + "  Sets the FCGI port")
	PrintN("  " + #NP_FCGI_BrandsFile_Variable$ + "  Indicates the brands definition file location")
	PrintN("  " + #NP_FCGI_PagesFile_Variable$ + "   Indicates the pages definition file location")
	PrintN("  " + #NP_FCGI_PagesRoot_Variable$ + "   Indicates the directory that contains the pre-rendered HTML files.")
EndProcedure


;-> Setup

;-> Setup > Basic setup
If Not OpenConsole()
	End 1
EndIf

Define RawServerPort$ = #Null$
Define ServerPort.w = 0

Define BrandsFilePath$ = #Null$
Define PagesFilePath$ = #Null$
Define PagesRootFolder$ = #Null$

NewList BrandsData.Brand()
NewMap BrandIdToDefinitionMapping.Brand()

NewList PagesData.Page()
NewMap PagesPathToDefinitionMapping.Page()

NewMap PagesRenders.s()


;-> Setup > Reading CLI arguments
;{
Define iLaunchArg.i = 0
For iLaunchArg = 0 To CountProgramParameters()
	Define LaunchArg$ = ProgramParameter(iLaunchArg)
	
	;Debug LaunchArg$
	
	If UCase(LaunchArg$) = "/Help"
		PrintHelp()
		End 0
		
	ElseIf FindString(LaunchArg$, "/Port", 1, #PB_String_NoCase) = 1 And FindString(LaunchArg$, "=", 1) <> 0
		RawServerPort$ = StringField(LaunchArg$, 2, "=")
		
	ElseIf FindString(LaunchArg$, "/BrandsDef", 1, #PB_String_NoCase) = 1 And FindString(LaunchArg$, "=", 1) <> 0
		BrandsFilePath$ = StringField(LaunchArg$, 2, "=")
		
	ElseIf FindString(LaunchArg$, "/PagesDef", 1, #PB_String_NoCase) = 1 And FindString(LaunchArg$, "=", 1) <> 0
		PagesFilePath$ = StringField(LaunchArg$, 2, "=")
		
	ElseIf FindString(LaunchArg$, "/PagesRoot", 1, #PB_String_NoCase) = 1 And FindString(LaunchArg$, "=", 1) <> 0
		PagesRootFolder$ = StringField(LaunchArg$, 2, "=")
		
	EndIf
Next
;}

;-> Setup > Reading environment variables
;{
If RawServerPort$ = #Null$
	RawServerPort$ = GetEnvironmentVariable(#NP_FCGI_ServerPort_Variable$)
EndIf
If BrandsFilePath$ = #Null$
	BrandsFilePath$ = GetEnvironmentVariable(#NP_FCGI_BrandsFile_Variable$)
EndIf
If PagesFilePath$ = #Null$
	PagesFilePath$ = GetEnvironmentVariable(#NP_FCGI_PagesFile_Variable$)
EndIf
If PagesRootFolder$ = #Null$
	PagesRootFolder$ = GetEnvironmentVariable(#NP_FCGI_PagesRoot_Variable$)
EndIf
;}

;-> Setup > Checking launch parameters
;{
If RawServerPort$ = #Null$
	Debug "No server port given !"
	ConsoleError("Please indicate the server port via the '" + #NP_FCGI_ServerPort_Variable$ + "' environment variable, or the '/Port' option !")
	PrintHelp()
	End 10
EndIf
If BrandsFilePath$ = #Null$
	Debug "No brands definition file given !"
	ConsoleError("Please indicate brands definition file via the '" + #NP_FCGI_BrandsFile_Variable$ + "' environment variable, or the '/BrandsDef' option !")
	PrintHelp()
	End 11
EndIf
If PagesFilePath$ = #Null$
	Debug "No pages definition file given !"
	ConsoleError("Please indicate the pages definition file via the '" + #NP_FCGI_PagesFile_Variable$ + "' environment variable, or the '/PagesDef' option !")
	PrintHelp()
	End 11
EndIf
If PagesRootFolder$ = #Null$
	Debug "No page render folder given !"
	ConsoleError("Please indicate the page render folder via the '" + #NP_FCGI_PagesRoot_Variable$ + "' environment variable, or the '/PagesRoot' option !")
	PrintHelp()
	End 11
EndIf

ServerPort = Val(RawServerPort$)
If Str(ServerPort) <> RawServerPort$
	Debug "Unparsable port number"
	ConsoleError("Unable to properly parse the port number !")
	PrintHelp()
	End 20	
EndIf
If ServerPort = 0
	Debug "Invalid port given ! (" + ServerPort + ")"
	ConsoleError("Invalid port number !")
	PrintHelp()
	End 21	
EndIf

If FileSize(BrandsFilePath$) < 0
	Debug "Brands file not found ! (" + BrandsFilePath$ + ")"
	ConsoleError("Invalid brands file path !")
	PrintHelp()
	End 22
EndIf
If FileSize(PagesFilePath$) < 0
	Debug "Pages file not found ! (" + PagesFilePath$ + ")"
	ConsoleError("Invalid pages file path !")
	PrintHelp()
	End 23
EndIf
If FileSize(PagesRootFolder$) <> -2
	Debug "Renders folder not found ! (" + PagesRootFolder$ + ")"
	ConsoleError("Invalid data root directory !")
	PrintHelp()
	End 24
EndIf
;}

;-> Setup > CGI and FCGI setup
If Not InitCGI()
	ConsoleError("Unable to initialize CGI !")
	End 2
EndIf

If Not InitFastCGI(ServerPort)
	ConsoleError("Unable to open FastCGI on port " + Str(ServerPort) + " !")
	End 3
EndIf

PrintN("Started FastCGI on port " + Str(ServerPort) + " !")


;-> Loading external data
PrintN("> Loading brands definitions...")
LoadBrandsFileIntoList(BrandsFilePath$, BrandsData(), #True)
ForEach BrandsData()
	AddMapElement(BrandIdToDefinitionMapping(), BrandsData()\Id$)
	BrandIdToDefinitionMapping() = BrandsData()
Next

PrintN("> Loading pages definitions...")
LoadPagesFileIntoList(PagesFilePath$, PagesData(), #True)
ForEach PagesData()
	ForEach PagesData()\ServedPaths()
		AddMapElement(PagesPathToDefinitionMapping(), PagesData()\ServedPaths())
		PagesPathToDefinitionMapping() = PagesData()
	Next
Next

PrintN("> Loading pages renders...")
If ExamineDirectory(0, PagesRootFolder$, "*.html")
	While NextDirectoryEntry(0)
		If DirectoryEntryType(0) = #PB_DirectoryEntry_File
			If ReadFile(0, PagesRootFolder$ + "/" + DirectoryEntryName(0), #PB_UTF8)
				AddMapElement(PagesRenders(), ReplaceString(DirectoryEntryName(0), ".html", ""))
				PagesRenders() = ReadString(0, #PB_UTF8 | #PB_File_IgnoreEOL)
				CloseFile(0)
			Else
				ConsoleError("-> Failed to open '" + PagesRootFolder$ + "/" + DirectoryEntryName(0) + "' !")
			EndIf
		EndIf
	Wend
	FinishDirectory(0)
Else
	End 30
EndIf


;-> Main loop

Procedure WriteCGIConstant(Constant$)
	WriteCGIString(Constant$ + ": " + CGIVariable(Constant$)+"<br>")
EndProcedure

PrintN("Entering main loop and witing for connections...")
While WaitFastCGIRequest()
	Debug "START"
	
	If ReadCGI()
		;StartProfiler()
		
		; Validating HTTP method
		Define RequestMethod$ = Left(UCase(CGIVariable("REQUEST_METHOD")), 10)
		Debug "> RequestMethod$: " + RequestMethod$
		If RequestMethod$ <> "GET" And RequestMethod$ <> "HEAD"
			WriteCGIHeader(#PB_CGI_HeaderStatus, "405", #PB_UTF8 | #PB_CGI_LastHeader)
			FinishFastCGIRequest()
			Debug "END - 405 - Method not allowed"
			Continue
		EndIf
		
		
		; Checking path
		; Also selects the proper page definition in `PagesPathToDefinitionMapping()`
		Define RequestPath$ = Left(CGIVariable("REQUEST_PATH"), 256)
		Debug "> RequestPath$: " + RequestPath$
		If FindMapElement(PagesPathToDefinitionMapping(), RequestPath$) = 0
			WriteCGIHeader(#PB_CGI_HeaderStatus, "404", #PB_UTF8 | #PB_CGI_LastHeader)
			FinishFastCGIRequest()
			Debug "END - 404 - Page definition not found"
			Continue
		EndIf
		
		; TODO: Lang in url breaks check above, if not in list of urls !
		
		; Determining the user language
		; Could be optimized, especially with more languages, but I couldn't be bothered to right now...
		Define UserLang$ = "en"
		Define UserLangType$ = "impl"  ; Can be 'impl' or 'expl'
		Define UriPossibleLangPart$ = StringField(Left(CGIVariable("REQUEST_PATH"), 8), 2, "/")
		If UriPossibleLangPart$ = "fr"
			UserLang$ = "fr"
			UserLangType$ = "expl"
		ElseIf UriPossibleLangPart$ = "en"
			; Already set as this value
			UserLang$ = "en"
			UserLangType$ = "expl"
		Else
			Define HeaderAcceptLanguage$ = Left(CGIVariable("HTTP_ACCEPT_LANGUAGE"), 256)
			Debug "> HeaderAcceptLanguage$: " + HeaderAcceptLanguage$
			
			Define LangPrefFrench.f = 0.0
			Define LangPrefEnglish.f = 0.0
			
			Define iHeaderLangPart = 1
			Define HeaderLangCount = CountString(HeaderAcceptLanguage$, ",")
			For iHeaderLangPart = 1 To HeaderLangCount + 1
				Define HeaderLangPart$ = StringField(HeaderAcceptLanguage$, iHeaderLangPart, ",")
				
				Debug "-> " + StringField(HeaderAcceptLanguage$, iHeaderLangPart, ",")
				If CountString(HeaderLangPart$, ";q=") = 1
					Define HeaderLangPartLangKey$ = StringField(StringField(HeaderLangPart$, 1, ";q="), 1, "-")
					Define HeaderLangPartLangValue.f = ValF(StringField(HeaderLangPart$, 2, ";q="))
					
					If HeaderLangPartLangKey$ = "fr"
						If HeaderLangPartLangValue > LangPrefFrench
							LangPrefFrench = HeaderLangPartLangValue
						EndIf
					ElseIf HeaderLangPartLangKey$ = "en"
						If HeaderLangPartLangValue > LangPrefEnglish
							LangPrefEnglish = HeaderLangPartLangValue
						EndIf
					EndIf
				EndIf
			Next
			
			If LangPrefFrench > LangPrefEnglish
				UserLang$ = "fr"
			Else
				; Already set as this value
				UserLang$ = "en"
			EndIf
		EndIf
		Debug "> UserLang$: " + UserLang$
		
		
		; Reading URL parameters
		; Will break if given parameters without values, it only affects the user tho...
		Define RequestUri$ = Left(CGIVariable(#PB_CGI_RequestURI), 256)
		Debug "> RequestUri$: " + RequestUri$
		
		Define RequestParamStandalone$ = URLDecoder(GetURLPart(RequestUri$, "standalone"), #PB_UTF8)
		Define RequestParamBrandCode$ = URLDecoder(GetURLPart(RequestUri$, "brandcode"), #PB_UTF8)
		Debug "-> RequestParamStandalone$: " + RequestParamStandalone$
		Debug "-> RequestParamBrandCode$: " + RequestParamBrandCode$
		
		Define BrandId$ = "base"
		
		If PagesPathToDefinitionMapping()\Standalone
			If RequestParamStandalone$ <> #Null$
				
				If PagesPathToDefinitionMapping()\Brandable
					If RequestParamBrandCode$ <> #Null$
						Define IsBrandValid.b = #False
						Define BrandCodeId$ = StringField(RequestParamBrandCode$, 1, "_")
						Define BrandCodeKey$ = StringField(RequestParamBrandCode$, 2, "_")
						Debug "--> BrandCodeId$: " + BrandCodeId$
						Debug "--> BrandCodeKey$: " + BrandCodeKey$
						
						If BrandCodeId$ <> #Null$ And BrandCodeKey$ <> #Null$
							Debug "---> Both non-empty"
							
							If FindMapElement(BrandIdToDefinitionMapping(), BrandCodeId$) <> 0
								Debug "---> Found '" + BrandIdToDefinitionMapping()\Id$ + "'"
								
								If BrandCodeKey$ = BrandIdToDefinitionMapping()\Key$
									BrandId$ = BrandIdToDefinitionMapping()\Id$
									IsBrandValid = #True
								EndIf
							EndIf
						EndIf
						
						If Not IsBrandValid
							WriteCGIHeader(#PB_CGI_HeaderStatus, "404", #PB_UTF8 | #PB_CGI_LastHeader)
							FinishFastCGIRequest()
							Debug "END - 404 - Brand is invalid"
							Continue
						EndIf
					Else
						; Personal brand is used for standalone pages
						BrandId$ = "nibblepoker"
					EndIf
				Else
					; Personal brand is used for standalone pages
					BrandId$ = "nibblepoker"
				EndIf
				
			EndIf
		EndIf
	
		
		; Determining TLD
		Define RequestedHost$ = Left(CGIVariable("HTTP_HOST"), 64)
		Debug "RequestedHost$: " + RequestedHost$
		
		Define RequestTld$ = "lu"
		If CountString(RequestedHost$, ".") >= 1
			RequestTld$ = LCase(StringField(RequestedHost$, CountString(RequestedHost$, ".") + 1, "."))
			If RequestTld$ <> "lu" And RequestTld$ <> "com"
				RequestTld$ = "lu"
			EndIf
		EndIf
		Debug "RequestTld$: " + RequestTld$
		
		
		; Assembling final page ID and returning it
		Define PageId$ = RequestTld$ + "." +
		                 PagesPathToDefinitionMapping()\Id$ + "." +
		                 BrandId$ + "." +
		                 UserLangType$ + "." +
		                 UserLang$
		Debug "PageId$: " + PageId$
		
		CompilerIf #NP_FGCI_DisablePreloading
			If FileSize(PagesRootFolder$ + "\" + PageId$ + ".html") >= 0
				WriteCGIHeader(#PB_CGI_HeaderContentType, "text/html", #PB_UTF8)
				WriteCGIHeader("PageId", PageId$, #PB_UTF8 | #PB_CGI_LastHeader)
				
				WriteCGIFile(PagesRootFolder$ + "\" + PageId$ + ".html")
			Else
				WriteCGIHeader(#PB_CGI_HeaderStatus, "404", #PB_UTF8 | #PB_CGI_LastHeader)
				FinishFastCGIRequest()
				Debug "END - 404 - Page definition not found"
				
				Continue
			EndIf
		CompilerElse
			
			If FindMapElement(PagesRenders(), PageId$)
				WriteCGIHeader(#PB_CGI_HeaderContentType, "text/html", #PB_UTF8)
				WriteCGIHeader("PageId", PageId$, #PB_UTF8 | #PB_CGI_LastHeader)
			Else
				WriteCGIHeader(#PB_CGI_HeaderStatus, "404", #PB_UTF8 | #PB_CGI_LastHeader)
				FinishFastCGIRequest()
				Debug "END - 404 - Page definition not found"
				Continue
			EndIf
		CompilerEndIf
		
	EndIf
	
	Debug "END"
Wend

;}
