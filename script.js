var array = [];
var cont = 0;

function getId(id){
    for(let i=0; i<id.length; i++){
        $.ajax({
            async:false,
            url: `https://ishareteam3.na.xom.com/sites/SASADL/_vti_bin/listdata.svc/SharedDocuments(${id[i]})/FIInstanceToolTechnology?$select=Value`,
            type: "GET",
            dataType: 'json',            
            xhrFields: {
                withCredentials: true
            },
            success:function(data) {
                for(let j=0; j<data.d.results.length; j++){
                    array[cont] = data.d.results[j].Value
                    cont++;
                }
                
            }
        })
    }
    console.log(cont)
    return array;
}


var url = "https://ishareteam3.na.xom.com/sites/SASADL/_vti_bin/listdata.svc/SharedDocuments?$filter=FIDocTypeValue%20eq%27Training%27";
$(document).ready(function () {
    $.ajax({
        async:false,
        url: url,
        type: "GET",
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {           
            docs = data.d.results
            console.log(docs)          
            var html = '';
            var htmlFilter1='';
            var htmlFilter2='';
            var id = docs.map(e=>e.Id);
            auxfilter = getId(id);
            auxfilter2 = docs.map(e=>e.FITeamProcessScriptGroupValue)
            
            
            
            filter = [...new Set(auxfilter)]
            filter2 = [...new Set(auxfilter2)]
            console.log(array)

            let cont = 1;
            for (let i = 0; i < filter.length; i++) {               
                htmlFilter1 += '<li class="em-c-dropdown-check__item">'
                htmlFilter1 += '<label class="em-c-input-group em-c-checkbox--container " for="option-' + cont +'">'
                htmlFilter1 += '<input id="option-' + cont +'" type="checkbox" name="checkbox1" value="' + filter[i] + '" class="em-c-input-group__control">'
                htmlFilter1 +=  '<span class="em-c-checkbox--checkmark"></span>'
                htmlFilter1 +=  '<span class="em-c-input-group__text">' + filter[i] + '</span>'
                htmlFilter1 += '</label>'
                htmlFilter1 += '</li>'
                cont++;
            }
            $(".filter1").html(htmlFilter1);

            for (let i = 0; i < filter2.length; i++) {               
                htmlFilter2 += '<li class="em-c-dropdown-check__item">'
                htmlFilter2 += '<label class="em-c-input-group em-c-checkbox--container " for="option-' + cont +'">'
                htmlFilter2 += '<input id="option-' + cont +'" type="checkbox" name="checkbox2" value="' + filter2[i] + '" class="em-c-input-group__control">'
                htmlFilter2 +=  '<span class="em-c-checkbox--checkmark"></span>'
                htmlFilter2 +=  '<span class="em-c-input-group__text">' + filter2[i] + '</span>'
                htmlFilter2 += '</label>'
                htmlFilter2 += '</li>'
                cont++;
            }
            $(".filter2").html(htmlFilter2);

            for (let i = 0; i < docs.length; i++) {
                html += '<tr class="em-c-table__row ">'
                html += '<td class="em-c-table__cell " colspan="">' + docs[i].FileLeafRef + '<a style="text-decoration:none" href="' + docs[i].ServerRedirectedEmbedUrl + '"> <span><svg class="em-c-icon em-c-icon--medium"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://mysite.na.xom.com/personal/sa_jadpcar/UpstreamFileSearch/Shared%20Documents/projeto1/unity-1.6.0/images/24/em-icons.svg#download"></use></svg></span> </a>' + '</td>'
                html += '<td class="em-c-table__cell " colspan="">' + docs[i].FI_x0020_Doc_x0020_Type + '</td>'
                html += '<td class="em-c-table__cell " colspan="">' + docs[i].FI_x0020_Instance_x002C__x0020_Tool_x002C__x0020_Technology + '</td>'
                html += '<td class="em-c-table__cell " colspan="">' + docs[i].FI_x0020_Team_x002C__x0020_Process_x002C__x0020_Script_x0020_Group + '</td>'
                html += '<td class="em-c-table__cell " colspan="">' + docs[i].Editor[0].title + '</td>'
                html+= '</tr>'
            }
            $(".docs").html(html);
            
        }
    });
});