$(function(){
var $ = jQuery;
//baseUrl = 'http://192.168.137.1:8080/gzpsc/' // '/gzpsc/';//'http://localhost/gzpsc/';
gb.modal.tip_small.init();
gb.modal.loading.init();
 // 仪表盘
const  gaugeX  = 100
const gaugeY = 80
const gaugeR = 60
const deg = Math.PI / 180

var gaugeData = new Vue({
    el: "#left",
    data: {
        region: '',
        gaugeNum: [
            {
                name: "global", 
                invest: {
                    title: '投资完成率',
                    now: 21
                },
                progress: {
                    title: '进度',
                    now:  34.8
                },
                rotation: {
                    title: '转固率',
                    now: 2.26
                }
            }
        ],
        invest: 0,
        progress: 0,
        rotate: 0,
        correlation1:[
            {
                "name":"投资",
                "plan":21221,
                "actual":21221,
                "rate": 70,
            },
            {
                "name":"进度",
                "plan":6,
                "actual":6,
                "rate": 70
            },
            {
                "name":"固化",
                "plan":47,
                "actual":47,
                "rate": 70
            }
        ],
        correlation2:[
            {
                "name":"开工图批复",
                "plan":6,
                "actual":8,
                "rate":0.7
            },
            {
                "name":"开工",
                "plan":4,
                "actual":3,
                "rate":0.7
            },
            {
                "name":"完工",
                "plan":8,
                "actual":7,
                "rate":0.7
            },
            {
                "name":"结算",
                "plan":3,
                "actual":1,
                "rate":0.7
            }
        ],
        correlation3:[
            {
                "name":"开工图批复",
                "plan":6,
                "actual":8,
                "rate":0.7
            },
            {
                "name":"开工",
                "plan":4,
                "actual":3,
                "rate":0.7
            },
            {
                "name":"完工",
                "plan":8,
                "actual":7,
                "rate":0.7
            },
            {
                "name":"结算",
                "plan":3,
                "actual":1,
                "rate":0.7
            }
        ],
        chaingroup: [
            {
                name: "投资",
                chain: 100,
            },
            {
                name: "进度",
                chain: 100,
            },
            {
                name: "完工",
                chain: 100,
            }
        ]
       
    },
    mounted: function() {
        // this.getRegion()
        this.getleftThreeRate()
        this.getChain()
        this.getleftFourRate()
        this.initgetFile()
    },
    methods: {
        // getRegion (){
        //     var url = window.location.href;
        //     if(url.indexOf('#')>0){
        //         this.region = decodeURI((url.split('#'))[1]) + '区';
        //     }
        // },
        getleftThreeRate () {
            var that =  this
            $.ajax({
                url:baseUrl+'/newData/leftThreeRate',
                type:'get',
                data:{ district  : that.region },
                success:function(data, status, xhr){
                    data = $.parseJSON(data);
                    if (data.result === 'success') {
                        that.formdata(data.message)
                        that.correlation1 = data.message
                        that.getGaugeRate()
                    }
                },
                error:function(data){
                   console.log(data)
                }
            })
        },
        // getleftFourRate () {
        //     var that =  this
        //     $.ajax({
        //         url:baseUrl+'/newData/fourRate',
        //         type:'get',
        //         data:{ district  : that.region },
        //         success:function(data,status,xhr){
        //             data = $.parseJSON(data);
        //             if (data.result === 'success') {
        //                 that.formdata(data.message)
        //                 that.correlation2 = []
        //                 that.correlation3 = []
        //                 for(var i=0; i<8; i++) {
        //                     data.message[i].rate = Math.round(( data.message[i].actual / data.message[i].plan ) * 100)
        //                     if(data.message[i].name.split(/[()]/)[1] === '累计完成率'|| data.message[i].name.split(/[()]/)[1] === '及时率'){
        //                         console.log()
        //                         that.correlation2.push(data.message[i])
        //                     } else{
        //                         that.correlation3.push(data.message[i])
        //                     }
        //                 }
        //                  console.log(that.correlation2)
        //                 if(!that.region){
        //                     that.drawRadar()
        //                 }
        //                 that.showfourRateSwitch()
        //             }
        //         },
        //         error:function(data){
        //            console.log(data);
        //         }
        //     })
        // },
        getChain() {
            let that = this
            $.ajax({
                url:baseUrl+'/newData/threeRateGraph',
                type:'get',
                data:{ district  : that.region },
                success:function(data,status,xhr){
                    data = $.parseJSON(data);
                    if (data.result === 'success') {
                        var preObj = data.message[1][Object.keys(data.message[1])[0]] ? data.message[1][Object.keys(data.message[1])[0]] : data.message[0][Object.keys(data.message[0])[0]]
                        var newObj = data.message[0][Object.keys(data.message[0])[0]]
                        for(var i = 0; i<3; i++){
                            that.chaingroup[i].chain = Math.round(preObj[i].rate / newObj[i].rate * 100)
                        }
                    }
                },
                error:function(data){
                   console.log(data);
                }
            })
        },
        // showfourRateSwitch(){
        //     var that = this
        //     setInterval(function(){
        //         var temp = that.correlation2
        //         that.correlation2 = that.correlation3
        //         that.correlation3 = temp
        //     }, 5000)
        // },
        getGaugeRate() {
            for(var i=0; i<3; i++){
                this.correlation1[i].rate =  Math.round((this.correlation1[i].actual / this.correlation1[i].plan) * 100)
                if(i == 0) {
                    if (!(window.location.href.indexOf('#') > 0))
                        this.correlation1[i].rate = Math.round((this.correlation1[i].actual / 430000) * 100)
                    else
                        this.correlation1[i].rate = Math.round((this.correlation1[i].actual / this.correlation1[i].plan) * 100)

                }

            }
            this.gaugeNum[0].invest.now =  this.correlation1[0].rate 
            this.gaugeNum[0].progress.now =  this.correlation1[1].rate 
            this.gaugeNum[0].rotation.now =  this.correlation1[2].rate 
            this.createGauge(1, "invest")            
            this.createGauge(2, "progress")            
            this.createGauge(3, "rotation")
            
        },
        // initgetFile() {
        //     var url, that = this;
        //     $("#canvas1").click(function(){
        //         that.getFileUrl(1)
        //     })
        //     $("#canvas2").click(function(){
        //         that.getFileUrl(2)
        //     })
        //     $(".tip-box1").click(function(){
        //         that.getFileUrl(3)
        //     })
        //     $(".tip-box2").click(function(){
        //         that.getFileUrl(4)
        //     })
        //     $(".tip-box3").click(function(){
        //         that.getFileUrl(5)
        //     })
        //     $(".tip-box4").click(function(){
        //         that.getFileUrl(6)
        //     })
        //     $(".line0").click(function(){
        //         that.getFileUrl(3)
        //     })
        //     $(".line1").click(function(){
        //         that.getFileUrl(4)
        //     })
        //     $(".line2").click(function(){
        //         that.getFileUrl(5)
        //     })
        //     $(".line3").click(function(){
        //         that.getFileUrl(6)
        //     })
        // },
        // getFileUrl(id){
        //     var that = this  // !!!
        //     var ave = [];
        //     if(id == 1)         //多传一个参数，如果id是2就传自己的比率加下面4个比率，否则就只传自己的比率
        //         ave.push(that.correlation1[0].rate/100);
        //     else if(id == 2){
        //         ave.push(that.correlation1[1].rate/100);
        //         for(var i = 0; i < that.correlation2.length; i++)
        //             ave.push(that.correlation2[i].rate/100);
        //     }
        //     else
        //         ave.push(that.correlation2[id-3].rate/100);

        //     $.ajax({
        //         url:baseUrl+'/newData/exportLeftExcel',
        //         type:'get',
        //         traditional: true,
        //         data:{ 
        //                 district: that.region,
        //                 type: id,
        //                 rates: ave,

        //             },
        //         success:function(data,status,xhr){
        //             data = $.parseJSON(data);
        //             if (data.result === 'success') {
        //                 console.log(data.message)
        //                 that.getFile(data.message)
        //                 gb.modal.tip_small.show("正在导出", 'success',true);
        //             }
        //         },
        //         error:function(data){
        //            console.log(data);
        //         }
        //     })
        // },
        // getFile(url) {
        //     var eleForm = $("<form method='get'></form>");
        //     eleForm.attr("action", url);
        //     $(document.body).append(eleForm);
        //     eleForm.submit();
        // },
        drawRadar () {/*************************************** */
            let radar = {
                el: '#radar',
                ec: echarts.init($('#radar')[0]),
            }
            radar.ec.setOption(this.radar_option(),true)
            myLib.resizeE(radar.ec.resize)
        },
        radar_option () {
            var value1 = []
            var value2 = []
            for(var i = 0;i < this.correlation2.length; i++){
                value1.push(this.correlation2[i].rate)
            }
            for(var i = 0;i < this.correlation3.length; i++){
                value2.push(this.correlation3[i].rate)
            }
            return {
                legend: {
                    data: ['及时完成率(%)', '总体完成率(%)'],
                    textStyle: {
                        color: '#fff',
                        fontSize: 12
                    }
                },
                tooltip: {
                    show: true,
                },
                radar: [
                    {
                        indicator: [
                            {text: this.correlation2[1].name.split(/[()]/)[0], max: 100},
                            {text: this.correlation2[0].name.split(/[()]/)[0], max: 100},
                            {text: this.correlation2[2].name.split(/[()]/)[0], max: 100},
                            {text: this.correlation2[3].name.split(/[()]/)[0], max: 100}
                        ],
                        center: ['50%','56%'],
                        radius: '50%',
                        name: {
                            formatter: '{value}',
                            textStyle: {
                                color: '#fff',
                                fontSize: 14
                            }
                        },
                    }
                ],
                series: [
                    {
                        type: 'radar',
                         tooltip: {
                            trigger: 'item'
                        },
                        // itemStyle: {
                        //     normal: {
                        //         // color: {
                        //         //     type: 'linear',
                        //         //     colorStops: [{
                        //         //         offset: 0,
                        //         //         color: 'rgba(4, 234,255, 1)'
                        //         //     }, {
                        //         //         offset: 0.5,
                        //         //         color: 'rgba(74, 87,254, 1)'
                        //         //     },
                        //         //     {
                        //         //         offset: 1,
                        //         //         color: 'rgba(59, 119,254, 1)'
                        //         //     }
                        //         // ],
                        //         //     globalCoord: false
                        //         // }
                        //         areaStyle: 
                        //             {type: 'default'}
                        //     }
                        // },
                        // itemStyle: { 
                        //     normal: {type: 'default'}
                        // },
                        areaStyle: {
                            normal: {type: 'default'}
                        },
                        color: ['rgba(59, 119,254, 1)','#e26363'],
                        data: [
                            {
                                value: value1,
                                name: '及时完成率(%)' 
                            },
                            {
                                value: value2,
                                name: '总体完成率(%)' 
                            }
                        ]
                    }
                ]
            }
        },
        formdata (arr){
            arr.forEach(function(item) {
                item.rate = item.rate * 100
            })
        },
        drawText (context, n, innerColor){
            //百分比文字
            context.save();
            context.translate(-1.2 * gaugeR, 10);
            context.rotate(-Math.PI / 2);
            context.fillStyle = innerColor;
            context.font = "12px Arial";
            context.fillText(n.toFixed(0) + "%", 0, 0);
            context.fill(); // 执行绘制
            context.restore();
        },
        drawTitle (ctx, t) {
            ctx.rotate(Math.PI);
            ctx.fillStyle = 'rgb(45, 254, 253)';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center'
            ctx.fillText(t, 0, 5);
        },
        drawDashRound(ctx, x, y, radius, step){
            //虚线外弧
            step = 2 / 180 * Math.PI * 2;
            for (var b = 0, e = step / 2; e <= 6.3; b += step, e += step) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255,255,255,.3)";
            ctx.lineWidth = 3;
            ctx.arc(x, y, radius, b, e);
            ctx.stroke();
            ctx.closePath();
            }
        },
        drawInner(ctx, num, innerColor){
            //内圈
            ctx.beginPath();
            ctx.arc(0, 0, gaugeR - 20, 0, Math.PI, 0);
            ctx.fillStyle = innerColor;
            ctx.lineWidth = 5;
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.rotate(num + 0 * Math.PI / 180);
            ctx.arc(0, 0, gaugeR - 19, 0, Math.PI, 0);
            ctx.fillStyle = "rgb(6,72,100)";
            ctx.lineWidth = 5;
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc(0, 0, gaugeR - 25, 0, 2 * Math.PI, 0);
            ctx.fillStyle = "rgb(18,23,43)";
            ctx.lineWidth = 10;
            ctx.fill();
            ctx.closePath();

            //小三角
            ctx.beginPath();
            var height = 6 * Math.sin(Math.PI / 3); //计算等边三角形的高
            ctx.moveTo(gaugeR - 12, 0);
            ctx.lineTo(gaugeR - 12 - height, 3);
            ctx.lineTo(gaugeR - 12 - height, -3);
            ctx.fillStyle = innerColor;
            ctx.fill();

            //下半底
            ctx.beginPath();
            ctx.rotate(-num);
            ctx.arc(0, 0, gaugeR - 20, 0, Math.PI, 1);
            ctx.fillStyle = "rgb(18,23,43)";
            ctx.lineWidth = 5;
            ctx.fill();
            ctx.closePath();
        },
        drawKedu(cxt) {
            //刻度
            var x, y;
            var x1, y1;

            for (var i = 5; i < 14; i++) {
            x = gaugeR * Math.sin(2 * Math.PI / 360 * 20 * i) - 125  - 75.3; // 125 增量(初始位置)
            y = gaugeR * (1 - Math.cos(2 * Math.PI / 360 * 20 * i)) - .88 * 120 + 7; // 120
            cxt.beginPath();
            cxt.lineWidth = 5;
            cxt.moveTo(200 + x, 41 + y);
            cxt.lineTo(
                200 + x - 20 * Math.sin(2 * Math.PI / 360 * i * 20),
                42 + y + 20 * Math.cos(2 * Math.PI / 360 * i * 20)
            ); //数学 数学(长度在第一个乘数|密度在最后一个数字)
            cxt.closePath();
            cxt.strokeStyle = "rgb(18,23,43)";
            cxt.stroke();
            }
        },
        drawColor(ctx){
            
            //红
            ctx.beginPath();
            ctx.fillStyle = "rgb(244,29,32)";
            ctx.sector(gaugeX, gaugeY, gaugeR, 180 * deg, -130 * deg).fill();
            ctx.closePath();

            //黄
            ctx.beginPath();
            ctx.fillStyle = "rgb(247,243,132)";
            ctx.sector(gaugeX, gaugeY, gaugeR, -130 * deg, -50 * deg).fill();
            ctx.closePath();

            //绿

            ctx.beginPath();
            ctx.fillStyle = "rgb(150,250,105)";
            ctx.sector(gaugeX, gaugeY, gaugeR, -50 * deg, 0 * deg).fill();
            ctx.closePath();

            //底
            ctx.beginPath();
            ctx.arc(gaugeX, gaugeY, gaugeR - 10, 0, Math.PI, 1);
            ctx.fillStyle = "rgb(18,23,43)";
            ctx.lineWidth = 5;
            ctx.fill();
            ctx.closePath();
        },
        draw(ctx, num, innerColor, trueNum) {
            //外圈
            
            //旋转主体
            ctx.beginPath();
            ctx.arc(0, 0, gaugeR + 1, 0, Math.PI, 1);
            ctx.fillStyle = "rgb(6,72,100)";
            ctx.lineWidth = 5;
            ctx.fill();
            ctx.closePath();
            //上半底
            ctx.beginPath();
            ctx.arc(0, 0, gaugeR - 10, 0, Math.PI - 0.1, 1);
            ctx.fillStyle = "rgb(18,23,43)";
            ctx.lineWidth = 5;
            ctx.fill();
            ctx.closePath();
            
            //外部虚线
            this.drawDashRound(ctx, 0, 0, gaugeR + 5);
            
            //百分比文字
            this.drawText(ctx, trueNum, innerColor);
            
            //下半底
            ctx.beginPath();
            ctx.rotate(Math.PI - num);
            ctx.arc(0, 0, gaugeR + 10, 0, Math.PI, 1);
            ctx.fillStyle = "rgb(18,23,43)";
            ctx.lineWidth = 5;
            ctx.fill();
            ctx.closePath();
            //////////////////
            
            //刻度
            this.drawKedu(ctx);
            
        },
        theRotate(ctx, num, innerColor, trueNum, title) {
            ctx.clearRect(0, 0, 800, 800);
            ctx.save();
            this.drawColor(ctx); //颜色轮
            ctx.translate(gaugeX, gaugeY);
            ctx.rotate(num);
            this.draw(ctx, num, innerColor, trueNum); //主体
            this.drawInner(ctx, num, innerColor); //内圈
            this.drawTitle(ctx, title)
            ctx.restore();
            
        },
        createGauge(idx, CATEGORY) {
            //仪表总函数
            //百分比的num获取的是数组最后一个元素
            var num = this.findCG(CATEGORY).now
            var title = this.findCG(CATEGORY).title
            
            var innerColor =
            num > 27
                ? num >= 72 ? "rgb(150,250,105)" : "rgb(247,243,132)"
                : "rgb(244,29,32)";
            //扇形核心
            CanvasRenderingContext2D.prototype.sector = function(
            x,
            y,
            radius,
            sDeg,
            eDeg
            ) {
            this.save();
            this.translate(x, y);
            this.beginPath();
            this.arc(0, 0, radius, sDeg, eDeg);
            this.save();
            this.rotate(eDeg);
            this.moveTo(radius, 0);
            this.lineTo(0, 0);
            this.restore();
            this.rotate(sDeg);
            this.lineTo(radius, 0);
            this.closePath();
            this.restore();
            return this;
            };
            var canvas = document.getElementById("canvas" + idx);
            var ctx = canvas.getContext("2d");
            this.drawColor(ctx);
            
            //动画
            var theNum = 0;
            var thatNum = num;
            if (theNum < thatNum) {
            var id = setInterval(() => {
                if (theNum >= thatNum) clearInterval(id);
                else {
                    theNum++;
                    this.theRotate(
                        ctx,
                        theNum / 100 * 180 * deg,
                        innerColor,
                        num,
                        title
                    );
                }
            }, 1000 / 60);
            }
            //灰
            ctx.beginPath();
            ctx.arc(gaugeX, gaugeY, gaugeR, 0, Math.PI, 1);
            ctx.fillStyle = "rgb(6,72,100)";
            ctx.lineWidth = 5;
            ctx.fill();
            ctx.closePath();
            var deg = Math.PI / 180;
            this.theRotate(ctx, num / 100 * 180 * deg, innerColor, num, title);
        },
        findCG(CATEGORY) {
            var group = this.gaugeNum[0];
            var currentGauge;
            switch (CATEGORY) { //对号入座
            case "invest":
                currentGauge = group.invest;
                break;
            case "progress":
                currentGauge = group.progress;
                break;
            case "rotation":
                currentGauge = group.rotation;
                break;
            }
            return currentGauge;
        }
    }  


})



// function drawText(context, n, innerColor) {
// //百分比文字
// context.save();
// context.translate(-1.2 * gaugeR, 10);
// context.rotate(-Math.PI / 2);
// context.fillStyle = innerColor;
// context.font = "12px Arial";
// context.fillText(n.toFixed(0) + "%", 0, 0);
// context.fill(); //执行绘制
// context.restore();
// }
// function drawTitle(ctx, t){
// ctx.rotate(Math.PI);
// ctx.fillStyle = 'rgb(45, 254, 253)';
// ctx.font = '12px Arial';
// ctx.textAlign = 'center'
// ctx.fillText(t, 0, 5);

// }
// function drawDashRound(ctx, x, y, radius, step) {
// //虚线外弧
// step = 2 / 180 * Math.PI * 2;
// for (var b = 0, e = step / 2; e <= 6.3; b += step, e += step) {
//   ctx.beginPath();
//   ctx.strokeStyle = "rgba(255,255,255,.3)";
//   ctx.lineWidth = 3;
//   ctx.arc(x, y, radius, b, e);
//   ctx.stroke();
//   ctx.closePath();
// }
// }
// function drawInner(ctx, num, innerColor) {
// //内圈
// ctx.beginPath();
// ctx.arc(0, 0, gaugeR - 20, 0, Math.PI, 0);
// ctx.fillStyle = innerColor;
// ctx.lineWidth = 5;
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rotate(num + 0 * Math.PI / 180);
// ctx.arc(0, 0, gaugeR - 19, 0, Math.PI, 0);
// ctx.fillStyle = "rgb(6,72,100)";
// ctx.lineWidth = 5;
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(0, 0, gaugeR - 25, 0, 2 * Math.PI, 0);
// ctx.fillStyle = "rgb(18,23,43)";
// ctx.lineWidth = 10;
// ctx.fill();
// ctx.closePath();

// //小三角
// ctx.beginPath();
// var height = 6 * Math.sin(Math.PI / 3); //计算等边三角形的高
// ctx.moveTo(gaugeR - 12, 0);
// ctx.lineTo(gaugeR - 12 - height, 3);
// ctx.lineTo(gaugeR - 12 - height, -3);
// ctx.fillStyle = innerColor;
// ctx.fill();

// //下半底
// ctx.beginPath();
// ctx.rotate(-num);
// ctx.arc(0, 0, gaugeR - 20, 0, Math.PI, 1);
// ctx.fillStyle = "rgb(18,23,43)";
// ctx.lineWidth = 5;
// ctx.fill();
// ctx.closePath();
// }
// function drawKedu(cxt) {
// //刻度
// var x, y;
// var x1, y1;

// for (var i = 5; i < 14; i++) {
//   x = gaugeR * Math.sin(2 * Math.PI / 360 * 20 * i) - 125  - 75.3; // 125 增量(初始位置)
//   y = gaugeR * (1 - Math.cos(2 * Math.PI / 360 * 20 * i)) - .88 * 120 + 7; // 120
//   cxt.beginPath();
//   cxt.lineWidth = 5;
//   cxt.moveTo(200 + x, 41 + y);
//   cxt.lineTo(
//       200 + x - 20 * Math.sin(2 * Math.PI / 360 * i * 20),
//       42 + y + 20 * Math.cos(2 * Math.PI / 360 * i * 20)
//   ); //数学 数学(长度在第一个乘数|密度在最后一个数字)
//   cxt.closePath();
//   cxt.strokeStyle = "rgb(18,23,43)";
//   cxt.stroke();
// }
// }
// function drawColor(ctx) {
// //颜色轮

// //红
// ctx.beginPath();
// ctx.fillStyle = "rgb(244,29,32)";
// ctx.sector(gaugeX, gaugeY, gaugeR, 180 * deg, -130 * deg).fill();
// ctx.closePath();

// //黄
// ctx.beginPath();
// ctx.fillStyle = "rgb(247,243,132)";
// ctx.sector(gaugeX, gaugeY, gaugeR, -130 * deg, -50 * deg).fill();
// ctx.closePath();

// //绿

// ctx.beginPath();
// ctx.fillStyle = "rgb(150,250,105)";
// ctx.sector(gaugeX, gaugeY, gaugeR, -50 * deg, 0 * deg).fill();
// ctx.closePath();

// //底
// ctx.beginPath();
// ctx.arc(gaugeX, gaugeY, gaugeR - 10, 0, Math.PI, 1);
// ctx.fillStyle = "rgb(18,23,43)";
// ctx.lineWidth = 5;
// ctx.fill();
// ctx.closePath();
// }
// function draw(ctx, num, innerColor, trueNum) {
// //外圈

// //旋转主体
// ctx.beginPath();
// ctx.arc(0, 0, gaugeR + 1, 0, Math.PI, 1);
// ctx.fillStyle = "rgb(6,72,100)";
// ctx.lineWidth = 5;
// ctx.fill();
// ctx.closePath();
// //上半底
// ctx.beginPath();
// ctx.arc(0, 0, gaugeR - 10, 0, Math.PI - 0.1, 1);
// ctx.fillStyle = "rgb(18,23,43)";
// ctx.lineWidth = 5;
// ctx.fill();
// ctx.closePath();

// //外部虚线
// drawDashRound(ctx, 0, 0, gaugeR + 5);

// //百分比文字
// drawText(ctx, trueNum, innerColor);

// //下半底
// ctx.beginPath();
// ctx.rotate(Math.PI - num);
// ctx.arc(0, 0, gaugeR + 10, 0, Math.PI, 1);
// ctx.fillStyle = "rgb(18,23,43)";
// ctx.lineWidth = 5;
// ctx.fill();
// ctx.closePath();
// //////////////////

// //刻度
// drawKedu(ctx);

// }
// function theRotate(ctx, num, innerColor, trueNum, title) {
// ctx.clearRect(0, 0, 800, 800);
// ctx.save();
// drawColor(ctx); //颜色轮
// ctx.translate(gaugeX, gaugeY);
// ctx.rotate(num);
// draw(ctx, num, innerColor, trueNum); //主体
// drawInner(ctx, num, innerColor); //内圈
// drawTitle(ctx, title)
// ctx.restore();

// }
// function createGauge(idx, CATEGORY) {
// //仪表总函数
// //百分比的num获取的是数组最后一个元素
// var num = findCG(CATEGORY).now;
// var title = findCG(CATEGORY).title

// var innerColor =
//   num > 27
//       ? num >= 72 ? "rgb(150,250,105)" : "rgb(247,243,132)"
//       : "rgb(244,29,32)";
// //扇形核心
// CanvasRenderingContext2D.prototype.sector = function(
//   x,
//   y,
//   radius,
//   sDeg,
//   eDeg
// ) {
//   this.save();
//   this.translate(x, y);
//   this.beginPath();
//   this.arc(0, 0, radius, sDeg, eDeg);
//   this.save();
//   this.rotate(eDeg);
//   this.moveTo(radius, 0);
//   this.lineTo(0, 0);
//   this.restore();
//   this.rotate(sDeg);
//   this.lineTo(radius, 0);
//   this.closePath();
//   this.restore();
//   return this;
// };
// var canvas = document.getElementById("canvas" + idx);
// var ctx = canvas.getContext("2d");
// drawColor(ctx);

// //动画
// var theNum = 0;
// var thatNum = num;
// if (theNum < thatNum) {
//   var id = setInterval(() => {
//       if (theNum >= thatNum) clearInterval(id);
//       else {
//           theNum++;
//           theRotate(
//               ctx,
//               theNum / 100 * 180 * deg,
//               innerColor,
//               num,
//               title
//           );
//       }
//   }, 1000 / 60);
// }
// //灰
// ctx.beginPath();
// ctx.arc(gaugeX, gaugeY, gaugeR, 0, Math.PI, 1);
// ctx.fillStyle = "rgb(6,72,100)";
// ctx.lineWidth = 5;
// ctx.fill();
// ctx.closePath();
// var deg = Math.PI / 180;
// theRotate(ctx, num / 100 * 180 * deg, innerColor, num, title);
// }

// function findCG(CATEGORY) {
// var group = this.gaugeNum[0];
// var currentGauge;
// switch (CATEGORY) { //对号入座
//   case "invest":
//       currentGauge = group.invest;
//       break;
//   case "progress":
//       currentGauge = group.progress;
//       break;
//   case "rotation":
//       currentGauge = group.rotation;
//       break;
// }
// return currentGauge;
// }


})