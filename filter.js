function getCheckedBoxes(chkboxName) {
    var checkboxes = document.getElementsByName(chkboxName);
    var checkboxesChecked = [];
    // loop over them all
    for (var i=0; i<checkboxes.length; i++) {
       // And stick the checked ones onto an array...
       if (checkboxes[i].checked) {
          checkboxesChecked.push(checkboxes[i]);
       }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
  }



$(".click").click(function(){
    var FIInstance = getCheckedBoxes('checkbox1')
    console.log(FIInstance)
    var FITeam = getCheckedBoxes('checkbox2')
    console.log(FITeam)

var url = "https://ishareteam3.na.xom.com/sites/SASADL/_layouts/15/inplview.aspx?List={0FBC7136-CA5E-4CE8-A604-DCA428469F57}&View={6D3E31BE-C096-4FA5-9F77-0D36062D04A4}&ViewCount=25&IsXslView=TRUE&IsCSR=TRUE&Paged=FALSE&GroupString=%3B%23Training%3B%23&IsGroupRender=TRUE&WebPartID={6D3E31BE-C096-4FA5-9F77-0D36062D04A4}";
    $.ajax({
        url: url,
        type: "POST",
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            docs = data.Row
            console.log(docs[0].FI_x0020_Instance_x002C__x0020_Tool_x002C__x0020_Technology)
            var html = '';
            var result1, result2;
            for (let i = 0; i < docs.length; i++) {
                if(FIInstance){
                    for(let j = 0; j < FIInstance.length; j++){
                        for(let k = 0; k < docs[i].FI_x0020_Instance_x002C__x0020_Tool_x002C__x0020_Technology.length; k++){
                            result1 = docs[i].FI_x0020_Instance_x002C__x0020_Tool_x002C__x0020_Technology[k].toLowerCase().includes(FIInstance[j].value.toLowerCase());
                            if(result1)
                            break;
                        }
                    }
                }
                
                if(FITeam) {
                    for(let j = 0; j < FITeam.length; j++){
                        result2 = docs[i].FI_x0020_Team_x002C__x0020_Process_x002C__x0020_Script_x0020_Group.toLowerCase().includes(FITeam[j].value.toLowerCase());
                        if(result2)
                        break;
                    }
                }
                
                
                if(result1 || result2){
                    console.log("aqui tbm");
                    html += '<tr class="em-c-table__row ">'
                    html += '<td class="em-c-table__cell " colspan="">' + docs[i].FileLeafRef + '<a href="' + docs[i].ServerRedirectedEmbedUrl + '"> <span><svg class="em-c-icon em-c-icon--medium"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mysite.na.xom.com/personal/sa_jadpcar/UpstreamFileSearch/Shared%20Documents/projeto1/unity-1.6.0/images/24/em-icons.svg#download"></use></svg></span> </a>' + '</td>'
                    html += '<td class="em-c-table__cell " colspan="">' + docs[i].FI_x0020_Doc_x0020_Type + '</td>'
                    html += '<td class="em-c-table__cell " colspan="">' + docs[i].FI_x0020_Instance_x002C__x0020_Tool_x002C__x0020_Technology + '</td>'
                    html += '<td class="em-c-table__cell " colspan="">' + docs[i].FI_x0020_Team_x002C__x0020_Process_x002C__x0020_Script_x0020_Group + '</td>'
                    html += '<td class="em-c-table__cell " colspan="">' + docs[i].Editor[0].title + '</td>'
                    html+= '</tr>'
                }
            }
            $(".docs").html(html);
            console.log(html);
        }
    });
});