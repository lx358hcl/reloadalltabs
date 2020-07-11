//Variables
var windowTypeChoice;
var refreshTypeChoice;

//Brukes ikke enda
var mutedChoice;
var pinnedChoice;
var audibleChoice;
var specifiedTabsChoice;
var tabsWithSpecifiedLinksChoice;

var specifiedTabs = document.getElementById("specifiedTabs");
var specifiedTabsInput = document.getElementById("specifiedTabsInput");
var notSpecifiedTabsInput = document.getElementById("notSpecifiedTabsInput");
var tabsWithSpecifiedLinksInput = document.getElementById("tabsWithSpecifiedLinksInput");
var notTabsWithSpecifiedLinksInput = document.getElementById("notTabsWithSpecifiedLinksInput");

specifiedTabsInput.addEventListener("input", checkIt1, false);
notSpecifiedTabsInput.addEventListener("input", checkIt2, false);
tabsWithSpecifiedLinksInput.addEventListener("input", checkIt3, false);
notTabsWithSpecifiedLinksInput.addEventListener("input", checkIt4, false);

function checkIt1(event)
{
    if(event.target.value === "" || event.target.value === null || event.target.value === "undefined")
    {
        specifiedTabs.checked = false;
    }
    else if(event.target.value !== "")
    {
        specifiedTabs.checked = true;
    }
}

function checkIt2(event)
{
    if(event.target.value === "" || event.target.value === null || event.target.value === "undefined")
    {
        notSpecifiedTabs.checked = false;
    }
    else if(event.target.value !== "")
    {
        notSpecifiedTabs.checked = true;
    }
}

function checkIt3(event)
{
    if(event.target.value === "" || event.target.value === null || event.target.value === "undefined")
    {
        tabsWithSpecifiedLinks.checked = false;
    }
    else if(event.target.value !== "")
    {
        tabsWithSpecifiedLinks.checked = true;
    }
}

function checkIt4(event)
{
    if(event.target.value === "" || event.target.value === null || event.target.value === "undefined")
    {
        notTabsWithSpecifiedLinks.checked = false;
    }
    else if(event.target.value !== "")
    {
        notTabsWithSpecifiedLinks.checked = true;
    }
}

var alternatives = document.getElementsByClassName("alternatives");
var allTabsAlternatives = document.getElementsByClassName("allTabsAlternatives");

var currentInput;

//Storing some elements in their variables and adding some EventListeners
var addRefreshSettingsButton = document.getElementById("addRefreshSettingsButton");
addRefreshSettingsButton.addEventListener("click", addRefreshSettings, false);

//This are mandatory to choose before Adding Any Settings
var windowType = document.getElementsByClassName("windowType");
var refreshType = document.getElementsByClassName("refreshType");

//This is the ordered list-element
var savedSettings = document.getElementById("savedSettings");

//This is the id of the allTabs checkbox
var allTabs = document.getElementById("allTabs");

//This is the array of buttons with className "deleteButtons"
var deleteButtons = document.getElementsByClassName("deleteButtons");

//Listening for the allTabs-checkbox click.
allTabs.addEventListener("click", toTheAlternatives, false);

for(i = 0; i < alternatives.length; i++)
{
    alternatives[i].addEventListener("click", toTheAlternatives, false);
}

for(i = 0; i < allTabsAlternatives.length; i++)
{
    allTabsAlternatives[i].addEventListener("click", toTheAlternatives, false);
}

var name = [];
var tempObject;

function addName(event)
{
    chrome.storage.sync.get(["refreshObjectArray","def"], function(result)
    {
        name = prompt("Pick a name:");

        if(name === "null" || name === "" || name === "undefined" || name === undefined || name === null )
        {
            //do nothing
        }
        else if(typeof(name) === "string")
        {
            for(i = 0; i < result.refreshObjectArray.length; i++)
            {
                if(result.refreshObjectArray[i].id === parseInt(event.target.id))
                {
                    var tempDef = result.def;
                    tempObject = result.refreshObjectArray[i];
                    tempObject.name = name;
                    var refreshObjectArray = _.pull(result.refreshObjectArray, result.refreshObjectArray[i])
                    refreshObjectArray.push(tempObject);

                    chrome.storage.sync.clear(function()
                    {
                        chrome.storage.sync.set({ refreshObjectArray, def:tempDef }, function() {
                            console.log("New array added!");
                            chrome.runtime.sendMessage({on:"1"});
                            location.reload();
                        });
                    });
                }
                else
                {
                    console.log("I'm doing nothing");
                    // do nothing
                }
            }
        }
    });
}


//This is for the button, that deletes a Refresh-Setting entry
function deleteSetting(event)
{
    chrome.storage.sync.get(["refreshObjectArray", "def"], function(result)
    {
        console.log(result.refreshObjectArray);
        console.log(typeof(result.refreshObjectArray[0].id));
        console.log(typeof(parseInt(event.target.id)));
        console.log(typeof(changedArray));

        for(i = 0; i < result.refreshObjectArray.length; i++)
        {
            if(result.refreshObjectArray[i].id === parseInt(event.target.id))
            {
                var tempDef = result.def;
                var refreshObjectArray = _.pull(result.refreshObjectArray, result.refreshObjectArray[i])

                chrome.storage.sync.clear(function()
                {
                    chrome.storage.sync.set({ refreshObjectArray, def:tempDef }, function() {
                        console.log("New array added!");
                        chrome.runtime.sendMessage({on:"1"});
                        location.reload();
                    });
                });
            }
            else
            {
                console.log("I'm doing nothing");
                // do nothing
            }
        }
    });
}

//When the All Tabs checkbox is clicked, toggle possible options
function toTheAlternatives(event) {
    if(event.target.id === "allTabs")
    {
        if(allTabs.checked === true)
        {
            //for(i = 0; i < allTabsAlternatives.length; i++)
            //{
            //    allTabsAlternatives[i].checked = false;
            //}
            for(i = 0; i < alternatives.length; i++)
            {
                alternatives[i].checked = false;
            }
            allTabs.checked = true;
        }
        else if(allTabs.checked === false)
        {
            for(i = 0; i < allTabsAlternatives.length; i++)
            {
                allTabsAlternatives[i].checked = false;
            }
            allTabs.checked = false;
        }
    }
    else if(event.target.name === "alternatives" && event.target.id !== "allTabs")
    {
        if(allTabs.checked === true)
        {
            for(i = 0; i < allTabsAlternatives.length; i++)
            {
                allTabsAlternatives[i].checked = false;
            }
            allTabs.checked = false;
        }
        else if(allTabs.checked === false)
        {
            for(i = 0; i < allTabsAlternatives.length; i++)
            {
                //allTabsAlternatives[i].disabled = true;
                allTabsAlternatives[i].checked = false;
            }
        }
    }
    else if(event.target.name === "allTabsAlternatives")
    {
        for(i = 0; i < alternatives.length; i++)
        {
            alternatives[i].checked = false;
        }
        allTabs.checked = true;
    }
}

function setDefault(event)
{
    chrome.storage.sync.get("refreshObjectArray", function(result)
    {
        for(i = 0; i < result.refreshObjectArray.length; i++)
        {
            if(result.refreshObjectArray[i].id === parseInt(event.target.id))
            {
                var def;
                def = result.refreshObjectArray[i].id;
                chrome.storage.sync.set({def},function(){
                    location.reload();
                });
            }
            else
            {
                //do nothing
            }
        }
    });
}

//This runs every time the Options-HTML-page is loaded/refreshed/opened
(function update() {
    chrome.storage.sync.get(["refreshObjectArray", "def"], function(result) {
        console.log(result.def);

        if(result.refreshObjectArray !== undefined)
        {
            for(i = 0; i < result.refreshObjectArray.length; i++)
            {
                if(result.refreshObjectArray[i].name === "")
                {
                    //AddNameButton
                    var addNameButton = document.createElement("button");
                    var addNameButtonText = document.createTextNode("Change Name");
                    addNameButton.appendChild(addNameButtonText);
                    addNameButton.setAttribute("id", result.refreshObjectArray[i].id);
                    addNameButton.addEventListener("click", addName, false);

                    //DeleteButton
                    var button = document.createElement("button");
                    var buttonText = document.createTextNode("Delete");
                    button.appendChild(buttonText);
                    button.setAttribute("class", "deleteButtons");
                    button.addEventListener("click", deleteSetting, false);
                    button.setAttribute("id", result.refreshObjectArray[i].id);

                    //Use as DefaultButton
                    if(result.refreshObjectArray[i].id === parseInt(result.def))
                    {
                        var def;
                        def = result.refreshObjectArray[i].id;
                        var useAsDefault = document.createElement("button");
                        var useAsDefaultText = document.createTextNode("This is set to Default");
                        useAsDefault.appendChild(useAsDefaultText);
                        useAsDefault.addEventListener("click", setDefault, false);
                        useAsDefault.setAttribute("id", result.refreshObjectArray[i].id);
                        useAsDefault.style.backgroundColor = "#92e9a1";
                    }
                    else
                    {
                        console.log("ok");
                        var useAsDefault = document.createElement("button");
                        var useAsDefaultText = document.createTextNode("Use as default");
                        useAsDefault.appendChild(useAsDefaultText);
                        useAsDefault.addEventListener("click", setDefault, false);
                        useAsDefault.setAttribute("id", result.refreshObjectArray[i].id);
                    }
                    
                    //ListItem Stuff
                    var li = document.createElement("li");
                    var textNode = document.createTextNode(" " + JSON.stringify(result.refreshObjectArray[i]));
                    li.setAttribute("class", "li");
                    li.appendChild(button);
                    li.appendChild(addNameButton);
                    li.appendChild(useAsDefault);
                    li.appendChild(textNode);
                    savedSettings.appendChild(li);
                }
                //En profil har kun ett navn, derfor er det null i indeksen
                else if(result.refreshObjectArray[i].name !== "")
                {   
                    console.log(result.refreshObjectArray[i].name)
                    //AddNameButton
                    var addNameButton = document.createElement("button");
                    var addNameButtonText = document.createTextNode("Change Name");
                    addNameButton.appendChild(addNameButtonText);
                    addNameButton.setAttribute("id", result.refreshObjectArray[i].id);
                    addNameButton.addEventListener("click", addName, false);

                    //DeleteButton
                    var button = document.createElement("button");
                    var buttonText = document.createTextNode("Delete");
                    button.appendChild(buttonText);
                    button.setAttribute("class", "deleteButtons");
                    button.addEventListener("click", deleteSetting, false);
                    button.setAttribute("id", result.refreshObjectArray[i].id);

                    if(result.refreshObjectArray[i].id === parseInt(result.def))
                    {
                        var def;
                        def = result.refreshObjectArray[i].id;
                        var useAsDefault = document.createElement("button");
                        var useAsDefaultText = document.createTextNode("This is set to Default");
                        useAsDefault.appendChild(useAsDefaultText);
                        useAsDefault.addEventListener("click", setDefault, false);
                        useAsDefault.setAttribute("id", result.refreshObjectArray[i].id);
                        useAsDefault.style.backgroundColor = "#92e9a1";
                    }
                    else
                    {
                        var useAsDefault = document.createElement("button");
                        var useAsDefaultText = document.createTextNode("Use as default");
                        useAsDefault.appendChild(useAsDefaultText);
                        useAsDefault.addEventListener("click", setDefault, false);
                        useAsDefault.setAttribute("id", result.refreshObjectArray[i].id);
                    }

                    //ListItem Stuff
                    var li = document.createElement("li");
                    var textNode = document.createTextNode(" " + result.refreshObjectArray[i].name);
                    li.setAttribute("class", "li");
                    li.appendChild(button);
                    li.appendChild(addNameButton);
                    li.appendChild(useAsDefault);
                    li.appendChild(textNode);
                    savedSettings.appendChild(li);
                }
            }
        }
        else
        {
            //do nothing
        }
    });
}())

//This function is called when you click on the "Add Refresh Setting" on the Options Page
function addRefreshSettings() {
    //RefreshType-assignment
    for (i = 0; i < refreshType.length; i++) {
        if (refreshType[i].checked === true) {
            refreshTypeChoice = refreshType[i].value;
        } else {
            //do nothing
        }
    }

    //WindowType-assignment
    for (i = 0; i < windowType.length; i++) {
        if (windowType[i].checked === true) {
            windowTypeChoice = windowType[i].value;
        } else {
            //do nothing
        }
    }
    //Alternatives-assignment
    //For specifiedTabs
    //For alternatives
    var alternativesArray = [];
    console.log(alternatives);

    //Alternatives
    for(i = 0; i < alternatives.length; i++)
    {
        if(alternatives[i].checked === true)
        {
            alternativesArray.push(alternatives[i].value);
        }
        else
        {
            // do nothing
        }
    }

    var allTabsAlternativesArray = [];
    //AllTabs Alternatives
    for(i = 0; i < allTabsAlternatives.length; i++)
    {
        if(allTabsAlternatives[i].checked === true)
        {
            allTabsAlternativesArray.push(allTabsAlternatives[i].value);
        }
        else
        {
            // do nothing
        }
    }

    console.log(allTabsAlternativesArray);

    console.log(alternativesArray);
    var tempArray = [];
    var tempArrayLinks = [];
    var chosenTabs;
    var chosenLinks;
    
    //Så looper vi igjennom alternativesArray og finner specified tabs tingen
    for(i = 0; i < alternativesArray.length; i++)
    {
        console.log(alternativesArray[i]);
        if(alternativesArray[i] === "specifiedTabs")
        {
            chosenTabs = specifiedTabsInput.value.split(",");
            console.log(chosenTabs);

            tempArray = [];
            for (j = 0; j < chosenTabs.length; j++) {
                tempArray.push(parseInt(chosenTabs[j]) - 1);
            }
            console.log(tempArray);
        }
        else if(alternativesArray[i] === "tabsWithSpecifiedLinks")
        {
            chosenLinks = tabsWithSpecifiedLinksInput.value.split(",");
            console.log(chosenLinks);
            
            tempArrayLinks = [];
            for (j = 0; j < chosenLinks.length; j++) {
                tempArrayLinks.push(chosenLinks[j]);
            }
            console.log(chosenLinks);
        }
        else
        {
            // do nothing
        }
    }

    //Så looper vi igjennom allTabsAlternatives og finner specified tabs tingen
    for(i = 0; i < allTabsAlternativesArray.length; i++)
    {
        console.log(allTabsAlternativesArray[i]);
        if(allTabsAlternativesArray[i] === "notSpecifiedTabs")
        {
            chosenTabs = notSpecifiedTabsInput.value.split(",");
            console.log(chosenTabs);

            tempArray = [];
            for (j = 0; j < chosenTabs.length; j++) {
                tempArray.push(parseInt(chosenTabs[j]) - 1);
            }
            console.log(tempArray);
        }
        else if(allTabsAlternativesArray[i] === "notTabsWithSpecifiedLinks")
        {
            chosenLinks = notTabsWithSpecifiedLinksInput.value.split(",");
            console.log(chosenLinks);
            
            tempArrayLinks = [];
            for (j = 0; j < chosenLinks.length; j++) {
                tempArrayLinks.push(chosenLinks[j]);
            }
            console.log(chosenLinks);
        }
        else
        {
            // do nothing
        }
    }

    //Store the RefreshSetting-Object inside the ChromeStorage
    chrome.storage.sync.get("refreshObjectArray", function(result) {
        if (refreshTypeChoice === undefined || windowTypeChoice === undefined || alternativesArray.length === 0) {
            alert("You can't add a refresh-profile without having selected at least a Refresh Type, a Window Type and an Alternative!");
        } 
        else 
        {
            if (result.refreshObjectArray === undefined || result.refreshObjectArray.length === 0) 
            {
                var refreshObjectArray = [];
                var refreshObject = { id:0, refreshType: refreshTypeChoice, windowType: windowTypeChoice, alternatives: alternativesArray, chosenTabs: chosenTabs, allTabsAlternatives: allTabsAlternativesArray, chosenLinks:chosenLinks, name:name};
                refreshObjectArray.push(refreshObject);
                chrome.storage.sync.set({ refreshObjectArray }, function() {
                
                });
                chrome.runtime.sendMessage({on:"1"});
            } 
            else if (result.refreshObjectArray !== undefined) 
            {
                console.log(result.refreshObjectArray[result.refreshObjectArray.length - 1].id);
                var ide = result.refreshObjectArray[result.refreshObjectArray.length - 1].id;
                ide = ide + 1;
                var refreshObjectArray = result.refreshObjectArray;
                                                                                                                                            //HUSK AT CHOSENTABS er hvilke tabs brukern har selv valgt, de blir ikke lagret der lol
                var refreshObject = {id: ide, refreshType: refreshTypeChoice, windowType: windowTypeChoice, alternatives: alternativesArray, chosenTabs: chosenTabs, allTabsAlternatives: allTabsAlternativesArray, chosenLinks:chosenLinks, name:name};
                refreshObjectArray.push(refreshObject);
                chrome.storage.sync.set({ refreshObjectArray }, function() {
                
                console.log(refreshObjectArray[refreshObjectArray.length - 1]);
                chrome.runtime.sendMessage({on:"1"});
                });
            }
            else
            {
                alert("If you get this message, that means that something weird is going on with the extension. Please send a message to me on Github and I'll fix it asap! Thank you :)");
            }
        }
    });
    location.reload();
}

//Get the version of the extension and print it on the page
var manifestData = chrome.runtime.getManifest();
var version = document.getElementById("version");
version.textContent =`(ver. ${manifestData.version})`;

var keyboardShortcut = document.getElementById("keyboardShortcut");
function checkKeyboardShortcut()
{
    chrome.commands.getAll(function (commandsArray){
        keyboardShortcut.textContent = commandsArray[0].shortcut;
    });
}
checkKeyboardShortcut();