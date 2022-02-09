var url = "https://ishareteam3.na.xom.com/sites/SASADL/_layouts/15/inplview.aspx?List={0FBC7136-CA5E-4CE8-A604-DCA428469F57}&View={6D3E31BE-C096-4FA5-9F77-0D36062D04A4}&ViewCount=25&IsXslView=TRUE&IsCSR=TRUE&Paged=FALSE&GroupString=%3B%23Training%3B%23&IsGroupRender=TRUE&WebPartID={6D3E31BE-C096-4FA5-9F77-0D36062D04A4}";
$(document).ready(function () {
    $.ajax({
        url: url,
        type: "POST",
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {           
            docs = data.Row           
            var html = '';
            var htmlFilter1='';
            var htmlFilter2='';
            auxfilter = data.Row.map(e=>e.FI_x0020_Instance_x002C__x0020_Tool_x002C__x0020_Technology)
            auxfilter2 = data.Row.map(e=>e.FI_x0020_Team_x002C__x0020_Process_x002C__x0020_Script_x0020_Group)
            
            for(let i = 1; i < auxfilter.length; i++){
                auxfilter[0] = auxfilter[0].concat(auxfilter[i])
            }
            filter = [...new Set(auxfilter[0])]
            filter2 = [...new Set(auxfilter2)]
            
            let cont = 1;
            for (let i = 0; i < filter.length; i++) {               
                htmlFilter1 += '<li class="em-c-dropdown-check__item">'
                htmlFilter1 += '<label class="em-c-input-group em-c-checkbox--container " for="option-' + cont +'">'
                htmlFilter1 += '<input id="option-' + cont +'" type="checkbox" name="' + filter[i] + '" value="' + filter[i] + '" class="em-c-input-group__control">'
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
                htmlFilter2 += '<input id="option-' + cont +'" type="checkbox" name="' + filter2[i] + '" value="' + filter2[i] + '" class="em-c-input-group__control">'
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