$input.text({
  type: $kbType.number,
  handler: function(text) {
var wid = $device.info.screen.width
var hig = $device.info.screen.height
var arr = []
var q = text

if ($cache.get("idx") == undefined) {
  $cache.set("idx", 1)
  getinfo(1)
} else {
  getinfo($cache.get("idx") + 1)
}

$ui.render({
  type: "view",
  layout: $layout.fill,
  views: [{
    type: "list",
    props: {
      id: "stops"
    },
    layout: function(make, view) {
      make.top.left.right.equalTo(view.super)
      make.bottom.equalTo(view.super).inset(50)
    }
  }, {
    type: "view",
    props: {
      bgcolor: $color("#F9F9F9"),
      borderWidth: 1,
      borderColor: $color("#C1C1C0")
    },
    views: [{
      type: "button",
      props: {
        title: "换向"
      },
      layout: function(make, view) {
        make.center.equalTo(view.super)
        make.size.equalTo($size(50, 30))
      },
      events: {
        tapped: function() {
          let idx = ($cache.get("idx") + 1) % 2
          $cache.set("idx", idx)
          $("stops").data = []
          getinfo(idx + 1)
        }
      }
    }],
    layout: function(make, view) {
      make.bottom.equalTo(view.super)
      make.size.equalTo($size(wid, 50))
    }
  }]
})

function getinfo(idx) {
  $http.get({
    url: `http://wx.basbus.cn/SSGJ/m_search?linetype=${idx}&id=` + text,
    handler: function(resp) {
      var text = resp.data.replace(/\n|\s|\r/g, "")
      var info = text.match(/\"buslineinfo\">(\S*?)<\/body>/)[0]
      var eachinfo = info.match(/ul(\S*?)<\/ul>/g)
      var arr = new Array(0)

      for (let i = 0; i < eachinfo.length; i++) {
        var stop_ = eachinfo[i].match(/01"(\S*?)</g)
        var stop = stop_[0].replace(/01">/g, "").replace(/</g, "")
        if (getbus(eachinfo[i]) === 1) {
          stop = "🚌  " + stop
        }else {
          stop = "       " + stop
        }
        arr.push(stop)
      }
      arr = [{
        title: q + "公交",                                      
        rows: arr
      }]
      $("stops").data = arr
       }
     })
    }
  }
})
function getbus(data) {
  var bus = data.match(/huang/g)
  if (bus != null) {
    return 1
  } else {
    return 0
  }
}

