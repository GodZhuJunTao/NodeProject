


//随机验证码
    function randomNumber(min, max) {
        return parseInt(Math.random() * (max - min + 1)) + min;
    }
    function randomColor(str) {
    //生成随机颜色
        if(str == 16) {
            //生成16进制的 '0123456789abcdef' #666677
            var str = '0123456789abcdef';
            var color = '#';
            for(var i = 0; i < 6; i++) {
                color += str.charAt(parseInt(Math.random() * str.length));
        }

            return color;
    
        } else if(str == 'rgb') {
            //rgb(255,255,0) 生成3个随机数，每个随机数应该在 0-255
            var r = parseInt(Math.random() * 256);
            var g = parseInt(Math.random() * 256);
            var b = parseInt(Math.random() * 256);
    
            return 'rgb(' + r + ',' + g + ',' + b + ')';
    
        } else {
            alert('参数传错了');
        }
    }
    function randomNum(){
    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //2.生成随机思维数有字母的验证码
    var num = str.charAt(parseInt(Math.random()*str.length));
    return num;
    }
function createPicCode(){
    console.log(123);
    for(i=0;i<4;i++){
    var html = randomNum();
    var color = randomColor(16);
    var foWeight = randomNumber(500,700);
    var foSize = randomNumber(20,30);
    $('#picCode span').eq(i).html(html).css({
    'color':color,'fontWeight':foWeight,'fontSize':foSize
    });
    }
    }
        createPicCode();
        $('#picCode').click(function(){
            createPicCode();
        });