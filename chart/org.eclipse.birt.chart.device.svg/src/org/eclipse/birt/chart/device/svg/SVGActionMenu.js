/*******************************************************************************
 * Copyright (c) 2009 Actuate Corporation.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-2.0.html
 *
 * Contributors:
 *  Actuate Corporation  - initial API and implementation
 *******************************************************************************/
/**
 * This JavaScript library defines classes and methods to handle interactivity
 * actions on Chart, it is valid for SVG format.
 * 
 * @since 2.5.1
 */
BuildHelper = function (tag, attrList, text) {
	this.tag = tag;
	this.attrList = attrList;
	this.text = text;
	this.element = null;
	this.textNode = null;
};

BuildHelper.prototype.addToParent = function(parent) {
	if (!parent)
		return;
	var svgDocument = parent.ownerDocument;
	this.element = svgDocument.createElementNS("http://www.w3.org/2000/svg",
			this.tag);

	for ( var attribute in this.attrList) {
		if (attribute == 'classType')
			this.element
					.setAttributeNS(null, 'class', this.attrList[attribute]);
		else
			this.element.setAttributeNS(null, attribute,
					this.attrList[attribute]);
	}

	if (this.text) {
		this.textNode = svgDocument.createTextNode(this.text);
		this.element.appendChild(this.textNode);
	}

	parent.appendChild(this.element);
};

BuildHelper.prototype.insertBefore = function(parent, before) {
	if (typeof parent == 'undefined')
		return;
	var svgDocument = parent.ownerDocument;
	this.element = svgDocument.createElementNS("http://www.w3.org/2000/svg",
			this.tag);

	for ( var attribute in this.attrList) {
		if (attribute == 'classType')
			this.element
					.setAttributeNS(null, 'class', this.attrList[attribute]);
		else
			this.element.setAttributeNS(null, attribute,
					this.attrList[attribute]);
	}

	if (this.text) {
		this.textNode = svgDocument.createTextNode(this.text);
		this.element.appendChild(this.textNode);
	}

	parent.insertBefore(this.element, before);
};

BuildHelper.prototype.removeNode = function() {
	if (this.element)
		this.element.parentNode.removeChild(this.element);
	this.tag = "";
	this.attrList = null;
	this.text = null;
	this.element = null;
	this.textNode = null;
};

TM = function () { };
TM.prototype = new Object();

TM.setParent = function (parent, mainSvg) {
	this.parent = parent;
	this.mainSvg = mainSvg;
};

TM.getTitleElement = function (evt) {
	var elem = evt.currentTarget;
	if (elem == null)
		return null;
	var childs = elem.childNodes;
	for ( var x = 0; x < childs.length; x++) {
		if (childs.item(x).nodeType == 1 && childs.item(x).nodeName == "title")
			return childs.item(x);
	}
	return null;
};

TM.getText = function (elem) {
	var childs = elem ? elem.childNodes : null;
	for ( var x = 0; childs && x < childs.length; x++)
		if (childs.item(x).nodeType == 3)
			return childs.item(x).nodeValue;
	return "";
};

TM.hideTimer = undefined;
TM.registerHideTimer = function(time) {
	if (this.hideTimer != undefined)
		this.unregisterHideTimer();
	this.hideTimer = setTimeout('TM.remove();',
			time);
};
TM.unregisterHideTimer = function() {
	try {
		if (this.hideTimer != undefined)
			clearTimeout(TM.hideTimer);
	} catch (e) { }
};

TM.remove = function () {
	if (typeof this.group != 'undefined') {
		this.group.removeNode();
		this.group = undefined;
	}
};

function detectBrowser() {
    var userAgent = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var versionOffset;

    // UserAgent property is null in some cases. such as Adobe SVG Viewer etc.
    // browserName and fullVersion will remain as navigator.appName and navigator.appVersion by default
	if(userAgent != undefined){
		// The true version is after the browser name in userAgent
		// For Safari, it may be after "Safari" or "Version" 
		if ((versionOffset = userAgent.indexOf("MSIE")) != -1) {
	        browserName = "Microsoft Internet Explorer";
	        fullVersion = userAgent.substring(versionOffset + 5);
	    }
	    else if ((versionOffset = userAgent.indexOf("Chrome")) != -1) {
	        browserName = "Chrome";
	        fullVersion = userAgent.substring(versionOffset + 7);
	    }
	    
	    else if ((versionOffset = userAgent.indexOf("Safari")) != -1) {
	        browserName = "Safari";
	        fullVersion = userAgent.substring(versionOffset + 7);
	        if ((versionOffset = userAgent.indexOf("Version")) != -1) fullVersion = userAgent.substring(versionOffset + 8);
	    }
	    else if ((versionOffset = userAgent.indexOf("Firefox")) != -1) {
	        browserName = "Firefox";
	        fullVersion = userAgent.substring(versionOffset + 8);
	    }
	}

    // Trim the semicolon or space
	var index;
    if ((index = fullVersion.indexOf(";")) != -1) fullVersion = fullVersion.substring(0, index);
    if ((index = fullVersion.indexOf(" ")) != -1) fullVersion = fullVersion.substring(0, index);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        majorVersion = parseInt(navigator.appVersion, 10);
    }
    
    return {"browserName" : browserName, "majorVersion" : majorVersion};
};

function isSvgTitleToolTipSupported() {
	var browserInfo = detectBrowser();
	var isSupported = false;
	
	if(((browserInfo.browserName === "Chrome") && (browserInfo.majorVersion >= 3)) ||
		((browserInfo.browserName === "Firefox") && (browserInfo.majorVersion >= 4)) ||
		((browserInfo.browserName === "Safari") && (browserInfo.majorVersion >= 4)) ||
		((browserInfo.browserName === "Microsoft Internet Explorer") && (browserInfo.majorVersion >= 9))) {
		
		isSupported = true;
	}

	return isSupported;
};

TM.show = function (evt, id, title, tooltipText) {
	// If the browser has native tooltip for title element, do not show
	// it twice.
	if (evt.type == 'mousemove') {
		if (isSvgTitleToolTipSupported()) {
			return;
		}
	}
	
	if (id != null && typeof id != 'undefined') {
		var mainSvg = evt.target.ownerDocument;
		var comp = mainSvg.getElementById(id);
		var styleStr = comp.getAttribute("style");
		rHiddenExp = /visibility:[ ]*hidden/g;
		results = styleStr.search(rHiddenExp);
		if (results != -1)
			return;
	}
	var text = TM.getText(TM.getTitleElement(evt));
	if ( tooltipText ) text = tooltipText;
	if (title)
		text = TM.getText(title);
	var x = evt.clientX;
	var y = evt.clientY;
	update = true;
	if (this.oldX != 'undefined') {
		diffX = (x - this.oldX);
		if (diffX < 0)
			diffX = diffX * (-1);
		diffY = (y - this.oldY);
		if (diffY < 0)
			diffY = diffY * (-1);
		if ((diffY > 5) || (diffX > 5))
			update = true;
	}
	if (update)
		TM.remove();
	if (typeof this.group == 'undefined') {
		this.oldX = x;
		this.oldY = y;
		this.height = 15;
		this.xPadding = 5;
		this.yPadding = 20;
		var mainSvg = evt.target.ownerDocument.documentElement;
		var off = mainSvg.currentTranslate;
		var scl = mainSvg.currentScale;
		var adjustedX = (x - off.x) / scl;
		var adjustedY = (y - off.y) / scl;
		this.group = new BuildHelper("g", {
			opacity : 0.8,
			display : "inline",
			transform : "translate(" + (adjustedX + (10 / scl)) + ","
					+ (adjustedY + (10 / scl)) + ")"
		});
		this.group.addToParent(mainSvg);
		this.rectangle = new BuildHelper("rect", {
			id : "test",
			x : 0,
			y : 5,
			transform : "scale(" + (1 / scl) + "," + (1 / scl) + ")",
			rx : 2,
			ry : 2,
			stroke : "black",
			height : this.height,
			classType : "tooltip"
		});
		this.rectangle.addToParent(this.group.element);
		var textObj = new BuildHelper("text", {
			id : "tooltip",
			x : this.xPadding,
			y : (this.yPadding),
			transform : "scale(" + (1 / scl) + "," + (1 / scl) + ")",
			classType : "tooltip text"
		});
		textObj.addToParent(this.group.element);
		TM.setContent(textObj, text);
		var outline = textObj.element.getBBox();
		var tooltipHeight = outline.height + 6;
		if (tooltipHeight < 17)
			tooltipHeight = 17;
		var tooltipWidth = outline.width + 2 * this.xPadding;
		var root = evt.target.ownerDocument.documentElement;
		var rootWidth = root.getAttribute('width');
		var rootHeight = root.getAttribute('height');
		if (((y + tooltipHeight) > rootHeight)
				|| ((x + tooltipWidth) > rootWidth)) {
			var transformX = x + this.xPadding;
			var transformY = y + this.yPadding;
			if ((y + tooltipHeight) > rootHeight)
				transformY = (rootHeight - tooltipHeight) - this.yPadding;
			if ((x + tooltipWidth) > rootWidth)
				transformX = (rootWidth - tooltipWidth) - this.xPadding;
			this.group.element.setAttributeNS(null, "transform", "translate("
					+ (transformX * xScale) + ", " + (transformY * yScale)
					+ ")");
		}
		this.rectangle.element.setAttributeNS(null, "width", tooltipWidth);
		this.rectangle.element.setAttributeNS(null, "height", tooltipHeight);
	}
	SVGChartUtil.stopBubble(evt);
	SVGChartUtil.stopDefault(evt);
};

TM.toggleToolTip = function (evt) {
	if (typeof this.group != 'undefined') {
		TM.remove();
	} else {
		TM.show(evt);
	}
};

TM.setContent = function (textElement, text) {
	text = text.replace(/\n/g, "\\n");
	var multiLine = text.split(/\\n/);
	for ( var x = 0; x < multiLine.length; x++) {
		if (x == 0) {
			textObj = new BuildHelper("tspan", {
				x : 5
			}, multiLine[x]);
		} else {
			textObj = new BuildHelper("tspan", {
				x : 5,
				dy : 17
			}, multiLine[x]);
		}
		textObj.addToParent(textElement.element);
	}
};

function toggleLabelsVisibility(evt, id, compList, labelList) {
	var mainSvg = evt.target.ownerDocument;
	for (var i = 0; i < compList.length; i = i + 1) {
		var comp = mainSvg.getElementById(id + '_' + compList[i]);
		if (comp == null)
			continue;
		var styleStr = comp.getAttribute("style");
		rVisibleExp = /visibility:[ ]*visible/g;
		rInheritExp = /visibility:[ ]*inherit/g;
		rHiddenExp = /visibility:[ ]*hidden/g;
		results = styleStr.search(rVisibleExp);
		inResults = styleStr.search(rInheritExp);
		if ((results == -1) && (inResults == -1)) {
			results = styleStr.search(rHiddenExp);
			if (results == -1)
				styleStr = styleStr + "visibility:hidden;";
			else
				styleStr = styleStr.replace(rHiddenExp, "visibility:visible");
		} else {
			if (inResults == -1) {
				styleStr = styleStr.replace(rVisibleExp, "visibility:hidden");
			} else {
				styleStr = styleStr.replace(rInheritExp, "visibility:hidden");
			}
		}
		comp.setAttributeNS(null, "style", styleStr);
	}
}
function toggleVisibility(evt, id, compList, labelList) {
	var mainSvg = evt.target.ownerDocument;
	var isHidden = true;
	for (var i = 0; i < compList.length; i = i + 1) {
		var comp = mainSvg.getElementById(id + '_' + compList[i]);
		if (comp == null)
			continue;
		var styleStr = comp.getAttribute("style");
		rVisibleExp = /visibility:[ ]*visible/g;
		rHiddenExp = /visibility:[ ]*hidden/g;
		results = styleStr.search(rVisibleExp);
		if (results == -1) {
			results = styleStr.search(rHiddenExp);
			if (results == -1)
				styleStr = styleStr + "visibility:hidden;";
			else {
				styleStr = styleStr.replace(rHiddenExp, "visibility:visible");
				isHidden = false;
			}
		} else {
			styleStr = styleStr.replace(rVisibleExp, "visibility:hidden");
		}
		comp.setAttributeNS(null, "style", styleStr);
	}
	if (labelList != null) {
		for (i = 0; i < labelList.length; i = i + 1) {
			var comp = mainSvg.getElementById(id + '_' + labelList[i] + '_g');
			if (comp == null)
				continue;
			var styleStr = comp.getAttribute("style");
			if (isHidden) {
				styleStr = styleStr + "visibility:hidden;";
				toggleLabelVisibility(evt, id + '_' + labelList[i], 'inherit');
			} else {
				styleStr = styleStr.replace(rHiddenExp, "visibility:visible");
			}
			comp.setAttributeNS(null, "style", styleStr);
		}
	}
}
function toggleLabelVisibility(evt, id, property) {
	var mainSvg = evt.target.ownerDocument;
	var comp = mainSvg.getElementById(id);
	var styleStr = comp.getAttribute("style");
	rVisibleExp = /visibility:[ ]*visible/g;
	rInheritExp = /visibility:[ ]*inherit/g;
	rHiddenExp = /visibility:[ ]*hidden/g;
	results = styleStr.search(rVisibleExp);
	inResults = styleStr.search(rInheritExp);
	if ((results == -1) && (inResults == -1)) {
		results = styleStr.search(rHiddenExp);
		if (results == -1)
			styleStr = styleStr + "visibility:" + property + ";";
	} else {
		if (inResults == -1)
			styleStr = styleStr.replace(rVisibleExp, "visibility:" + property);
		else
			styleStr = styleStr.replace(rInheritExp, "visibility:" + property);
	}
	comp.setAttributeNS(null, "style", styleStr);
}
function toHex(val) {
	strVal = Number(val).toString(16);
	while (strVal.length < 6) {
		strVal = "0" + strVal;
	}
	return strVal;
}
function getXorColor(color) {
	var value = parseInt(color, 16);
	value = 0xFFFFFF ^ value;
	return "#" + toHex(value);
}
var oldCompId = null;
var oldCompList = null;
var fillToColor = new Array();
var strokeToColor = new Array();
function highlight(evt, id, compList) {
	highlightElement(evt, oldCompId, oldCompList, false);
	if (id != oldCompId) {
		highlightElement(evt, id, compList, true);
		oldCompId = id;
		oldCompList = compList;
	} else {
		oldCompId = null;
		oldCompList = null;
		fillToColor = new Array();
		strokeToColor = new Array();
	}
}
function highlightElement(evt, id, compList, highlight) {
	if ((id == null) || (compList == null))
		return;
	var mainSvg = evt.target.ownerDocument;
	for (var i = 0; i < compList.length; i = i + 1) {
		var comp = mainSvg.getElementById(id + '_' + compList[i]);
		if (comp == null)
			continue;
		var styleStr = comp.getAttribute("style");
		// There's a blank between property name and value in IE9, so here
		// remove the blank first
		styleStr = styleStr.replace(/:[ ]*/g,':');
		fillIndex = styleStr.search("fill:");
		if (fillIndex != -1) {
			styleStr = getNewStyle(styleStr, fillIndex, "fill:", highlight,
					fillToColor, compList[i]);
		}
		strokeIndex = styleStr.search("stroke:");
		if (strokeIndex != -1) {
			styleStr = getNewStyle(styleStr, strokeIndex, "stroke:", highlight,
					strokeToColor, compList[i]);
		}
		comp.setAttributeNS(null, "style", styleStr);
	}
}
function getNewStyle(style, index, styleAttr, highlight, lookUpTable, id) {
    var start = index + styleAttr.length;
    var end = style.length;
    for ( var i = start; i < style.length; i++ ) {
         if ( style.charAt(i) == ';' ) {
             end = i;
             break;
         }
    }
    color = style.substring(start, end);
    if (color.substring(0, 6).search("none") != -1)
        return style;
    rgbIndex = color.search("rgb");
    urlIndex = color.search("url");
    if (rgbIndex == -1 || urlIndex != -1 ) {
        if ( urlIndex != -1 ) {
        	var rgbPattern = /rgb\s*([^\x27]+)/g;
	        var rgbResult = rgbPattern.exec(style);
    	    if ( rgbResult != null && typeof rgbResult != 'undefnied' ) {
        	    style = style.replace( rgbPattern, "");
            	style = style + rgbResult[0].substring( rgbResult[0].search(";") );
        	}
        }

        var urlStr = undefined;
        if (styleAttr == "fill:")
            urlStr = /fill:[\x20]*url\(#([^\x27]+)\)[\x20]*;/g;
        else
            urlStr = /stroke:[\x20]*url\(#([^\x27]+)\)[\x20]*;/g;
        var result = urlStr.exec(style);
        if (result != null && typeof result != 'undefined') {
            var endOf = /\w+h\b/;
            var re =  endOf.exec(result[1]);
            if ( typeof re == 'undefined' || re == null ) {
                return style.replace(urlStr, styleAttr + "url(#" + result[1]
                        + "h);");
            } else {
                return style.replace(urlStr, styleAttr + "url(#"
                        + result[1].substring(0, result[1].length - 1) + ");");
            }
        } else {
            hexColor = color.substring(1, 7);
            hc = getHighlight(hexColor, highlight, lookUpTable, id);
            return style.replace(styleAttr + "#" + hexColor, styleAttr + hc);
        }
    } else {
        bracketIndex = color.search("\\)");
        color = color.substring(0, bracketIndex);
        hexColor = getHexFromRGB(color);
        hc = getHighlight(hexColor, highlight, lookUpTable, id);
        return style.substring(0, index)
                + styleAttr
                + hc
                + style.substring(index + bracketIndex + styleAttr.length + 1,
                        style.length);
    } 
    return style;
}
function redirect(target, url) {
	if (isIE() && getIEVersion() < 9) {
		// SVG viewer in IE has issue in location.href, but IE 9 supports native
		// SVG so works well.
		target = '_blank';
	}
	if (target == '_top') {
		window.top.location.href = url;
	} else if (target == '_parent') {
		parent.location.href = url;
	} else if (target == '_self') {
		parent.location.href = url;
	} else {
		// Include '_blank'
		try {
			open(url);
		} catch (e) {
		}
	}
}
function isIPadIPhone() {
	var agt = parent.navigator.userAgent.toLowerCase();
	return agt.match(/iPad/i) || agt.match(/iPhone/i);
}
function isAndroid() {
	var agt = parent.navigator.userAgent.toLowerCase();
	return (agt.indexOf("android") > -1);
}
var isIPadIPhoneAndroid = isIPadIPhone() || isAndroid();

function isIE() {
	var agt = parent.navigator.userAgent.toLowerCase();
	return (agt.indexOf("msie") != -1);
}
function getIEVersion() {
	var agt = parent.navigator.userAgent.toLowerCase();
	var indexStart = agt.indexOf("msie");	
	if(indexStart>0) {
		var indexEnd = agt.substring(indexStart).indexOf(";");
		return parseFloat(agt.substring(indexStart+5,indexStart+indexEnd));
	}
	return 0;
}

var xScale = 1;
var yScale = 1;
function resizeSVG(e) {
	try {
		var root = e.target.ownerDocument.documentElement;
		var hotSpot = e.target.ownerDocument.getElementById('hotSpots');
		var g = e.target.ownerDocument.getElementById('outerG');
		xScale = innerWidth>0 ? innerWidth / root.getAttribute('initialWidth') : 1;
		yScale = innerHeight>0 ? innerHeight / root.getAttribute('initialHeight') : 1;
		root.setAttribute('width', xScale * root.getAttribute('initialWidth'));
		root
				.setAttribute('height', yScale
						* root.getAttribute('initialHeight'));
		g.setAttributeNS(null, 'transform', 'scale(' + xScale + ',' + yScale
				+ ')');
		hotSpot.setAttributeNS(null, 'transform', 'scale(' + xScale + ','
				+ yScale + ')');
	} catch (e) {
	}
}
function getHighlight(color, highlight, lookupTable, id) {
	if (!(highlight)) {
		color = lookupTable[id];
	} else {
		lookupTable[id] = color;
	}
	var r = color.substring(0, 2);
	r = parseInt(r, 16);
	var g = color.substring(2, 4);
	g = parseInt(g, 16);
	var b = color.substring(4, 6);
	b = parseInt(b, 16);
	if (highlight) {
		r = Math.ceil((r + 255) / 2);
		g = Math.ceil((g + 255) / 2);
		b = Math.ceil((b + 255) / 2);
	}
	rStr = r.toString(16);
	gStr = g.toString(16);
	bStr = b.toString(16);
	while (rStr.length < 2) {
		rStr = "0" + rStr;
	}
	while (gStr.length < 2) {
		gStr = "0" + gStr;
	}
	while (bStr.length < 2) {
		bStr = "0" + bStr;
	}
	return "#" + rStr + gStr + bStr;
}
function getHexFromRGB(color) {
	findThem = /\d{1,3}/g;
	listOfnum = color.match(findThem);
	r = Number(listOfnum[0]).toString(16);
	while (r.length < 2) {
		r = "0" + r;
	}
	g = Number(listOfnum[1]).toString(16);
	while (g.length < 2) {
		g = "0" + g;
	}
	b = Number(listOfnum[2]).toString(16);
	while (b.length < 2) {
		b = "0" + b;
	}
	return r + g + b;
};

MenuLayout = function () {
	this.width = 0;
	this.height = 0;
};

MenuLayout.prototype.updateMenuWidth = function(width) {
	if (width > this.width)
		this.width = width;
};

BirtChartActionsMenu = function() {
	this.hideTimer = undefined;
	this.group = undefined;
	this.menuInfo = undefined;
};
BirtChartActionsMenu.prototype= new Object();

BirtChartActionsMenu.TEXT_STYLES = 'font:font-family:font-size:font-size-adjust:font-stretch:font-style:font-variant:font-weight:direction:letter-spacing:text-decoration:unicode-bidi:word-spacing:alignment-baseline:baseline-shift:dominant-baseline:glyph-orientation-horizontal:glyph-orientation-vertical:kerning:text-anchor:writing-mode:cursor:color:';

// Hide tooltip		
BirtChartActionsMenu.remove = function() {
	if (typeof this.group != 'undefined') {
		this.group.removeNode();
		this.group = undefined;
	}
};

BirtChartActionsMenu.show = function (evt, source, menuInfo ) {
	
	if ( menuInfo.menuItemNames.length == 0 ) {
		BirtChartActionsMenu.remove();
	} else {
	this.menuInfo = menuInfo;
	this.menuLayout = new MenuLayout();

	var x = evt.clientX;
	var y = evt.clientY;

	update = true;
	if (this.oldX != 'undefined') {
		diffX = (x - this.oldX);
		if (diffX < 0)
			diffX = diffX * (-1);
		diffY = (y - this.oldY);
		if (diffY < 0)
			diffY = diffY * (-1);
		if ((diffY > 5) || (diffX > 5))
			update = true;
	}

	if (update)
		BirtChartActionsMenu.remove();

	// Destory this menu if no action in two seconds.
	if ( isIPadIPhoneAndroid ) {
		this.hideTimer = window.setTimeout('BirtChartActionsMenu.remove();', 2000);
	}
	    
	if (typeof this.group == 'undefined') {
		this.oldX = x;
		this.oldY = y;
		this.xPadding = 5;
		this.yPadding = 5;
		var mainSvg = evt.target.ownerDocument.documentElement;
		var off = mainSvg.currentTranslate;
		var scl = mainSvg.currentScale;
		var adjustedX = (x - off.x) / scl;
		var adjustedY = (y - off.y) / scl;
		this.group = new BuildHelper('g', {
			display : 'inline',
			transform : 'translate(' + adjustedX + ',' + adjustedY + ')'
		});
		this.group.addToParent(mainSvg);

		// Create menu items
		this.menuItems = new Array();
		this.textItems = new Array();
		var menuX = 0;
		var menuY = 0;

		// Create menu.
		var menu = BirtChartActionsMenu.createMenu(evt, this.group, menuX, menuY, scl);
		menuX = menuX + 1;
		menuY = menuY + 1;

		var offset = 0;
		for ( var i = 0; i < this.menuInfo.menuItemNames.length; i++) {
			var menuIdentify = this.menuInfo.menuItemNames[i];
			
			// Create a menu item.
			// 1. Create a menu item group.
			var menuItemGroup = new BuildHelper('g', {
				opacity : 1,
				display : 'inline'
			});
			// Add to parent.
			menuItemGroup.addToParent(this.group.element);

			// 2. Create outline of menu item.
			this.menuItems.push( BirtChartActionsMenu.createMenuItem(evt, menuItemGroup, menuX, menuY,
					scl, this.menuInfo.menuItems[menuIdentify], menuIdentify, i) );
			// 3. Create menu item text.
			this.textItems.push( BirtChartActionsMenu.createTextItem(evt, menuItemGroup, menuX
					+ this.xPadding, menuY + this.yPadding, scl,
					this.menuInfo.menuItems[menuIdentify], menuIdentify, i) );
			var outline = this.textItems[i].element.getBBox();
			// 4. Adjust menu item bounds.
			var menuHeight = this.yPadding * 2 + outline.height;
			var menuWidth = this.xPadding * 2 + outline.width;
			this.menuItems[i].element.setAttribute('height', menuHeight);
			this.menuLayout.updateMenuWidth(menuWidth);
			this.menuLayout.height += menuHeight;
			menuY = menuY + menuHeight;

			// 5. Adjust menu item text bounds.
			if (outline.y < 0) {
				offset += Math.abs(outline.y);
			}
			var curY = this.textItems[i].element.getAttribute('y');
			this.textItems[i].element.setAttribute('y', parseInt(curY) + offset
					+ this.yPadding);
		}

		// Set menu layout and styles.
		menu.element.setAttribute('width', this.menuLayout.width + 2);
		menu.element.setAttribute('height', this.menuLayout.height + 2);
		menu.element.setAttribute('stroke', 'black');
		menu.element.setAttribute('stroke-width', '1px');
		SVGChartUtil.setStyles(menu.element, BirtChartActionsMenu.getMenuStyles(this.menuInfo.menuStyles));

		// Update all menu items bounds.
		for ( var i = 0; i < this.menuItems.length; i++) {
			this.menuItems[i].element.setAttribute('width', this.menuLayout.width);
		}

		// Adjust position of menu.		
		var root = evt.target.ownerDocument.documentElement;
		var rootWidth = root.getAttribute('width');
		var rootHeight = root.getAttribute('height');
		var menuWidth = this.menuLayout.width;
		var menuHeight = this.menuLayout.height;
		if (((y + menuHeight) > rootHeight) || ((x + menuWidth) > rootWidth)) {
			var transformX = x + this.xPadding;
			var transformY = y + this.yPadding;
			if ((y + menuHeight) > rootHeight)
				transformY = (rootHeight - menuHeight) - this.yPadding;
			if ((x + menuWidth) > rootWidth)
				transformX = (rootWidth - menuWidth) - this.xPadding;
			if ( transformX < 0 ) transformX = 0;
			if ( transformY < 0 ) transformY = 0;
			this.group.element.setAttribute('transform', 'translate('
					+ (transformX / scl) + ', ' + (transformY / scl) + ')');
		}
	}
	}
	SVGChartUtil.stopBubble(evt);
	SVGChartUtil.stopDefault(evt);
};

BirtChartActionsMenu.createMenu = function(evt, group, xOff, yOff, scl) {
	var rectangle = new BuildHelper('rect', {
		id : 'hyperlinkmenu',
		x : xOff,
		y : yOff,
		height : 1,
		width : 1,
		fill : 'white',
		transform : 'scale(' + (1 / scl) + ',' + (1 / scl) + ')',
		onmouseover : isIPadIPhoneAndroid ? '' : 'BirtChartActionsMenu.onMouseOver( evt )',
		onmouseout : isIPadIPhoneAndroid ? '' : 'BirtChartActionsMenu.onMouseOut( evt )'
	});

	rectangle.addToParent(group.element);
	return rectangle;
};

BirtChartActionsMenu.createMenuItem = function(evt, group, xOff, yOff, scl,
		menuItemInfo, identify, index ) {
	var menuID = 'menuitem_' + menuItemInfo.text + '_' + index;
	var rectangle = new BuildHelper('rect', {
		id : menuID,
		x : xOff,
		y : yOff,
		height : 1,
		width : 1,
		transform : 'scale(' + (1 / scl) + ',' + (1 / scl) + ')',
		fill : 'white',
		stroke : 'none',
		onmouseover : isIPadIPhoneAndroid ? '' : 'BirtChartActionsMenu.onMouseOver( evt, ' + identify + ');',
		onmouseout : isIPadIPhoneAndroid ? '' : 'BirtChartActionsMenu.onMouseOut( evt, ' + identify + ');',
		onclick : 'BirtChartActionsMenu.executeMenuAction( evt, ' + identify + ');'
	});

	rectangle.addToParent(group.element);
	SVGChartUtil.setStyles(rectangle.element, BirtChartActionsMenu.getMenuStyles(this.menuInfo.menuItemStyles));
	BirtChartActionsMenu.createTooltipItem(evt, rectangle, menuItemInfo.tooltip);
	return rectangle;
};

BirtChartActionsMenu.createTextItem = function(evt, group, xOff, yOff, scl,
		menuItemInfo, identify, index ) {
	var menuID = 'menuitem_' + menuItemInfo.text + '_' + index;
	var textObj = new BuildHelper('text', {
		id : 'text_' + menuID,
		x : xOff,
		y : yOff,
		transform : 'scale(' + (1 / scl) + ',' + (1 / scl) + ')',
		style : 'text-anchor:start; fill:black',
		onmouseover : isIPadIPhoneAndroid ? '' : 'BirtChartActionsMenu.onMouseOver( evt, ' + identify + ');',
		onmouseout : isIPadIPhoneAndroid ? '' : 'BirtChartActionsMenu.onMouseOut( evt, ' + identify + ');',
		onclick : 'BirtChartActionsMenu.executeMenuAction( evt, ' + identify + ');'
	});

	textObj.addToParent(group.element);
	var styles = BirtChartActionsMenu.getTextStyles(this.menuInfo.menuItemStyles)
	BirtChartActionsMenu.setContent(evt, textObj, styles, menuItemInfo.text, menuItemInfo.tooltip);
	SVGChartUtil.setStyles(textObj.element, styles);
	if (!BirtChartActionsMenu.isSetCursor(styles))
		textObj.element.setAttribute('pointer-events', 'none');

	return textObj;
};

BirtChartActionsMenu.setContent = function(evt, textElement, styles, text, tooltip) {
	text = text.replace(/\n/g, '\\n');
	var multiLine = text.split(/\n/);
	for ( var x = 0; x < multiLine.length; x++) {
		if (x == 0) {
			textObj = new BuildHelper('tspan', {
				x : 5,
				onmouseover : isIPadIPhoneAndroid ? '' : 'BirtChartActionsMenu.showTooltip(evt);',
				onmouseout : isIPadIPhoneAndroid ? '' : 'try{TM.remove();}catch(e){}'
			}, multiLine[x]);
		} else {
			textObj = new BuildHelper('tspan', {
				x : 5,
				dy : 17,
				onmouseover : isIPadIPhoneAndroid ? '' : 'BirtChartActionsMenu.showTooltip(evt);',
				onmouseout : isIPadIPhoneAndroid ? '' : 'try{TM.remove();}catch(e){}'
			}, multiLine[x]);
		}
		textObj.addToParent(textElement.element);
		SVGChartUtil.setStyles(textObj.element, styles);
		if (!BirtChartActionsMenu.isSetCursor(styles))
			textObj.element.setAttribute('pointer-events', 'none');
		BirtChartActionsMenu.createTooltipItem(evt, textElement, tooltip);
	}
};

BirtChartActionsMenu.createTooltipItem = function(evt, parent, tooltip) {
	if (typeof tooltip == 'undefined')
		return null;
	var title = new BuildHelper('title', {
		id : 'title_' + tooltip
	});
	title.addToParent(parent.element);
	var textObj = evt.target.ownerDocument.createTextNode(tooltip);
	title.element.appendChild(textObj);
	return title;
};

BirtChartActionsMenu.showTooltip = function(evt) {
	try {
		var elem = BirtChartActionsMenu.getTitleElement(evt.currentTarget);
		if (elem != null)
			TM.show(evt, null, elem);
	} catch (e) {
	}
	return;
};

BirtChartActionsMenu.getTitleElement = function(elem) {
	if (elem == null)
		return null;
	var childs = elem.childNodes;

	for ( var x = 0; x < childs.length; x++) {
		if (childs.item(x).nodeType == 1 && childs.item(x).nodeName == 'title')
			return childs.item(x);
		var e = BirtChartActionsMenu.getTitleElement(childs.item(x));
		if (e != null)
			return e;
	}
	return null;
};

BirtChartActionsMenu.executeMenuAction = function(evt, identify){
	try {
		TM.remove();
	} catch (e) {
	};
	BirtChartActionsMenu.remove();
    var menuItemInfo = this.menuInfo.menuItems[identify];
    BirtChartActionsMenu.executeMenuActionImpl( evt, menuItemInfo, this.menuInfo );
};

BirtChartActionsMenu.executeMenuActionImpl = function(evt, menuItemInfo, menuInfo ){
 	switch (menuItemInfo.actionType) {
        case BirtChartInteractivityActions.HYPER_LINK:
            BirtChartActionsMenu.redirect(menuItemInfo.actionValue, menuItemInfo.target);
            break;
        case BirtChartInteractivityActions.INVOKE_SCRIPTS:
			var scripts = menuItemInfo.actionValue;
			if (scripts != undefined) {
				BirtChartActionsMenu.invokeScripts(scripts, evt,
					menuInfo.categoryData, menuInfo.valueData,
					menuInfo.valueSeriesName, menuInfo.legendItemData,
					menuInfo.legendItemText, menuInfo.legendItemValue,
					menuInfo.axisLabel, menuInfo);
			}
            break;
        case BirtChartInteractivityActions.HIGHLIGHT:
            highlight(evt, menuInfo.id2, menuInfo.compList);
            break;
        case BirtChartInteractivityActions.TOGGLE_VISIBILITY:
            toggleVisibility(evt, menuInfo.id2, menuInfo.compList, menuInfo.labelList);
            break;
        case BirtChartInteractivityActions.TOGGLE_DATA_POINT_VISIBILITY:
            toggleLabelsVisibility(evt, menuInfo.id2, menuInfo.labelList);
            break;
        case BirtChartInteractivityActions.SHOW_TOOLTIP:
            TM.show( evt, null, null, menuItemInfo.text );
            TM.registerHideTimer(1000);
            break;
 	}
}

BirtChartActionsMenu.redirect = function(url, urlTarget){

    if (url.indexOf('#', 0) == 0) {
        top.document.location.hash = url;
        return;
    }
    if (url.indexOf('javascript:', 0) == 0) {
        eval(url.substring(11, url.length - 1));
        return;
    }
    var target = 'null';
    if (urlTarget && urlTarget != '') 
        target = urlTarget;
    try {
        parent.redirect(target, url);
    } 
    catch (e) {
        redirect(target, url);
    }
};

BirtChartActionsMenu.invokeScripts = function(scripts, evt, categoryData,
		valueData, valueSeriesName, legendItemData, legendItemText,
		legendItemValue, axisLabel, menuInfo) {
	eval( scripts );
};

BirtChartActionsMenu.onMouseOver = function(evt, identify){
    var target = evt.currentTarget;
    if (target == null) return;
	try { window.clearTimeout(this.hideTimer); } catch (e) {};
    if ( typeof identify == 'undefined' ) return;
    var menuItemInfo = this.menuInfo.menuItems[identify];
    if ( menuItemInfo.isTooltipItem( ) ) return;
    var id = target.id;
    if (id.substr(0, 'text_'.length) == 'text_') {
        var mainSvg = evt.target.ownerDocument;
        var menuComp = mainSvg.getElementById(id.substring('text_'.length, id.length));
        SVGChartUtil.setStyles(menuComp, BirtChartActionsMenu.getMenuStyles(this.menuInfo.mouseOverStyles));
        var textStyle = BirtChartActionsMenu.getTextStyles(this.menuInfo.mouseOverStyles);
        SVGChartUtil.setStyles(target, textStyle);
        SVGChartUtil.setStyles(target.childNodes.item(0), textStyle);
    } else {
        var mainSvg = evt.target.ownerDocument;
        var menuComp = mainSvg.getElementById(id);
        var textComp = mainSvg.getElementById('text_' + id);
        SVGChartUtil.setStyles(menuComp, BirtChartActionsMenu.getMenuStyles(this.menuInfo.mouseOverStyles));
        var textStyle = BirtChartActionsMenu.getTextStyles(this.menuInfo.mouseOverStyles);
        SVGChartUtil.setStyles(textComp, textStyle);
        SVGChartUtil.setStyles(textComp.childNodes.item(0), textStyle);
    }
    BirtChartActionsMenu.showTooltip(evt);
};

BirtChartActionsMenu.onMouseOut = function(evt, identify ){
    var target = evt.currentTarget;
    if (target == null) return;
    try { TM.remove(); } catch (e) {};
    this.hideTimer = window.setTimeout('BirtChartActionsMenu.remove();', 300);
    if ( typeof identify == 'undefined' ) return;
    var id = target.id;
    var menuItemInfo = this.menuInfo.menuItems[identify];
    if ( menuItemInfo.isTooltipItem( ) ) return;
    if (id.substr(0, 'text_'.length) == 'text_') {
        var mainSvg = evt.target.ownerDocument;
        var menuComp = mainSvg.getElementById(id.substring('text_'.length, id.length));
        SVGChartUtil.setStyles(menuComp, BirtChartActionsMenu.getMenuStyles(this.menuInfo.mouseOutStyles));
        var textStyle = BirtChartActionsMenu.getTextStyles(this.menuInfo.mouseOutStyles);
        SVGChartUtil.setStyles(target, textStyle);
        SVGChartUtil.setStyles(target.childNodes.item(0), textStyle);
    } else {
        var mainSvg = evt.target.ownerDocument;
        var menuComp = mainSvg.getElementById(id);
        var textComp = mainSvg.getElementById('text_' + id);
        SVGChartUtil.setStyles(menuComp, BirtChartActionsMenu.getMenuStyles(this.menuInfo.mouseOutStyles));
        var textStyle = BirtChartActionsMenu.getTextStyles(this.menuInfo.mouseOutStyles);
        SVGChartUtil.setStyles(textComp, textStyle);
        SVGChartUtil.setStyles(textComp.childNodes.item(0), textStyle);
    }
};

BirtChartActionsMenu.getTextStyles = function(styles) {
	var total;
	if (!SVGChartUtil.isArray(styles)) {
		total = SVGChartUtil.getStylesArray(styles);
	} else {
		total = styles;
	}

	var styleString = '';
	for ( var i = 0; i < total.length; i++) {
		if (this.TEXT_STYLES.search(total[i][0] + ':') < 0)
			continue;
		if (total[i][0] == 'backgroundColor'
				|| total[i][0] == 'background-color')
			continue;
		if (total[i][0] == 'fill')
			continue;
		if (total[i][0] == 'color') {
			styleString += 'fill';
		} else
			styleString += total[i][0];
		styleString += ': ' + total[i][1] + ';';
	}

	return styleString;
};

BirtChartActionsMenu.getMenuStyles = function(styles) {
	var total;
	if (!SVGChartUtil.isArray(styles)) {
		total = SVGChartUtil.getStylesArray(styles);
	} else {
		total = styles;
	}

	var styleString = '';
	for ( var i = 0; i < total.length; i++) {
		if (this.TEXT_STYLES.search(total[i][0] + ':') >= 0)
			continue;
		if (total[i][0] == 'color')
			continue;
		if (total[i][0] == 'backgroundColor'
				|| total[i][0] == 'background-color') {
			styleString += 'fill';
		} else
			styleString += total[i][0];
		styleString += ': ' + total[i][1] + ';';
	}
	return styleString;
};

BirtChartActionsMenu.isSetCursor = function(styleStr) {
	if (styleStr.search('cursor[ ]*:') >= 0)
		return true;
	return false;
};

SVGChartUtil = function() {};
SVGChartUtil.prototype = new Object();

SVGChartUtil.getStylesArray = function (stylesStr) {
	var stylesArray = stylesStr.split(';');
	var total = new Array(stylesArray.length);
	for ( var i = 0; i < stylesArray.length; i++) {
		var unit = stylesArray[i].split(':');
		total[i] = new Array(2);
		total[i][0] = unit[0];
		total[i][1] = unit[1];
	}
	return total;
};

SVGChartUtil.setStyles = function (element, styles) {
	var total;
	if (!this.isArray(styles)) {
		total = this.getStylesArray(styles);
	} else {
		total = styles;
	}

	var styleAttr = element.getAttribute('style');
	for ( var i = 0; i < total.length; i++) {
		var key = total[i][0];
		var value = total[i][1];
		if (key == '' || typeof value == 'undefined')
			continue;
		styleAttr = this.updateStyle(styleAttr, key, value);
	}
	element.setAttribute('style', styleAttr);
};

SVGChartUtil.updateStyle = function (styleStr, key, value) {
	if (!styleStr)
		return key + ':' + value + ';';
	var styleAttr = styleStr;
	var index = styleAttr.search('[ ]*' + key + ':');
	if (index >= 0) {
		var index2 = styleAttr.indexOf(';', index);
		var s = styleAttr.substring(index, index2 + 1);
		styleAttr = styleAttr.replace(s, key + ':' + value + ';');
	} else {
		styleAttr = styleAttr + key + ':' + value + ';';
	}
	return styleAttr;
};

SVGChartUtil.isArray = function (arr) {
	return !!arr && arr.constructor == Array;
};

// Stop the event bubble.		
SVGChartUtil.stopBubble = function (e) {
	// If the e exists, then it isn't in IE.		
	try {
		if (e && e.stopPropagation)
			e.stopPropagation();
		else
			window.event.cancelBubble = true;
	} catch (e) {
	}
	;
	return false;
};

// Stop default action of Browser for event.		
SVGChartUtil.stopDefault = function (e) {
	// If the e exists, the it isn't in IE.		
	try {
		if (e && e.preventDefault)
			e.preventDefault();
		else
			window.event.returnValue = false;
	} catch (e) {
	}
	;
	return false;
};

BirtChartMenuInfo = function() {
	this.className = 'BirtChartMenuInfo';

	this.id = undefined;
	this.text = undefined;
	this.cssClass = undefined;

	this.categoryData = undefined;
	this.valueData = undefined;
	this.valueSeriesName = undefined;

	this.legendItemText = undefined;
	this.legendItemValue = undefined;
	this.axisLabel = undefined;
	
	this.menuStyles = undefined;
	this.menuItemStyles = undefined;
	this.mouseOverStyles = undefined;
	this.mouseOutStyles = undefined;

	this.menuItemNames = [];
	this.menuItems = [];
	this.menuCount = 0;
	
	this.compList = undefined;
	this.labelList = undefined;
	this.id2 = undefined;
};

BirtChartMenuInfo.prototype = {
	addItemInfo : function(itemInfo) {
		var item = '' + this.menuCount;
		this.menuItemNames.push( item );
		this.menuItems[item] = itemInfo;
		this.menuCount = this.menuCount + 1;
	}
};

BirtChartMenuItemInfo = function() {
	this.className = 'BirtChartMenuItemInfo';
	this.text = undefined;
	this.target = undefined;
	this.cssClass = undefined;
	this.tooltip = undefined;

	this.actionType = undefined;
	this.actionValue = undefined;
};

BirtChartMenuItemInfo.prototype = new Object();
BirtChartMenuItemInfo.prototype.isTooltipItem = function() {
	return ( this.actionType == BirtChartInteractivityActions.SHOW_TOOLTIP );
}

BirtChartInteractivityActions = function () {};
BirtChartInteractivityActions.prototype = new Object();

BirtChartInteractivityActions.HYPER_LINK = 1;
BirtChartInteractivityActions.INVOKE_SCRIPTS = 2;
BirtChartInteractivityActions.HIGHLIGHT = 3;
BirtChartInteractivityActions.TOGGLE_VISIBILITY = 4;
BirtChartInteractivityActions.TOGGLE_DATA_POINT_VISIBILITY = 5;
BirtChartInteractivityActions.SHOW_TOOLTIP = 6;