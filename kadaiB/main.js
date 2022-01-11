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


