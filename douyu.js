$ui.loading(true)
  $http.post({
    url: "https://apiv2.douyucdn.cn/h5nc/sign/sendSign",
    header: {
      "Cookie": "",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E302, Douyu_IOS (4395784192) AliApp(TUnionSDK/0.1.7-SNAPSHOT)"
    },
    body: {},
    handler: function(resp) {
     let a = resp.data.data
     let b = resp.data.error
    $ui.loading(false)
    if(b==0)
    {
    alert({
      title: "签到日 • " + a.sign_today,
      message: "今日获得" + a.sign_cexp + "经验" + " 累计获得" + a.sign_exps + "经验" +  "\n已连续签到" + a.sign_md + "天"
    })
    }
    else if(b==6305)
    {
      alert("今日已签到，请勿重复签到")
    }
    else
    {
      alert("cookie已失效，请重新获取")
    }
  }
})