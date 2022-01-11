//機能1
let myHeading = document.querySelector('h1');

function setCookie(cname,cvalue,exdays) {//使いたいクッキーの名前、入れたい値、何日間有効のクッキーとしたいか
  var d = new Date();//組み込みクラスDateを使って、この瞬間のオブジェクトを表すものを作る
  d.setTime(d.getTime() + (exdays*24*60*60*1000));//ある時点からの値をもらってきて、そこにexdays日分足して、その値をdにセット
  var expires = "expires=" + d.toGMTString();//"expires=" + 全世界共通の表現 （このクッキーはいつまで有効か）
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";//サーバーのどこで使っていいか
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

window.onload = function checkCookie() {
  var user=getCookie("userName");
  console.log(user);
  if (user != "" ) {
    myHeading.innerHTML = "こんにちは" + user + "さん";
  } else {//クッキーがない場合
     user = prompt("はじめまして。名前を教えてください:");
     if (user != "" && user != null) {
       setCookie("userName", user, 10);
     }
  }
}


//機能2
function initMap() {
      var myOptions = {
        zoom: 8,
        center: {lat: 53.480759, lng: -2.242631},
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        disableDefaultUI: true,
        // Step 4. Customize displayed controls
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true
      }
      var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

      // Step 2. Add custom icon
      //Google上にアイコン(白い部分は透明）が置いてある場所
      var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

      var marker = new google.maps.Marker({
        position: {lat: 53.480759, lng: -2.242631},//地図上のどこに置きたいか
        icon: iconBase + 'flag_maps.png',//文字列の連結. パス+ファイル名→アイコンの置いてある場所
        map: map//map(文字列） : map（変数 30行目)　どの地図に表示するか
      });

      // Step 3. Add info window

      var contentString = '<div id="content"><h2 id="firstHeading" class="firstHeading">Custom info window</h2><p>This is a cool custom info window.</p></div>';

      var infowindow = new google.maps.InfoWindow({//インフォウィンドウメソッドを使ってインスタンスを作る(中身は44行目)
        content: contentString
      });

      marker.addListener('click', function() {//イベントハンドラー 旗を押したならばこの関数を起動してください(名前なしの関数
        infowindow.open(map, marker);//infowindowが開く マップの上のマーカーに結びつける
      });
    }
