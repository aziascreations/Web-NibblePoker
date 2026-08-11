
XIncludeFile "./Strings.pbi"

CompilerIf #PB_Compiler_IsMainFile
	EnableExplicit
CompilerEndIf


Structure Page
	Id$
	OutputBaseName$
	;TemplateName$
	List ServedPaths.s()
	;CanonicalPath$
	Localizable.b
	Standalone.b
	Brandable.b
	;Release.b
	;IFrame.b
EndStructure


Procedure.b LoadPagesFileIntoList(FilePath$, List Pages.Page(), ClearList.b = #True)
	If ClearList
		ClearList(Pages())
	EndIf
	
	; Loading file
	If OpenPreferences(FilePath$, 0, #PB_UTF8) = 0
		Debug "Failed to read preferences file !"
		ProcedureReturn #False
	EndIf
	
	; Parsing data
	ExaminePreferenceGroups()
	While NextPreferenceGroup()
		Define PageId$ = PreferenceGroupName()
		Define PageOutputBaseName$ = ReadPreferenceString("FileBaseName", #Null$)
		Define PageServedPathsRaw$ = ReadPreferenceString("ServedPaths", #Null$)
		Define PageLocalizable.b = ReadPreferenceInteger("Localizable", #False)
		Define PageStandalone.b = ReadPreferenceInteger("Standalone", #False)
		Define PageBrandable.b = ReadPreferenceInteger("Brandable", #False)
		;Define PageIFrameable.b = ReadPreferenceInteger("IFrame", #False)
		
		If PageId$ <> #Null$ And PageOutputBaseName$ <> #Null$ And PageServedPathsRaw$ <> #Null$
			Define Dim ServedPaths.s(0)
			
			SplitArrayToString(ServedPaths(), PageServedPathsRaw$, "|", #True)
			
			If ArraySize(ServedPaths()) = 0 And Len(ServedPaths(0)) = 0
				Debug "Unable to process '" + PageId$ + "' due to missing served paths !"
				FreeArray(ServedPaths())
				Continue
			EndIf
			
			AddElement(Pages())
			Pages()\Id$ = PageId$
			Pages()\OutputBaseName$ = PageOutputBaseName$
			
			Define iServedPath.i = 0
			For iServedPath = 0 To ArraySize(ServedPaths())
				AddElement(Pages()\ServedPaths())
				Pages()\ServedPaths() = ServedPaths(iServedPath)
			Next
			
			Pages()\Localizable = PageLocalizable
			Pages()\Standalone = PageStandalone
			Pages()\Brandable = PageBrandable
			;Pages()\IFrame = PageIFrameable
			
			FreeArray(ServedPaths())
		Else
			Debug "Unable to process '" + PageId$ + "' due to missing data !"
		EndIf
	Wend

	ClosePreferences()
	
	ProcedureReturn #True
EndProcedure


;{
; 
; Procedure ClearPagesList(List Pages.Page())
; 	ForEach Pages()
; 		ClearList(Pages()\ServedPaths())
; 	Next
; 	ClearList(Pages())
; EndProcedure
; 
; Procedure.b LoadPagesFileIntoList(FilePath$, List Pages.Page(), ClearList.b = #True)
; 	If ClearList
; 		ClearPagesList(Pages())
; 	EndIf
; 	
; 	; Loading file
; 	Define PagesFileId = ReadFile(#PB_Any, FilePath$)
; 	If PagesFileId = 0
; 		Debug "Failed to read file !"
; 		ProcedureReturn #False
; 	EndIf
; 	Define RawJson$ = ReadString(PagesFileId, #PB_UTF8 | #PB_File_IgnoreEOL)
; 	CloseFile(PagesFileId)
; 	
; 	; Parsing Json
; 	Define PagesJson = ParseJSON(#PB_Any, RawJson$)
; 	If PagesJson = 0
; 		Debug "Failed to parse JSON: " + JSONErrorMessage()
; 		ProcedureReturn #False
; 	EndIf
; 	
; 	; Get the root object
; 	Define PagesJsonRoot = JSONValue(PagesJson)
; 	
; 	; Loading data into list
; 	ExamineJSONMembers(PagesJsonRoot)
; 	While NextJSONMember(PagesJsonRoot)
; 		Define PageId$ = JSONMemberKey(PagesJsonRoot)
; 		Define PageOutputBaseName$ = #Null$
; 		NewList PageServedPaths.s()
; 		Define PageLocalizable = #False
; 		Define PageStandalone = #False
; 		Define PageBrandable = #False
; 		
; 		Define PageDataJson = JSONMemberValue(PagesJsonRoot)
; 		
; 		If JSONType(PageDataJson) = #PB_JSON_Object
; 			ExamineJSONMembers(PageDataJson)
; 			
; 			While NextJSONMember(PageDataJson)
; 				Define PagePropName$ = JSONMemberKey(PageDataJson)
; 				Define PagePropValue = JSONMemberValue(PageDataJson)
; 				
; 				Select PagePropName$
; 					Case "id"
; 						; Done via the object's key
; 						
; 					Case "output_base_name"
; 						If JSONType(PagePropValue) = #PB_JSON_String
; 							PageOutputBaseName$ = GetJSONString(PagePropValue)
; 						EndIf
; 						
; 					Case "served_paths"
; 						If JSONType(PagePropValue) = #PB_JSON_Array
; 							ExtractJSONList(PagePropValue, PageServedPaths())
; 						EndIf
; 						
; 					Case "localizable"
; 						If JSONType(PagePropValue) = #PB_JSON_Boolean
; 							PageLocalizable = GetJSONBoolean(PagePropValue)
; 						EndIf
; 						
; 					Case "standalone"
; 						If JSONType(PagePropValue) = #PB_JSON_Boolean
; 							PageStandalone = GetJSONBoolean(PagePropValue)
; 						EndIf
; 						
; 					Case "brandable"
; 						If JSONType(PagePropValue) = #PB_JSON_Boolean
; 							PageBrandable = GetJSONBoolean(PagePropValue)
; 						EndIf
; 						
; 				EndSelect
; 			Wend
; 		EndIf
; 		
; 		If PageId$ <> #Null$ And PageOutputBaseName$ <> #Null$ And ListSize(PageServedPaths()) > 0
; 			AddElement(Pages())
; 			Pages()\Id$ = PageId$
; 			Pages()\OutputBaseName$ = PageOutputBaseName$
; 			;CopyList(PageServedPaths(), Pages()\ServedPaths())
; 			Pages()\Localizable = PageLocalizable
; 			Pages()\Standalone = PageStandalone
; 			Pages()\Brandable = PageBrandable
; 			
; 			
; ; 			*NewPage.Page = AllocateStructure(Page)
; ; 			
; ; 			With *NewPage
; ; 			AddElement(Pages())
; ; 			Pages()\Id$ = PageId$
; ; 			Pages()\OutputBaseName$ = PageOutputBaseName$
; ; 			;CopyList(PageServedPaths(), Pages()\ServedPaths())
; ; 			Pages()\Localizable = PageLocalizable
; ; 			Pages()\Standalone = PageStandalone
; ; 			Pages()\Brandable = PageBrandable
; ; 			EndWith
; 			
; 		Else
; 			Debug "Unable to process '" + PageId$ + "' due to missing data !"
; 			
; 		EndIf
; 		ClearList(PageServedPaths())
; 		
; 	Wend
; 	
; 	; Cleaning up
; 	FreeJSON(PagesJson)
; 	
; 	ProcedureReturn #True
; EndProcedure
;}


CompilerIf #PB_Compiler_IsMainFile
	NewList Pages.Page()
	
 	While #True
 		LoadPagesFileIntoList("../data/pages.ini", Pages(), #True)
 	Wend
 	
	ForEach Pages()
		Debug "ID: " + Pages()\Id$
		Debug "OutputBaseName: " + Pages()\OutputBaseName$
		Debug "ServedPaths: " + Pages()\OutputBaseName$
		ForEach Pages()\ServedPaths()
			Debug "  " + Pages()\ServedPaths()
		Next
		Debug "ServedPaths: " + Pages()\OutputBaseName$
		Debug "Localizable: " + Pages()\Localizable
		Debug "Standalone: " + Pages()\Standalone
		Debug "Brandable: " + Pages()\Brandable
		Debug "---"
	Next
	
	ClearList(Pages())
CompilerEndIf
