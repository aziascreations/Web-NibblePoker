
If Not OpenConsole()
	End 1
EndIf

If Not InitCGI()
	End 2
EndIf

If Not InitFastCGI(5600)
	End 3
EndIf

PrintN("Started FastCGI on port 5600 !")


Procedure WriteCGIConstant(Constant$)
	WriteCGIString(Constant$ + ": " + CGIVariable(Constant$)+"<br>")
EndProcedure

While WaitFastCGIRequest()
	Debug "START"
	
	If ReadCGI()
		WriteCGIHeader(#PB_CGI_HeaderContentType, "text/html", #PB_UTF8)
		WriteCGIHeader("JoeMama", "GetLigma", #PB_UTF8 | #PB_CGI_LastHeader)
		
		WriteCGIString("<html><title>PureBasic - FastCGI</title><body>" +
		               "Hello from PureBasic FastCGI !<br>" +
		               "Actual time: <b>"+FormatDate("%hh:%ii", Date()) + "</b><br>")
		
		WriteCGIString("</body></html>")
		
		Define LoopStart.q = ElapsedMilliseconds()
		While ElapsedMilliseconds() < LoopStart + 5000
			Delay(1)
		Wend
		
		; This doesn't work
		;Delay(5000)
		
	EndIf
	
	Debug "END"
Wend
