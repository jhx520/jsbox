$ui.loading(true)
  $http.post({
    url: "http://webapi.115.com/user/sign",
    header: {
      "Cookie": "",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E302 UDown/8.0.5"
    },
    body: {},
    handler: function(resp) {
      let a = resp.data.state
    $ui.loading(false)
      if(a==true)
      {
      alert("已签到")
      }
      else
      {
      alert("签到失败，请重新获取cookie")
      }
   }
})