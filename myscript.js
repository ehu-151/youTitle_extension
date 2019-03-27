//通知の設定
//ページリーロード時に通知をする
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  //ページのURLを取得
  var strUrl = String(tab.url);
  //通知の生成
  //statusがcompleteになった時に通知
  if (changeInfo.status == "complete" && isYoutubeTrack(strUrl)) {
    var thumbnailUrl = getThumbnailUrl(strUrl);
    var pageTitle= tab.title;
    //ページタイトルの余分な部分(末尾の" - Youtube")を削除する
    pageTitle=pageTitle.substr( 0, pageTitle.length-10);
    //通知開始
    creatNotification(thumbnailUrl,pageTitle);
  }
});

function isYoutubeTrack(url) {
  return (url.indexOf("youtube.com") !== -1) && (url.indexOf("watch?v=") !== -1)
}

//通知番号
function getNotificationId() {
  var id = Math.floor(Math.random() * 9007199254740992) + 1;
  return id.toString();
}


//通知の内容
//表示：タイトル、サムネイル画像
function creatNotification(thumbnailUrl, pageTitle){
      chrome.notifications.create(
        getNotificationId(),
        {
          type : 'basic',
          iconUrl : thumbnailUrl,
          title : pageTitle,
          message : 'YouTitleの通知',
          silent : true,
        },
        function(){})
}

//URLから動画IDを取得し、サムネイル画像のURLを返す関数
function getThumbnailUrl(strUrl){
  //例：https://www.youtube.com/watch?v=  動画ID  &list~~~
  //動画IDの部分を抜き出す
  //「&」がないデフォルトのURLの場合分け
  var lastMovieIdUrl =100;
  if (strUrl.indexOf("&") !== -1) {
    lastMovieIdUrl = strUrl.indexOf("&");
  }
  //動画IDの切り抜き
  var movieID = strUrl.substring(32 , lastMovieIdUrl);
  //サムネイル画像のURLの作成
  //Youtube標準のサムネイル画像を指定
  var thumbnailUrl = "http://i.ytimg.com/vi/" + movieID + "/default.jpg";

  return thumbnailUrl;
}
