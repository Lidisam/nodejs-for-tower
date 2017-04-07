      $(document).bind('touchmove', function(e) {
          if (e.target === document.documentElement) {
              return e.preventDefault();
              // 禁止滚动，防止在移动设备上发生滚动
          }
      });
      LC.setDefaultImageURLPrefix('image');

      var backgroundImage = new Image();
      backgroundImage.src = 'image/Chart Bar.png';
      //水印
      var watermarkImage = new Image();
      //watermarkImage.src = '/demo/watermark.png';
      // for testing watermark loading bug:
      //  watermarkImage.src = 'http://literallycanvas.com/_static/watermark.png'

      // 画板
      var containerOne = document.getElementById('content');
      var myImg;
      window.imgPoint = {
          x: 0,
          y: 0
      };
      window.imgSrc;
      window.imgs = [];
      myImg = (function() {
          myImg.prototype.name = 'myImg';

          myImg.prototype.iconName = 'img';

          function myImg() {
              this.strokeWidth = 5;
          }

          myImg.prototype.optionsStyle = 'stroke-width';

          myImg.prototype.begin = function(x, y, lc) {
              console.log("开始");
              $("#imgInput").modal("show");
              return;
          };

          myImg.prototype["continue"] = function(x, y, lc) {
              console.log("移动中");
              return;
          };

          myImg.prototype.end = function(x, y, lc) {
              //return lc.saveShape(this.currentShape);
              console.log("完成");
              imgPoint.x = x; //把鼠标放开时的x,y付给windows下的imgPoint
              imgPoint.y = y;
              return;
          };

          return myImg;

      })();

      var lc = window.lc = LC.init(containerOne, {
          backgroundShapes: [
              LC.createShape(
                  'Image', {
                      image: backgroundImage,
                      x: 100,
                      y: 100
                  })
          ],
          watermarkImage: null,
          imageSize: {
              width: document.body.clientWidth,
              height: document.body.clientHeight
          },
          tools: [ //这里定义需要用的工具
              LC.tools.Pencil, //画笔
              LC.tools.Eraser, //橡皮
              LC.tools.Line, //线
              LC.tools.Ellipse, //圆
              //LC.tools.MyLine,  # here it is!
              LC.tools.Rectangle, //方形
              LC.tools.Text, //文字
              LC.tools.Pan, //移动工具
              LC.tools.Eyedropper //取色器
              , myImg
          ]
      });


      $("#sureImg").click(function() {
          var reader = new FileReader();
          reader.onload = function(e) {
              var img = new Image(); //在内存中创建一个img对象
              img.src = e.target.result; //将解析的图片地址赋给图片对象
              lc.saveShape(LC.createShape('Image', { //创建一个image对象到
                  x: imgPoint.x,
                  y: imgPoint.y,
                  image: img
              }));
              imgs.push(img.src);
              $("#imgInput").modal("hide");
          };
          var file = $("#imgFile");
          file = file[0].files[0]; //获取第一个文件对象
          reader.readAsDataURL(file);
      });

      $("#imgInput").on("show.bs.modal", function(e) {
          if (imgs.length>0) {
              $("#imgs li").remove();
              for (var i = imgs.length - 1; i >= 0; i--) {
                  var html = "<li class='f'><img src='";
                  html += imgs[i] + "' style='width:100px;height:70px'></li>";
                  console.log(i);
                  $("#imgs").append(html);
              }
              $(".f img").click(function() {
                  var img = new Image();
                  img.src = this.src;
                  lc.saveShape(LC.createShape('Image', { //创建一个image对象到
                      x: imgPoint.x,
                      y: imgPoint.y,
                      image: img
                  }));
                  $("#imgInput").modal("hide");
              });
          }
      });
