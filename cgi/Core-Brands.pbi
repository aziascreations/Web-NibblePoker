
CompilerIf #PB_Compiler_IsMainFile
	EnableExplicit
CompilerEndIf

Structure Brand
	Id$
	Name$
	Key$
EndStructure


Procedure.b LoadBrandsFileIntoList(FilePath$, List Brands.Brand(), ClearList.b = #True)
	If ClearList
		ClearList(Brands())
	EndIf
	
	; Loading file
	If OpenPreferences(FilePath$, 0, #PB_UTF8) = 0
		Debug "Failed to read preferences file !"
		ProcedureReturn #False
	EndIf
	
	; Parsing data
	ExaminePreferenceGroups()
	While NextPreferenceGroup()
		Define BrandId$ = PreferenceGroupName()
		Define BrandName$ = ReadPreferenceString("Name", #Null$)
		Define BrandKey$ = ReadPreferenceString("Key", #Null$)
		
		If BrandId$ <> #Null$ And BrandName$ <> #Null$
			AddElement(Brands())
			Brands()\Id$ = BrandId$
			Brands()\Name$ = BrandName$
			
			; Can be #Null$
			Brands()\Key$ = BrandKey$
		Else
			Debug "Unable to process '" + BrandId$ + "' due to missing data !"
		EndIf
	Wend
	
	ClosePreferences()
	
	ProcedureReturn #True
EndProcedure


;{
; 
; Procedure.b LoadBrandsFileIntoList(FilePath$, List Brands.Brand(), ClearList.b = #True)
; 	If ClearList
; 		ClearList(Brands())
; 	EndIf
; 	
; 	; Loading file
; 	Define BrandsFileId = ReadFile(#PB_Any, FilePath$)
; 	If BrandsFileId = 0
; 		Debug "Failed to read file !"
; 		ProcedureReturn #False
; 	EndIf
; 	Define RawJson$ = ReadString(BrandsFileId, #PB_UTF8 | #PB_File_IgnoreEOL)
; 	CloseFile(BrandsFileId)
; 	
; 	; Parsing Json
; 	Define BrandsJson = ParseJSON(#PB_Any, RawJson$)
; 	If BrandsJson = 0
; 		Debug "Failed to parse JSON: " + JSONErrorMessage()
; 		ProcedureReturn #False
; 	EndIf
; 	
; 	; Get the root object
; 	Define BrandsJsonRoot = JSONValue(BrandsJson)
; 	
; 	; Loading data into list
; 	ExamineJSONMembers(BrandsJsonRoot)
; 	While NextJSONMember(BrandsJsonRoot)
; 		Define BrandId$ = JSONMemberKey(BrandsJsonRoot)
; 		Define BrandName$ = #Null$
; 		Define BrandKey$ = #Null$
; 		
; 		Define BrandDataJson = JSONMemberValue(BrandsJsonRoot)
; 		
; 		If JSONType(BrandDataJson) = #PB_JSON_Object
; 			ExamineJSONMembers(BrandDataJson)
; 			
; 			While NextJSONMember(BrandDataJson)
; 				Define BrandPropName$ = JSONMemberKey(BrandDataJson)
; 				Define BrandPropValue = JSONMemberValue(BrandDataJson)
; 				
; 				Select BrandPropName$
; 					Case "id"
; 						; Done via the object's key
; 						
; 					Case "name"
; 						If JSONType(BrandPropValue) = #PB_JSON_String
; 							BrandName$ = GetJSONString(BrandPropValue)
; 						EndIf
; 						
; 					Case "key"
; 						If JSONType(BrandPropValue) = #PB_JSON_String
; 							BrandKey$ = GetJSONString(BrandPropValue)
; 						EndIf
; 						
; 				EndSelect
; 			Wend
; 		EndIf
; 		
; 		If BrandId$ <> #Null$ And BrandName$ <> #Null$ ; And BrandKey$ <> #Null$
; 			AddElement(Brands())
; 			Brands()\Id$ = BrandId$
; 			Brands()\Name$ = BrandName$
; 			Brands()\Key$ = BrandKey$
; 		Else
; 			Debug "Unable to process '" + BrandId$ + "' due to missing data !"
; 		EndIf
; 	Wend
; 	
; 	; Cleaning up
; 	FreeJSON(#PB_All)
; 	
; 	ProcedureReturn #True
; EndProcedure
;}


CompilerIf #PB_Compiler_IsMainFile
	NewList Brands.Brand()
	
	LoadBrandsFileIntoList("../data/brands.ini", Brands(), #True)
	
	ForEach Brands()
		Debug "ID: " + Brands()\Id$
		Debug "Name: " + Brands()\Name$
		Debug "Key: " + Brands()\Key$
		Debug "---"
	Next
	
	ClearList(Brands())
CompilerEndIf
