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
            console.log(JSON.stringify(data));// need to show success
            docs = data.Row
            console.log(docs)
            var html = '';
            for (let i = 0; i < docs.length; i++) {
                html += '<h2>' + docs[i].FileLeafRef + '</h2>'
            }
            $(".docs").html(html);
            console.log(html);
        }
    });
});