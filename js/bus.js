var url = 'http://ws.bus.go.kr/api/rest/busRouteInfo/getBusRouteList'; /*URL*/
var ServiceKey = "7eD5be%2Fby%2FPLL5EeqoTnJ8j3G%2FZQMxo5gzGl5h0r63ed2YgArMVYY%2BBi0Na4LYHcDCXhULdEO2%2F8vFInRJT3Mw%3D%3D";
var params = '?' + encodeURIComponent('ServiceKey') + '=' + ServiceKey; /*Service Key*/

$("#ok").on("click", function () {
    var Id = $('#search').val(); // 버스 노선 검색 번호 받아서 넘기기
    Search(Id);
});

function Search(Id) {
    var bus = Id;
    params += '&' + encodeURIComponent('strSrch') + '=' + encodeURIComponent(bus); /*검색할 노선번호*/
    url += params;
    var num = 0;
    var busRouteNm;
    // 검색한 xml 안에서 출력하고 싶은거 받기
    $.get(url, function (res) {
        var items = $(res).find("itemList");
        for (var i = 0; i < items.length; i++) {
            console.log(items[i]);
            busRouteNm = $(items[i]).find("busRouteNm").text(); //버스번호
            if (bus != busRouteNm) {
                alert("입력하신 버스 정보를 찾을 수 없습니다.");
                num = 1;
                if(num == 1){
                    Stop();
                    break;
                }
            } else if (bus == busRouteNm) {
                StartBus(url);
            }
        }
    });
}

function Stop() {
    location.reload();
}

function StartBus(url) {
    var bus = url;
    $(".view1").css({ "display": "none" });
    $(".view2").html("");
    // 검색한 xml 안에서 출력하고 싶은거 받기
    $.get(bus, function (res) {
        var items = $(res).find("itemList");
        for (var i = 0; i < items.length; i++) {
            console.log(items[i]);
            var stStationNm = $(items[i]).find("stStationNm").text(); //기점
            var edStationNm = $(items[i]).find("edStationNm").text(); //종점  
            var corpNm = $(items[i]).find("corpNm").text(); //운수
            var routeType = $(items[i]).find("routeType").text(); //노선유형
            var busRouteNm = $(items[i]).find("busRouteNm").text(); //버스번호
            var busRouteId = $(items[i]).find("busRouteId").text(); //노선 ID
            var img;
            if (routeType == 1) { routeType = "공항버스"; img = "./img/1.png"; }
            else if (routeType == 2) { routeType = "마을버스"; img = "./img/24.png"; }
            else if (routeType == 3) { routeType = "간선버스"; img = "./img/37.png"; }
            else if (routeType == 4) { routeType = "지선버스"; img = "./img/24.png"; }
            else if (routeType == 5) { routeType = "순환버스"; img = "./img/5.png"; }
            else if (routeType == 6) { routeType = "광역버스"; img = "./img/6.png"; }
            else if (routeType == 7) { routeType = "인천버스"; img = "./img/37.png"; }
            else if (routeType == 8) { routeType = "경기버스"; img = "./img/8.png"; }
            else if (routeType == 9) { routeType = "폐지버스"; img = "./img/9.png"; }
            else if (routeType == 0) { routeType = "공용버스"; img = "./img/0.png"; }
            var view = "<div class=\"bg-img2\">";
            view += "<img src=" + img + "></div>";
            view += "<div class=\"main2\"><div class=\"main2-box\"><h1>" + busRouteNm + "</h1>";
            view += "<p>" + "기점 : " + stStationNm + "</p>";
            view += "<p>" + "종점 : " + edStationNm + "</p>";
            view += "<p>" + "운수사 : " + corpNm + "</p>";
            view += "<p>" + "노선유형 : " + routeType + "</p>";
            view += "</div></div>";
            $(".view2").append(view);
        }
    });
}
