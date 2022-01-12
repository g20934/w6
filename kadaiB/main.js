//機能1
let myHeading = document.querySelector('h2');

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

window.onload = function checkCookie() {//画像など全て読み込んでから実行する
  var user=getCookie("userName");//11行目からの関数を呼び出す
  console.log(user);
  if (user != "" ) {//もしクッキーがあったら
    myHeading.innerHTML = "今日は" + user + "さん";//表示する
  } else {//クッキーがない場合
     user = prompt("はじめまして。名前を教えてください:");
     if (user != "" && user != null) {
       setCookie("userName", user, 10);//4行目からの関数を呼び出す. クッキー名はuserName, 値は変数userに入っているもの, 有効期限は10日間とした
     }
  }
}


//機能2
function initMap() {
      var myOptions = {//オブジェクトで初期化
        zoom: 16,//辞書形式(JSON形式）　key:value keyとvalueの値をペアにする（値はどんな型でもOK）
        center: {lat: -33.8564976041549, lng: 151.21525626976288},//緯度約-33度, 経度151度（オーストラリア オペラハウス　)
        mapTypeId: google.maps.MapTypeId.TERRAIN,//google.mapsが決めているTERRAINという値
        disableDefaultUI: true,//ユーザーインターフェースをどうするか。今回は付けなくていいよという指定
        
        // Step 4. Customize displayed controls
        zoomControl: true,//ズームコントローラを表示するかどうか
        mapTypeControl: true,//地図の種類を変更できる, マップタイプ・コントローラの表示を表示するかどうか
        scaleControl: true//地図のスケールコントローラを表示するかどうか
      }
      //「idがmap_canvasであるところにマップオブジェクトを作って欲しい」とOption(web上に表示するために必要な最低限条件）を入れてインスタンス(マップオブジェクト）を作っている
      var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

      // Step 2. Add custom icon
      //Google上にアイコン(png形式, 白い部分は透明）が置いてある場所
      var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

      var marker = new google.maps.Marker({
        position: {lat: -33.8564976041549, lng: 151.21525626976288},//地図上のどこに置きたいか-33.856125088797576, 151.2150392079342
        icon: iconBase + 'flag_maps.png',//文字列の連結. パス+ファイル名→アイコンの置いてある場所
        map: map//map(文字列） : map（変数 55行目)　どの地図に表示するか
      });

      // Step 3. Add info window
      //文字列
      var contentString = '<div id="content"><h2 id="firstHeading" class="firstHeading">オペラハウス</h2><<dl><dt>その地点に関する説明</dt><dd>オペラハウスはオーストラリアのシドニーにある建築物である。2007年に世界文化遺産に登録された。完成まで14年かかった。近くにはハーバーブリッジという、とても大きな橋がある。</dd><dt>興味をもった理由</dt><dd>高校生の時に初めてオーストラリアに行った。オペラハウスは屋根の形がとても特徴的で、1番印象に残っているから。近くに大きな橋があるが、日本にある橋よりもとても大きくて驚いた。海外に行けるようになったら、また行きたいと思っている。</dd></dl>/div>';

      var infowindow = new google.maps.InfoWindow({//インフォウィンドウクラス(Google Maps API)を使ってインスタンスを作る(中身は69行目)
        content: contentString
      });

      marker.addListener('click', function() {//イベントハンドラー 旗を押したならばこの関数を起動してください(名前なしの関数)と登録
        infowindow.open(map, marker);//infowindowが開く マップの上のマーカーに結びつける
      });
    }
