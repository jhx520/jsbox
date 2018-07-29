$ui.loading(true)
  $http.post({
    url: "",
    header: {
      "Cookie": "",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E302 Weibo (iPhone7,2__weibo__8.1.0__iphone__os11.3.1)"
    },
    body: {},
    handler: function(resp) {
     let a = resp.data
     let b = resp.data.status
    $ui.loading(false)
    if(b==1)
    {
    alert({
      title: "今日已获得" + a.score + "积分"
    })
    }
    else if(b==2)
    {
      alert("今日已签到，请勿重复签到")
    }
    else
    {
      alert("cookie已失效，请重新获取")
    }
  }
})