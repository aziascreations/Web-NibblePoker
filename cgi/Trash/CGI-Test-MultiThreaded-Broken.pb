
;- Compiler directives & imports

EnableExplicit

CompilerIf #PB_Compiler_Thread = 0
	CompilerError "Required: Thread-safe compiler flag."
CompilerEndIf


;- Constants & Structures

#WorkerPool_Size = 2
#WorkerPool_PostBirthDelay = 0
#WorkerPool_PostThreadCheckDelay = 10
#WorkerPool_PostFullLoopDelay = 500

#Cgi_PortPoolStart = 5600

Structure ThreadParameters
	FcgiPort.w
EndStructure


;- Macros

Macro WriteCGIConstant(Constant)
	WriteCGIString((Constant) + ": " + CGIVariable(Constant)+"<br>")
EndMacro


;- Procedures

Procedure CustomWorkerThread(*Parameters.ThreadParameters)
	
	If Not InitFastCGI(*Parameters\FcgiPort)
		Debug "Failed to call 'InitFastCGI(" + Str(*Parameters\FcgiPort) + ")' !"
		End 3
	EndIf
	
	PrintN("Started FastCGI on port " + Str(*Parameters\FcgiPort) + " !")
	
	While WaitFastCGIRequest()
		Debug "START - " + Str(*Parameters\FcgiPort)
		
		If ReadCGI()
			WriteCGIHeader(#PB_CGI_HeaderContentType, "text/html", #PB_UTF8)
			WriteCGIHeader("JoeMama", "GetLigma", #PB_UTF8 | #PB_CGI_LastHeader)
			
			WriteCGIString("<html><title>PureBasic - FastCGI</title><body>" +
			               "Hello from PureBasic FastCGI !<br>" +
			               "Actual time: <b>"+FormatDate("%hh:%ii", Date()) + "</b><br>" +
			               "Internal Port: <b>"+Str(*Parameters\FcgiPort)+ "</b><br>")
			
			WriteCGIString("<hr>")
			
			WriteCGIString("test123: " + CGIParameterValue("test123"))
			WriteCGIString("<br>")
			WriteCGIString("test123: " + CGIVariable("test123"))
			
			WriteCGIString("<hr>")
			
			WriteCGIConstant(#PB_CGI_AuthType)
			WriteCGIConstant(#PB_CGI_ContentLength)
			WriteCGIConstant(#PB_CGI_HeaderContentType)
			WriteCGIConstant(#PB_CGI_DocumentRoot)
			WriteCGIConstant(#PB_CGI_GatewayInterface)
			WriteCGIConstant(#PB_CGI_PathInfo)
			WriteCGIConstant(#PB_CGI_PathTranslated)
			WriteCGIConstant(#PB_CGI_QueryString)
			WriteCGIConstant(#PB_CGI_RemoteAddr)
			WriteCGIConstant(#PB_CGI_RemoteHost)
			WriteCGIConstant(#PB_CGI_RemoteIdent)
			WriteCGIConstant(#PB_CGI_RemotePort)
			WriteCGIConstant(#PB_CGI_RemoteUser)
			WriteCGIConstant(#PB_CGI_RequestURI)
			WriteCGIConstant(#PB_CGI_RequestMethod)
			WriteCGIConstant(#PB_CGI_ScriptName)
			WriteCGIConstant(#PB_CGI_ScriptFilename)
			WriteCGIConstant(#PB_CGI_ServerAdmin)
			WriteCGIConstant(#PB_CGI_ServerName)
			WriteCGIConstant(#PB_CGI_ServerPort)
			WriteCGIConstant(#PB_CGI_ServerProtocol)
			WriteCGIConstant(#PB_CGI_ServerSignature)
			WriteCGIConstant(#PB_CGI_ServerSoftware)
			WriteCGIConstant(#PB_CGI_HttpAccept)
			WriteCGIConstant(#PB_CGI_HttpAcceptEncoding)
			WriteCGIConstant(#PB_CGI_HttpAcceptLanguage)
			WriteCGIConstant(#PB_CGI_HttpCookie)
			WriteCGIConstant(#PB_CGI_HttpForwarded)
			WriteCGIConstant(#PB_CGI_HttpHost)
			WriteCGIConstant(#PB_CGI_HttpPragma)
			WriteCGIConstant(#PB_CGI_HttpReferer)
			WriteCGIConstant(#PB_CGI_HttpUserAgent)
			
			WriteCGIString("<hr>")
			
			WriteCGIConstant("NP_TEST_01")
			
			WriteCGIString("<hr>")
			
			WriteCGIString("NbParameters: " + CountCGIParameters())
			
			WriteCGIString("<hr>")
			Define k.i = 0
			For k = 0 To CountCGIParameters()-1 
				WriteCGIString(CGIParameterName(k) + ": " + CGIParameterValue("", k) + "<br>")
			Next
			
			WriteCGIString("</body></html>")
			
			FinishFastCGIRequest()
			
			Define LoopStart.q = ElapsedMilliseconds()
			While ElapsedMilliseconds() < LoopStart + 5000
				Delay(1)
			Wend
			
			
			;Delay(5000)
		EndIf
		
		Debug "END - " + Str(*Parameters\FcgiPort)
	Wend
EndProcedure


;- Code
;{

If Not OpenConsole()
	End 1
EndIf

If Not InitCGI()
	Debug "Failed to call 'InitCGI' !"
	End 2
EndIf

; If Not InitCGI()
; 	End 2
; EndIf

NewList WorkerPoolThreadIDs.i()
NewList WorkerPoolThreadParams.i()

Define iWorkerPool.i
Define *TmpThreadParams.ThreadParameters

; Initializing the worker lists...
For iWorkerPool = 0 To #WorkerPool_Size - 1
	InsertElement(WorkerPoolThreadIDs())
	WorkerPoolThreadIDs() = #Null
	
	InsertElement(WorkerPoolThreadParams())
	WorkerPoolThreadParams() = #Null
Next

iWorkerPool = 0
Define StartTimeTest.q = ElapsedMilliseconds()
Define Quit.b = #False
Define iThread.i = 0

; Spawning the threads, and respawning dead ones
While Quit = #False
	iThread = 0
	
	ForEach WorkerPoolThreadIDs()
		If Not IsThread(WorkerPoolThreadIDs())
			; Cleaning up some leftovers from previous threads
			SelectElement(WorkerPoolThreadParams(), ListIndex(WorkerPoolThreadIDs()))
			If WorkerPoolThreadParams()
				FreeMemory(WorkerPoolThreadParams())
			EndIf
			
			WorkerPoolThreadParams() = AllocateMemory(SizeOf(ThreadParameters))
			*TmpThreadParams = WorkerPoolThreadParams()
			;*TmpThreadParams\FcgiPort = #Cgi_PortPoolStart
			*TmpThreadParams\FcgiPort = #Cgi_PortPoolStart + iThread
			WorkerPoolThreadIDs() = CreateThread(@CustomWorkerThread(), *TmpThreadParams)
			
			; Staggers the launch of future threads (not required !)
			CompilerIf #WorkerPool_PostBirthDelay <> 0
				Delay(#WorkerPool_PostBirthDelay)
			CompilerEndIf
		EndIf
		
		CompilerIf #WorkerPool_PostThreadCheckDelay <> 0
			Delay(#WorkerPool_PostThreadCheckDelay)
		CompilerEndIf
		
		iThread = iThread + 1
	Next
	
	CompilerIf #WorkerPool_PostFullLoopDelay <> 0
		Delay(#WorkerPool_PostFullLoopDelay)
	CompilerEndIf
Wend


; Waiting for the last threads to finish...
ForEach WorkerPoolThreadIDs()
	If IsThread(WorkerPoolThreadIDs())
		WaitThread(WorkerPoolThreadIDs())
	EndIf
Next

Define EndTimeTest.q = ElapsedMilliseconds()

; Cleaning up...
ForEach WorkerPoolThreadParams()
	If WorkerPoolThreadParams()
		FreeMemory(WorkerPoolThreadParams())
	EndIf
Next

Debug "Done !"
Debug "Took " + Str(EndTimeTest - StartTimeTest) + "ms"
Debug "Spawned "+Str(iWorkerPool)+" thread(s)"
Debug "Worker pool size: " + Str(#WorkerPool_Size)
Debug "Worker post-birth delay: " + Str(#WorkerPool_PostBirthDelay) + "ms"

;}
