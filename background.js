var tabsArray = [];
//This logs the refreshObjectArray to the console so I can see it. The thing below does the same thing lol...
chrome.browserAction.onClicked.addListener(function(tab)
{
    var tabsArray = [];
    var actualIndex;
    chrome.storage.sync.get(["refreshObjectArray","def"], function(result)
    {
        for(i = 0; i < result.refreshObjectArray.length; i++)
        {
            if(parseInt(result.def) === result.refreshObjectArray[i].id)
            {
                actualIndex = i;
                console.log(actualIndex);
            }
            else
            {
                // do nothing
            }
        }

        tabsArray = [];
        //Jeg aner ikke hvorfor dette funker, men det funker... :/ Den burde egentlig ikke gjøre det tror jeg?
        console.log(result.refreshObjectArray);

        //WindowType
        //grunnen til at du pleide å få feilmelding her er fordi det finnes ingen index === 3 hvis arrayen er 3.length og du bruker id=3 til å finne den riktige indeksen i arrayen, når det 
        var windowType = result.refreshObjectArray[actualIndex].windowType;
        console.log(windowType);
        if(windowType === "currentWindow")
        {
            windowType = true;
        }
        //currentWindow === false, betyr allWindows
        else if(windowType === "allWindows")
        {
            windowType = null;
        }

        //RefreshType
        var refreshType = result.refreshObjectArray[actualIndex].refreshType;
        console.log(refreshType);
        if(refreshType === "softRefresh")
        {
            refreshType = false;
        }
        //currentWindow === false, betyr allWindows
        else if(refreshType === "hardRefresh")
        {
            refreshType = true;
        }

        //Alternatives
        var alternativesArray = [];
        for(i = 0; i < result.refreshObjectArray[actualIndex].alternatives.length; i++)
        {
            alternativesArray.push(result.refreshObjectArray[actualIndex].alternatives[i]);
        }

        //AllTabs Alternatives
        var allTabsAlternativesArray = [];
        for(i = 0; i < result.refreshObjectArray[actualIndex].allTabsAlternatives.length; i++)
        {
            allTabsAlternativesArray.push(result.refreshObjectArray[actualIndex].allTabsAlternatives[i]);
        }
        
        //Loop through the alternatives and assign them to their designated variables
        var muted = false;
        var pinned = false;
        var audible = false;

        var notMuted = null;
        var notPinned = null;
        var notAudible = null;

        for(j = 0; j < alternativesArray.length; j++)
        {
            switch(alternativesArray[j]){
                case "mutedTabs":
                    muted = true;
                    console.log(muted);
                break;
                case "pinnedTabs":
                    pinned = true;
                    console.log(pinned);
                break;
                case "audibleTabs":
                    audible = true;
                    console.log(audible);
                break;
                default:
                console.log("okay...");
            }
        }

        for(j = 0; j < allTabsAlternativesArray.length; j++)
        {
            switch(allTabsAlternativesArray[j]){
                case "notMuted":
                    notMuted = true;
                    console.log(notMuted);
                break;
                case "notPinned":
                    notPinned = true;
                    console.log(notPinned);
                break;
                case "notAudible":
                    notAudible = true;
                    console.log(notAudible);
                break;
                default:
                console.log("okay...");
            }
        }
        var tempArray6 = [];
        var tempArray7 = [];
        console.log(alternativesArray);
        console.log(allTabsAlternativesArray);
        console.log(result.refreshObjectArray[actualIndex].chosenTabs);
            
            //When Tabs is clicked
            if(alternativesArray.includes("allTabs"))
            {
                chrome.tabs.query({"currentWindow": windowType}, function(tab){
                    for(i = 0; i < tab.length; i++)
                    {
                        tempArray7.push(tab[i].id);
                        for (let [key, value] of Object.entries(tab[i])) 
                        {
                            switch(key){
                                case "pinned":
                                    if(value === true)
                                    {
                                        if(notPinned === true)
                                        {
                                            tempArray6.push(tab[i].id);
                                        }
                                        else
                                        {
                                            //do nothing
                                        }
                                    }
                                    else
                                    {
                                        //do nothing
                                    }
                                break;
                                case "audible":
                                    if(value === true)
                                    {
                                        if(notAudible === true)
                                        {
                                            tempArray6.push(tab[i].id);
                                        }
                                        else
                                        {
                                            //do nothing
                                        }
                                    }
                                    else
                                    {
                                        //do nothing
                                    }
                                break;
                                case "muted":
                                    if(value.muted === true)
                                    {
                                        if(notMuted === true)
                                        {
                                            tempArray6.push(tab[i].id);
                                        }
                                        else
                                        {
                                            //do nothing
                                        }
                                    }
                                    else
                                    {
                                        //do nothing
                                    }
                                break;
                            default:
                                console.log("cool story bro");
                            }
                        }
                    }

                    //Add tabs with certain indexes into the tabsArray depending on what's inside the chosenTabs array 
                    if(result.refreshObjectArray[actualIndex].chosenTabs === undefined || result.refreshObjectArray[actualIndex].chosenTabs.length === 0)
                    {
                        //do nothing
                    }
                    else
                    {
                        for(i = 0; i < tab.length; i++)
                        {
                            for(j = 0; j < result.refreshObjectArray[actualIndex].chosenTabs.length; j++)
                            {
                                console.log(typeof(parseInt(result.refreshObjectArray[actualIndex].chosenTabs[j])));
                                
                                if(result.refreshObjectArray[actualIndex].chosenTabs.length === 0)
                                {
                                    //do nothing
                                }
                                else if(result.refreshObjectArray[actualIndex].chosenTabs.length > 0)
                                {
                                    console.log("above zero!");
                                    if(parseInt(result.refreshObjectArray[actualIndex].chosenTabs[j] - 1) === tab[i].index)
                                    {
                                        tempArray6.push(actualIndex);
                                    }
                                    else
                                    {
                                        //do nothing
                                    }
                                }
                                else
                                {
                                    console.log("below zero?");
                                }
                            }
                        }
                    }

                    //Dette er tabs du ikke ønsker link tingen
                    if(result.refreshObjectArray[actualIndex].allTabsAlternatives.includes("notTabsWithSpecifiedLinks"))
                    {
                        for(i = 0; i < tab.length; i++)
                        {
                            console.log(tab[i]);
                            for(j = 0; j < result.refreshObjectArray[actualIndex].chosenLinks.length; j++)
                            {
                                if(tab[i].url.includes(result.refreshObjectArray[actualIndex].chosenLinks[j]))
                                {
                                    tempArray6.push(tab[i].id);
                                }
                                else
                                {
                                    //do nothing
                                }
                            }
                        }
                    }
                    //Dette tar du lenger nede
                    else
                    {
                    //do nothing
                    }

                    console.log(tempArray6);
                    console.log(tempArray7);
                    var theTabsToActuallyRefresh1 = _.difference(tempArray7, tempArray6);
                    console.log(_.difference(tempArray7, tempArray6));

                    for(i = 0; i < theTabsToActuallyRefresh1.length; i++)
                    {
                        chrome.tabs.reload(theTabsToActuallyRefresh1[i], function(){
                            console.log("tabs refreshed!");
                        });
                    }
                });
            }
            //When Tabs isn't clicked
            else if(!alternativesArray.includes("allTabs"))
            {
                chrome.tabs.query({"currentWindow": windowType}, function(tab){
                console.log(tab);
                for(i = 0; i < tab.length; i++)
                {
                    for (let [key, value] of Object.entries(tab[i])) 
                    {
                        switch(key){
                            case "pinned":
                                if(value === true)
                                {
                                    if(pinned === true)
                                    {
                                        tabsArray.push(tab[i]);
                                    }
                                    else
                                    {
                                        //do nothing
                                    }
                                }
                                else
                                {
                                    // do nothing
                                }
                            break;
                            case "audible":
                                if(value === true)
                                {
                                    if(audible === true)
                                    {
                                        tabsArray.push(tab[i]);
                                    }
                                    else
                                    {
                                        //do nothing
                                    }
                                }
                                else
                                {
                                    // do nothing
                                }
                            break;
                            case "mutedInfo":
                                if(value.muted === true)
                                {
                                    if(muted === true)
                                    {
                                        tabsArray.push(tab[i]);
                                    }
                                    else
                                    {
                                        //do nothing
                                    }
                                }
                                else
                                {
                                    // do nothing
                                }
                            break;
                            default:
                            console.log("okay...");
                        }
                    }

                    //Add tabs with certain indexes into the tabsArray depending on what's inside the chosenTabs array
                    if(result.refreshObjectArray[actualIndex].chosenTabs === undefined || result.refreshObjectArray[actualIndex].chosenTabs.length === 0)
                    {
                        //do nothing
                    }
                    else
                    {
                        for(j = 0; j < result.refreshObjectArray[actualIndex].chosenTabs.length; j++)
                        {
                            console.log(typeof(tab[i].index));
                            console.log(typeof(parseInt(result.refreshObjectArray[actualIndex].chosenTabs[j])));
                            
                            if(result.refreshObjectArray[actualIndex].chosenTabs.length === 0)
                            {
                                //do nothing
                            }
                            else if(result.refreshObjectArray[actualIndex].chosenTabs.length > 0)
                            {
                                console.log("above zero!");
                                if(parseInt(result.refreshObjectArray[actualIndex].chosenTabs[j] - 1) === tab[i].index)
                                {
                                    tabsArray.push(tab[i]);
                                }
                                else
                                {
                                    //do nothing
                                }
                            }
                            else
                            {
                                console.log("below zero?");
                            }
                        }
                    }
                }

                //Get the links
                //Dette er tabs som du ønsker settingen
                if(result.refreshObjectArray[actualIndex].alternatives.includes("tabsWithSpecifiedLinks"))
                {
                    for(i = 0; i < tab.length; i++)
                    {
                        console.log(tab[i]);
                        for(j = 0; j < result.refreshObjectArray[actualIndex].chosenLinks.length; j++)
                        {
                            if(tab[i].url.includes(result.refreshObjectArray[actualIndex].chosenLinks[j]))
                            {
                                tabsArray.push(tab[i])
                            }
                            else
                            {
                                //do nothing
                            }
                        }
                    }
                }
                //Dette tar du lenger nede
                else
                {
                   //do nothing
                }
            console.log(tabsArray);
            console.log(result.refreshObjectArray[result.refreshObjectArray.length - 1]);
            
            for(i = 0; i < tabsArray.length; i++)
            {
                chrome.tabs.reload(tabsArray[i].id, {"bypassCache": refreshType}, function()
                {
                    console.log("refreshment done!");
                });
            }
            
        //Her lukkes den
            });
        }
    });
});

//This thing gets the refreshObjectArray and logs it so I can see what's inside
chrome.storage.sync.get(["refreshObjectArray"], function(result){
    console.log(result.refreshObjectArray);
});

function showThyself(info,tab)
{
    var tabsArray = [];
    chrome.storage.sync.get("refreshObjectArray", function(result){
        //Jeg aner ikke hvorfor dette funker, men det funker... :/ Den burde egentlig ikke gjøre det tror jeg?
        console.log(result.refreshObjectArray[info.menuItemId]);

        //WindowType
        var windowType = result.refreshObjectArray[info.menuItemId].windowType;
        console.log(windowType);
        if(windowType === "currentWindow")
        {
            windowType = true;
        }
        //currentWindow === false, betyr allWindows
        else if(windowType === "allWindows")
        {
            windowType = null;
        }

        //RefreshType
        var refreshType = result.refreshObjectArray[info.menuItemId].refreshType;
        console.log(refreshType);
        if(refreshType === "softRefresh")
        {
            refreshType = false;
        }
        //currentWindow === false, betyr allWindows
        else if(refreshType === "hardRefresh")
        {
            refreshType = true;
        }

        //Alternatives
        var alternativesArray = [];
        for(i = 0; i < result.refreshObjectArray[info.menuItemId].alternatives.length; i++)
        {
            alternativesArray.push(result.refreshObjectArray[info.menuItemId].alternatives[i]);
        }

        //AllTabs Alternatives
        var allTabsAlternativesArray = [];
        for(i = 0; i < result.refreshObjectArray[info.menuItemId].allTabsAlternatives.length; i++)
        {
            allTabsAlternativesArray.push(result.refreshObjectArray[info.menuItemId].allTabsAlternatives[i]);
        }
        
        //Loop through the alternatives and assign them to their designated variables
        var muted = false;
        var pinned = false;
        var audible = false;

        var notMuted = null;
        var notPinned = null;
        var notAudible = null;

        for(j = 0; j < alternativesArray.length; j++)
        {
            switch(alternativesArray[j]){
                case "mutedTabs":
                    muted = true;
                    console.log(muted);
                break;
                case "pinnedTabs":
                    pinned = true;
                    console.log(pinned);
                break;
                case "audibleTabs":
                    audible = true;
                    console.log(audible);
                break;
                default:
                console.log("okay...");
            }
        }

        for(j = 0; j < allTabsAlternativesArray.length; j++)
        {
            switch(allTabsAlternativesArray[j]){
                case "notMuted":
                    notMuted = true;
                    console.log(notMuted);
                break;
                case "notPinned":
                    notPinned = true;
                    console.log(notPinned);
                break;
                case "notAudible":
                    notAudible = true;
                    console.log(notAudible);
                break;
                default:
                    console.log("okay...");
            }
        }
        var tempArray6 = [];
        var tempArray7 = [];
        console.log(alternativesArray);
        console.log(allTabsAlternativesArray);
        console.log(result.refreshObjectArray[info.menuItemId].chosenTabs);
            
            //When Tabs is clicked
            if(alternativesArray.includes("allTabs"))
            {
                chrome.tabs.query({"currentWindow": windowType}, function(tab){
                    for(i = 0; i < tab.length; i++)
                    {
                        tempArray7.push(tab[i].id);
                        for (let [key, value] of Object.entries(tab[i])) 
                        {
                            switch(key){
                                case "pinned":
                                    if(value === true)
                                    {
                                        if(notPinned === true)
                                        {
                                            tempArray6.push(tab[i].id);
                                        }
                                        else
                                        {
                                            //do nothing
                                        }
                                    }
                                    else
                                    {
                                        //do nothing
                                    }
                                break;
                                case "audible":
                                    if(value === true)
                                    {
                                        if(notAudible === true)
                                        {
                                            tempArray6.push(tab[i].id);
                                        }
                                        else
                                        {
                                            //do nothing
                                        }
                                    }
                                    else
                                    {
                                        //do nothing
                                    }
                                break;
                                case "muted":
                                    if(value.muted === true)
                                    {
                                        if(notMuted === true)
                                        {
                                            tempArray6.push(tab[i].id);
                                        }
                                        else
                                        {
                                            //do nothing
                                        }
                                    }
                                    else
                                    {
                                        //do nothing
                                    }
                                break;
                            default:
                                console.log("cool story bro");
                            }
                        }
                    }

                    //Add tabs with certain indexes into the tabsArray depending on what's inside the chosenTabs array 
                    if(result.refreshObjectArray[info.menuItemId].chosenTabs === undefined || result.refreshObjectArray[info.menuItemId].chosenTabs.length === 0)
                    {
                        //do nothing
                    }
                    else
                    {
                        for(i = 0; i < tab.length; i++)
                        {
                            for(j = 0; j < result.refreshObjectArray[info.menuItemId].chosenTabs.length; j++)
                            {
                                console.log(typeof(parseInt(result.refreshObjectArray[info.menuItemId].chosenTabs[j])));
                                
                                if(result.refreshObjectArray[info.menuItemId].chosenTabs.length === 0)
                                {
                                    //do nothing
                                }
                                else if(result.refreshObjectArray[info.menuItemId].chosenTabs.length > 0)
                                {
                                    console.log("above zero!");
                                    if(parseInt(result.refreshObjectArray[info.menuItemId].chosenTabs[j] - 1) === tab[i].index)
                                    {
                                        tempArray6.push(tab[i].id);
                                    }
                                    else
                                    {
                                        //do nothing
                                    }
                                }
                                else
                                {
                                    console.log("below zero?");
                                }
                            }
                        }
                    }

                    //Dette er tabs du ikke ønsker link tingen
                    if(result.refreshObjectArray[info.menuItemId].allTabsAlternatives.includes("notTabsWithSpecifiedLinks"))
                    {
                        for(i = 0; i < tab.length; i++)
                        {
                            console.log(tab[i]);
                            for(j = 0; j < result.refreshObjectArray[info.menuItemId].chosenLinks.length; j++)
                            {
                                if(tab[i].url.includes(result.refreshObjectArray[info.menuItemId].chosenLinks[j]))
                                {
                                    tempArray6.push(tab[i].id);
                                }
                                else
                                {
                                    //do nothing
                                }
                            }
                        }
                    }
                    //Dette tar du lenger nede
                    else
                    {
                    //do nothing
                    }

                    console.log(tempArray6);
                    console.log(tempArray7);
                    var theTabsToActuallyRefresh1 = _.difference(tempArray7, tempArray6);
                    console.log(_.difference(tempArray7, tempArray6));

                    for(i = 0; i < theTabsToActuallyRefresh1.length; i++)
                    {
                        chrome.tabs.reload(theTabsToActuallyRefresh1[i], function(){
                            console.log("tabs refreshed!");
                        });
                    }
                });
            }
            //When Tabs isn't clicked
            else if(!alternativesArray.includes("allTabs"))
            {
                chrome.tabs.query({"currentWindow": windowType}, function(tab){
                console.log(tab);
                for(i = 0; i < tab.length; i++)
                {
                    for (let [key, value] of Object.entries(tab[i])) 
                    {
                        switch(key){
                            case "pinned":
                                if(value === true)
                                {
                                    if(pinned === true)
                                    {
                                        tabsArray.push(tab[i]);
                                    }
                                    else
                                    {
                                        //do nothing
                                    }
                                }
                                else
                                {
                                    // do nothing
                                }
                            break;
                            case "audible":
                                if(value === true)
                                {
                                    if(audible === true)
                                    {
                                        tabsArray.push(tab[i]);
                                    }
                                    else
                                    {
                                        //do nothing
                                    }
                                }
                                else
                                {
                                    // do nothing
                                }
                            break;
                            case "mutedInfo":
                                if(value.muted === true)
                                {
                                    if(muted === true)
                                    {
                                        tabsArray.push(tab[i]);
                                    }
                                    else
                                    {
                                        //do nothing
                                    }
                                }
                                else
                                {
                                    // do nothing
                                }
                            break;
                            default:
                            console.log("okay...");
                        }
                    }

                    //Add tabs with certain indexes into the tabsArray depending on what's inside the chosenTabs array
                    if(result.refreshObjectArray[info.menuItemId].chosenTabs === undefined || result.refreshObjectArray[info.menuItemId].chosenTabs.length === 0)
                    {
                        //do nothing
                    }
                    else
                    {
                        for(j = 0; j < result.refreshObjectArray[info.menuItemId].chosenTabs.length; j++)
                        {
                            console.log(typeof(tab[i].index));
                            console.log(typeof(parseInt(result.refreshObjectArray[info.menuItemId].chosenTabs[j])));
                            
                            if(result.refreshObjectArray[info.menuItemId].chosenTabs.length === 0)
                            {
                                //do nothing
                            }
                            else if(result.refreshObjectArray[info.menuItemId].chosenTabs.length > 0)
                            {
                                console.log("above zero!");
                                if(parseInt(result.refreshObjectArray[info.menuItemId].chosenTabs[j] - 1) === tab[i].index)
                                {
                                    tabsArray.push(tab[i]);
                                }
                                else
                                {
                                    //do nothing
                                }
                            }
                            else
                            {
                                console.log("below zero?");
                            }
                        }
                    }
                }

                //Get the links
                //Dette er tabs som du ønsker settingen
                if(result.refreshObjectArray[info.menuItemId].alternatives.includes("tabsWithSpecifiedLinks"))
                {
                    for(i = 0; i < tab.length; i++)
                    {
                        console.log(tab[i]);
                        for(j = 0; j < result.refreshObjectArray[info.menuItemId].chosenLinks.length; j++)
                        {
                            if(tab[i].url.includes(result.refreshObjectArray[info.menuItemId].chosenLinks[j]))
                            {
                                tabsArray.push(tab[i])
                            }
                            else
                            {
                                //do nothing
                            }
                        }
                    }
                }
                //Dette tar du lenger nede
                else
                {
                   //do nothing
                }
            console.log(tabsArray);
            console.log(result.refreshObjectArray[result.refreshObjectArray.length - 1]);
            
            for(i = 0; i < tabsArray.length; i++)
            {
                chrome.tabs.reload(tabsArray[i].id, {"bypassCache": refreshType}, function()
                {
                    console.log("refreshment done!");
                });
            }
            
        //Her lukkes den
            });
        }
    });
}

//This adds contextmenus based upon what's inside the chrome.storage
function refreshContextMenus() {
    chrome.contextMenus.removeAll(function() {
        chrome.contextMenus.create({"type": "normal", "title":"Remove All Refresh Profiles", "onclick": clearStorage});
        chrome.storage.sync.get("refreshObjectArray", function(result) {
            if(result.refreshObjectArray !== undefined)
            {
                for (i = 0; i < result.refreshObjectArray.length; i++) 
                    {
                        if(result.refreshObjectArray[i].name === "")
                        {
                            chrome.contextMenus.create({ "type": "normal", "id":i.toString(), "title": `${result.refreshObjectArray[i].chosenTabs} and ${result.refreshObjectArray[i].alternatives[0]}, ${result.refreshObjectArray[i].alternatives[1]}, ${result.refreshObjectArray[i].alternatives[2]},  ${result.refreshObjectArray[i].windowType}  ${result.refreshObjectArray[i].refreshType}`, "onclick": showThyself });
                            //chrome.contextMenus.create({ "type": "normal", "id":i.toString(), "title": `Nr. ${i} Go to the options page an name it something :)`, "onclick": showThyself });
                        }
                        else
                        {
                            chrome.contextMenus.create({ "type": "normal", "id":i.toString(), "title": `${result.refreshObjectArray[i].name}`, "onclick": showThyself });
                            //chrome.contextMenus.create({ "type": "normal", "id":i.toString(), "title": `Nr. ${i} Go to the options page an name it something :)`, "onclick": showThyself });
                        }
                    }
                }
            else
            {
                console.log("there is nothing in the storage!");
            }
        })
    });
}
refreshContextMenus();

//This we use to clear the entire chrome-storage, this is the same as removing all the context-menus
function clearStorage()
{
    var optionsPageId;
    chrome.storage.sync.clear(function(){
        chrome.tabs.query({"currentWindow": null}, function(tab){
            for(i = 0; i < tab.length; i++)
            {
                if(tab[i].url.includes("chrome-extension://"))
                {
                    chrome.tabs.reload(tab[i].id, function()
                    {
                        console.log("refreshment done!");
                    });
                }
                else
                {
                    //do nothing
                }
            }
        });
    });
}

//This runs when a user clicks on the add settings button.
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) 
    {
    refreshContextMenus();
    console.log(request);
    }
);
