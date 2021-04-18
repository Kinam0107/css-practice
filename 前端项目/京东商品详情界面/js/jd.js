/**
 * 1. 鼠标移入显示,移出隐藏
 *  目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
 * 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
 * 3. 输入搜索关键字, 列表显示匹配的结果
 * 4. 点击显示或者隐藏更多的分享图标
 * 5. 鼠标移入移出切换地址的显示隐藏
 * 6. 点击切换地址tab
 * 7. 鼠标移入移出切换显示迷你购物车
 * 8. 点击切换产品选项 (商品详情等显示出来)
 *
 * 9. 点击向右/左, 移动当前展示商品的小图片
 * 10. 当鼠标悬停在某个小图上,在上方显示对应的中图
 * 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
 */
$(function () {
  showHide()
  subMenu()
  search()
  share()
  address()
  minicart()
  products()
  movePic()
  midumImg()
  showBig()

  // 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
  function showBig() {
    var $medimImgContainer = $('#medimImgContainer')
    var $mediumImg = $('#mediumImg')
    var $mask = $('#mask')
    var $maskTop = $('#maskTop')
    var $largeImgContainer = $('#largeImgContainer')
    var $loading = $('#loading')
    var $largeImg = $('#largeImg')
    $maskTop.hover(function () {
      $mask.show()
      var maskWidth = $mask.width()
      var maskHeight = $mask.height()
      var largeImgWidth = 0
      var largeImgHeight = 0
      var src = $mediumImg.attr('src').replace('-m.', '-l.')
      $largeImg.attr('src', src)
      $largeImgContainer.show()
      $largeImg.on('load', function () {
        largeImgWidth = $(this).width()
        largeImgHeight = $(this).height()
        $largeImg.show()
        $loading.hide()
      })
      $(this).mousemove(function (e) {
        var left = maskWidth > 2 * e.offsetX ? 0 :
          maskWidth > 2 * (this.clientWidth - e.offsetX) ? this.clientWidth - maskWidth :
            e.offsetX - maskWidth / 2
        var top = maskHeight > 2 * e.offsetY ? 0 :
          maskHeight > 2 * (this.clientHeight - e.offsetY) ? this.clientHeight - maskHeight :
            e.offsetY - maskHeight / 2
        $mask.css({
          left: left,
          top: top
        })
        $largeImg.css({
          left: -left * (largeImgWidth - $largeImgContainer.width()) / ($medimImgContainer.width() - maskWidth),
          top: -top * (largeImgHeight - $largeImgContainer.height()) / ($medimImgContainer.height() - maskHeight)
        })
      })
    }, function () {
      $mask.hide()
      $largeImg.hide()
      $loading.show()
      $largeImgContainer.hide()
    })
  }

  // 10. 当鼠标悬停在某个小图上,在上方显示对应的中图
  function midumImg() {
    $("#icon_list > li").hover(function () {
      $(this).children('img').addClass('hoveredThumb')
      var srcMedium = $(this).children('img').attr('src').replace('.jpg', '-m.jpg')
      $("#mediumImg").attr('src', srcMedium)
    }, function () {
      $(this).children('img').removeClass('hoveredThumb')
    })
  }

  // 9. 点击向右/左, 移动当前展示商品的小图片
  function movePic() {
    var $backward = $('#preview > h1 > a:first')
    var $forward = $('#preview > h1 > a:last')
    var $iconList = $('#icon_list')
    var imgCount = $iconList.children('li').length
    var liWidth = $iconList.children(':first').width()
    var SHOW_COUNT = 5
    var moveCount = 0
    if (imgCount > SHOW_COUNT) {
      $forward.attr('class', 'forward')
    }
    $forward.click(function () {
      if (imgCount === SHOW_COUNT + moveCount) {
        return
      }
      moveCount++
      $backward.attr('class', 'backward')
      if (imgCount === SHOW_COUNT + moveCount) {
        $forward.attr('class', 'forward_disabled')
      }
      $iconList.css({
        left: -moveCount * liWidth
      })
    })
    $backward.click(function () {
      if (moveCount === 0) {
        return
      }
      moveCount--
      $forward.attr('class', 'forward')
      if (moveCount === 0) {
        $backward.attr('class', 'backward_disabled')
      }
      $iconList.css({
        left: -moveCount * liWidth
      })
    })
  }

  // 8. 点击切换产品选项 (商品详情等显示出来)
  function products() {
    $('#product_detail').children('ul').children('li').click(function () {
      var index = $(this).index()
      $(this).siblings().removeClass('current')
      $(this).addClass('current')
      $(this).parent().siblings('div:not(:first)').hide().eq(index).show()
    })
  }

  // 7. 鼠标移入移出切换显示迷你购物车
  function minicart() {
    $('#minicart').hover(function () {
      $(this).addClass('minicart').children('div').show();
    }, function () {
      $(this).removeClass('minicart').children('div').hide();
    })
  }

  // 5. 鼠标移入移出切换地址的显示隐藏
  function address() {
    $('#store_select').hover(function () {
      $(this).children(':gt(0)').show()
    }, function () {
      $(this).children(':gt(0)').hide()
    }).children(':last').click(function () {
      $(this).siblings(':gt(0)').hide()
    }).prevAll("#store_content").children('ul').children('li').click(function () {
      // 6. 点击切换地址tab
      $(this).siblings().removeClass('hover')
      $(this).addClass('hover')
    })
  }

  // 4. 点击显示或者隐藏更多的分享图标
  function share() {
    var isClose = true
    $("#shareMore").click(function () {
      if (isClose) {
        $(this).parent().css('width', 200)
        $(this).prevAll('a:lt(2)').show()
        $(this).children('b').addClass('backword')
        isClose = false
      } else {
        $(this).parent().css('width', 155)
        $(this).prevAll('a:lt(2)').hide()
        $(this).children('b').removeClass('backword')
        isClose = true
      }
    })
  }

  // 3. 输入搜索关键字, 列表显示匹配的结果
  function search() {
    // 1.写入数据的时候，出现智能提示
    // 2.失去焦点的时候，隐藏智能提示
    // 3.当输入框中有数据的时候，获得焦点 出现智能提示，
    // 4.当输入框中没有数据的时候，获得焦点 不出现智能提示
    $('#txtSearch').on("keyup focus", function () {
      var value = this.value.trim();
      if (value) {
        $("#search_helper").show()
      }
    }).blur(function () {
      $("#search_helper").hide()
    })
  }

  // 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
  function subMenu() {
    $('#category_items > .cate_item').hover(function () {
      $(this).children('.sub_cate_box').show()
    }, function () {
      $(this).children('.sub_cate_box').hide()
    })
  }

  // 1. 鼠标移入显示,移出隐藏
  function showHide() {
    $("[name=show_hide]").hover(function () {
      var id = this.id + '_items'
      $('#' + id).show()
    }, function () {
      var id = this.id + '_items'
      $('#' + id).hide()
    })
  }
})