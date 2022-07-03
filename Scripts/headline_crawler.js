

/*   Clickable Horizontal Headline Crawler */
/*   Copyright 2010, Michael J. Hill.  All rights reserved. Used with permission.  www.javascript-demos.com */
/*   Free use of the code, so long as the above notice is kept intact */

	var crawlContainer = "";
	var crawlTimeout = "";
	var headlineCount = 1;
	var linkWindow = "";
	
	function initCrawl(){
	
		var currPos = crawlContainer.scrollLeft;		
		if (currPos >= crawlContainer.scrollWidth - crawlerUseWidth.replace("px",""))
			{		
			 crawlContainer.scrollLeft = 0;
			 crawlTimeout = setTimeout(initCrawl, crawlerSpeed); 			
			}
		else 	{
			 crawlContainer.scrollLeft = currPos + 1;  			
			 crawlTimeout = setTimeout(initCrawl, crawlerSpeed);       
			}
	}	

	function openHeadline(nLink){	
		
		linkWindow = linkWindow.closed ? "" : linkWindow;
		var currLink = nLink.firstChild.innerHTML;
		for (i=0; i<headlineCount; i++)
			{
			 if (crawlInfo['tagline_'+i] == currLink && linkWindow == "")				
				{				 
				 linkWindow = window.open(crawlInfo['link_'+i]);				 
				}	
			 else if (crawlInfo['tagline_'+i] == currLink)
				{ 
				 linkWindow.location.replace(crawlInfo['link_'+i]);
				 linkWindow.focus();
				}				
			}		
		return false;		
	}

	function crawlerInit(){

		crawlerSpeed = crawlerSpeed == "normal" ? 10 : 16;
		while(crawlInfo['tagline_'+headlineCount])
			{
			 headlineCount++;
			}
		var nDiv = document.getElementsByTagName('div');
		for (i=0; i<nDiv.length; i++)
			{
			 if (nDiv[i].className == "crawl_container")
				{
				 crawlContainer = nDiv[i];
				}
			 if (nDiv[i].className == "crawler")
				{
				 var nMsg = nDiv[i];
				}
			 if (/right/.test(nDiv[i].className) && /j\.\sh/i.test(nDiv[i].firstChild.data))
				{
				 var review = true;
				}
			}		
		crawlContainer.onmouseover = function()
			{
			 clearTimeout(crawlTimeout);
			}
		crawlContainer.onmouseout = function()
			{
			 initCrawl();
			}	
		crawlContainer.style.width = crawlerUseWidth;			
		nMsg.style.paddingLeft = crawlerUseWidth;
		var fauxPaddingRight = document.createElement('div')
		fauxPaddingRight.appendChild(document.createTextNode(" "));
		fauxPaddingRight.style.display = "inline";
		fauxPaddingRight.style.marginLeft = Math.round(crawlerUseWidth.replace("px","") * (1 - separatorWidth.replace("%", "") * .5 * .01)) + "px";
		var oddEvenColor = ["even_color","odd_color"];	
		var separator = "";
		if (!review){return;}
	   	for (i=1; i<headlineCount; i++)
			{
			 var nLink = document.createElement('a');
			 nLink.href = "#";
			 nLink.onclick = function()
				{
				 openHeadline(this);				 
				}
			 var nTag = document.createElement('span');
			 nTag.className = oddEvenColor[i % 2];
			 nTag.appendChild(document.createTextNode(crawlInfo['tagline_'+i]));				
			 nLink.appendChild(nTag);
			 nMsg.appendChild(nLink);		
			 separator = document.createElement('div');
			 separator.appendChild(document.createTextNode(" "));
			 separator.style.display = "inline";
			 separator.style.marginLeft = Math.round(crawlerUseWidth.replace("px","") * (separatorWidth.replace("%", "") * .01) * .5) + "px";	
			 nMsg.appendChild(separator);
			 if (i < headlineCount-1)
				{
			 	 nMsg.appendChild(document.createTextNode("\u25cf"));				 
				 separator = document.createElement('div');
			 	 separator.appendChild(document.createTextNode(" "));
			 	 separator.style.display = "inline";
			 	 separator.style.marginLeft = Math.round(crawlerUseWidth.replace("px","") * (separatorWidth.replace("%", "") * .01) * .5) + "px";
				}			 
			nMsg.appendChild(separator);			
			}	
		nMsg.appendChild(fauxPaddingRight);		
		initCrawl();			
	}

	navigator.appName == "Microsoft Internet Explorer" ? attachEvent('onload', crawlerInit, false) : addEventListener('load', crawlerInit, false);	


