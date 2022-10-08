var listitem = 0;
function addToList(){
    if(listitem >= 4){
        listitem= 0;
    }
    var node = document.createElement("li");
    if(listitem == 0){
        var travelmode = "Planes";
    }
    if(listitem==1){
        var travelmode = "Trains";
    }
    if(listitem==2){
        var travelmode = "Automobiles";
    }
    if(listitem == 3){
        var travelmode = "Boats";
    }
    listitem++;
    var newnode= document.createElement("LI");
    var textnode = document.createTextNode(travelmode);
    newnode.appendChild(textnode);
    document.getElementById("transportation").appendChild(newnode);
}