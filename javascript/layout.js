function setupLayout(){
	if(configOptions.webmaps.length > 1){
		//dojo.style(dojo.byId("banner"), "height", "150px");
	}
	if (configOptions.displayDescription == false && configOptions.displayLegend == false){
		dojo.style(dojo.byId("leftPane"), "display", "none");	
	}
	else if (configOptions.displayDescription == true && configOptions.displayLegend == false){
		dojo.style(dojo.byId("legendHeader"), "display", "none");
		dojo.style(dojo.byId("legendPanel"), "display", "none");
		dojo.style(dojo.byId("descriptionPanel"), "height", "100%");		
	}
	else if (configOptions.displayDescription == false && configOptions.displayLegend == true){
		dojo.style(dojo.byId("descriptionPanel"), "display", "none");
		dojo.style(dojo.byId("legendHeader"), "display", "none");
		dojo.style(dojo.byId("legendPanel"), "height", "100%");		
	}
	else{
		resetLayout();
	}
}

function addTabsAndTime(){
	if(configOptions.webmaps.length > 1 && timeInterface == true){
		dojo.style(dojo.byId("banner"), "height", "195px");
	}
	else if(configOptions.webmaps.length == 1 && timeInterface == true){
		dojo.style(dojo.byId("banner"), "height", "150px");
	}
	else if (configOptions.webmaps.length > 1 && timeInterface == false){
		dojo.style(dojo.byId("banner"), "height", "150px");
	}
	dijit.byId("mainWindow").layout();
	setupLayout();
}

function resetLayout(){
	if (configOptions.displayDescription == true && configOptions.displayLegend == true){
		legendHeight = dojo.style(dojo.byId("leftPane"),"height") - dojo.style(dojo.byId("descriptionPanel"),"height") - dojo.style(dojo.byId("legendHeader"),"height")-10;
		if (dojo.isIE != null){
			legendHeight = dojo.style(dojo.byId("leftPane"),"height") - (dojo.style(dojo.byId("leftPane"),"height")*0.45) - dojo.style(dojo.byId("legendHeader"),"height");
		}
		dojo.style(dojo.byId("legendPanel"),"height",legendHeight+"px");
	}
	dijit.byId("mainWindow").layout();
}

function changeMap(index){
	if (mapsReady == true){
		
		cm = index;
		
		var currentMap = dojo.byId("mapDiv"+cm);
		
		dojo.forEach(dojo.query(".tab"),function(node){
			dojo.removeClass(node,"selected");
		});
		dojo.addClass(dojo.byId("tab"+cm),"selected");
		dojo.forEach(_maps,function(map,i){
			if(cm != i){
				dojo.fadeOut({
					node: dojo.byId("mapDiv"+i),
					duration: 500
				}).play();
				dojo.style(dojo.byId("legend"+i),"display","none");
				dojo.style(dojo.byId("description"+i),"display","none");
			}
			else{
				dojo.fadeIn({
					node: dojo.byId("mapDiv"+i),
					duration: 500
				}).play();
				dojo.style(dojo.byId("legend"+i),"display","block");
				dojo.style(dojo.byId("description"+i),"display","block");
			}
		});
		dojo.place(currentMap,dojo.byId('mapPane'),'last');
		if (_timeProperties[cm] != null){
		}
	}
	changeLegend();
}

function centerTimeDisplay(){
	var timeDiv = dojo.position('timeDisplay', true);
	var mapDiv = dojo.position('mapPane', true);
	var posLeft = (mapDiv.w/2) - (timeDiv.w/2);
	dojo.style(dojo.byId("timeDisplay"),"left",posLeft+"px");
}