// 取出身高&體重的值
// if 空格為空值--提醒視窗
// 點擊結果按鈕:更換html內容&class(設定if帶入公式)、將結果顯示在下方表格中並同步存入localStorage
//updateList 更新介面資料
//點擊刪除鍵即可刪除資料

//指定DOM元素
var body = document.body;
var height = document.querySelector('.height');
var weight = document.querySelector('.weight');
var resultBtn = document.querySelector('.resultBtn');
var result = document.querySelector('.result');
var inputBtn = document.querySelector('.inputBtn');
var table = document.querySelector('.table');
var tr = document.querySelectorAll('.table tr');
var data = JSON.parse(localStorage.getItem('result')) || [];

//綁定監聽事件
resultBtn.addEventListener('click',showResult);
table.addEventListener('click',deleteResult);
body.addEventListener('keydown',keyShowResult);

updateList(data);

//鍵盤按enter可觸發showResult函式
function keyShowResult(e) {
    switch (e.keyCode){
        case 13:
            showResult();
            break;
        default:
            break;
    }
}
//計算結果&將資料存進localStorage
function showResult() {
                         //身高(單位公尺)的平方
    var height2 = Math.pow(height.value/100,2)
                                //取小數點第二位
    var bmi = (weight.value / height2).toFixed(2);
    var status='';
    var color='';
    var btnStyle='';
    var border='';
    //若輸入框是空白，則中斷程式碼
    if (height.value === '' || weight.value === ''){
        alert('輸入框不能空白喔!')
        return
    };

    if (bmi<18.5){
        status='過輕';
        color='#31BAF9';
        btnStyle='bluebtn';
        border='blueBorder';
    }else if(bmi>=18.5 && bmi<24){
        status='理想';
        color='#86D73E';
        btnStyle='greenbtn';
        border='greenBorder';
    }else if(bmi<27 && bmi>=24){
        status='過重';
        color='#FF982D';
        btnStyle='orangebtn';
        border='orangeBorder';
    }else if(bmi<30 && bmi>=27){
        status='輕度肥胖';
        color='#FF6C02';
        btnStyle='DarkOrangebtn';
        border='DarkOrangeBorder';
    }else if(bmi<35 && bmi>=30){
        status='中度肥胖';
        color='#FF6C02';
        btnStyle='DarkOrangebtn';
        border='DarkOrangeBorder';
    }else{
        status='重度肥胖';
        color='#FF1200';
        btnStyle='redbtn';
        border='redBorder';
    }
    if(bmi !=='NaN'){
        var bmiResult = {
        statusResult:status,
        result:bmi,
        height:height.value,
        weight:weight.value,
        color:color,
        btnStyle:btnStyle,
        border:border
        };
    };
    data.push(bmiResult);
    updateList(data);
    localStorage.setItem('result',JSON.stringify(data));

    //處理按鈕顏色變化
    var btn = '';
    btn = '<div class="result"><a href="bmi.html" class="status ' + btnStyle +'"><p class="standard-num" style="color:'+ color +'">'+ bmi +'</p><p class="BMI-title" style="color:'+ color +'">BMI</p><div class="icon" style="background-color:'+ color +'"><img src="images/icons_loop.png"></div></a><p style="color:'+ color +'">'+ status + '</p></div>';
    inputBtn.innerHTML = btn;

    //清空輸入欄內容
    height.value='';
    weight.value='';
}

//更新HTML介面
function updateList(items) {
    var len = items.length;
    var str = '';
    var today = new Date();
    var currentDateTime =today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    // console.log(currentDateTime);
    for (i=0;i<len;i++){
        str += '<tr class="'+ items[i].border +'"><td class="status">'+ items[i].statusResult +'</td><td><span>BMI </span>'+ items[i].result + '</td><td><span>weight </span>'+ items[i].weight + 'kg</td><td><span>height </span>'+ items[i].height + 'cm</td><td>'+ currentDateTime + '</td><td><a href="#" class="delete" data-index='+ i + '>刪除</a></td></tr>'
    }
    table.innerHTML = str;
}

//點擊刪除即可刪除資料
function deleteResult(e) {
    var now = e.target.dataset.index;
    if(e.target.nodeName !== 'A'){return};
    data.splice(now,1);
    updateList(data);
    localStorage.setItem('result',JSON.stringify(data));   
}


