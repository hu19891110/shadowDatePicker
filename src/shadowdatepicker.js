~function(window){

	'use strict';

	// 获取datePicker下拉部分HTML
	function getDatePickerHTML(){

		return '<div class="calendar_table"><table>'+
					'<caption>'+
						'<a href="#" class="premonth">上一月</a><span class="year">2012</span>-<span class="month">06</span><a href="#" class="nextmonth">下一月</a>'+
					'</caption>'+
					'<colgroup>'+
						'<col>'+
						'<col>'+
						'<col>'+
						'<col>'+
						'<col>'+
						'<col>'+
						'<col>'+
					'</colgroup>'+
					'<thead>'+
						'<tr>'+
							'<th scope="col">一</th>'+
							'<th scope="col">二</th>'+
							'<th scope="col">三</th>'+
							'<th scope="col">四</th>'+
							'<th scope="col">五</th>'+
							'<th scope="col">六</th>'+
							'<th scope="col">日</th>'+
						'</tr>'+
					'</thead>'+
					'<tbody>'+
					'</tbody></table></div>';

	}

	// 获取datepicker样式
	function getScopedStyle(){

		var style = document.createElement('style');
		// style.setAttribute('scoped','scoped');

		style.innerHTML = 'div.calendar_table {' +
								'border: 1px solid #C5C5C5;' +
								'width: 220px;' +
								'/*height: 280px;*/' +
								'border-radius: 4px;' +
								'text-align: center;' +
								'margin-top:3px;' +
								'box-shadow: 0px 0px 3px #BBB;' +
								'position: absolute;' +
								'z-index: 100;' +
								'background: white;' +
							'}' +
							'div.calendar_table table {' +
								'width: 204px;' +
								'margin: 8px auto;' +
								'border-collapse: collapse;' +
								'border-radius: 4px;' +
								'position: relative;' +
								'line-height: 28px;' +
							'}' +
							'div.calendar_table table caption {' +
								'background: #000;' +
								'border: 1px solid #C54B53;' +
								'height: 30px;' +
								'line-height: 28px;' +
								'background-image: -moz-linear-gradient(top, #D05F63, #C54D51);	/*Firefox*/' +
								'background-image: -ms-linear-gradient(top, #D05F63, #C54D51);	/*IE 10*/' +
								'background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #D05F63), color-stop(1, #C54D51)); /* Saf4+, Chrome */' +
								'filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#D05F63", endColorstr="#C54D51", GradientType="0"); /* IE*/' +
								'font-size: 14px;' +
								'color: #FFF;' +
								'border-radius: 4px 4px 0 0;' +
							'}' +
							'div.calendar_table table caption span {' +
								'margin: 0 6px;' +
								'cursor: pointer;' +
							'}' +
							'div.calendar_table table caption a.premonth, div.calendar_table table caption a.nextmonth {' +
								'background: url(../src/images/datepicker.png) no-repeat;' +
								'background-image: -webkit-image-set(url(../src/images/datepicker.png) 1x,url(../src/images/datepicker@2x.png) 2x);' +
								'position: absolute;' +
								'font-size: 0;' +
								'width: 16px;' +
								'height: 18px;' +
								'top: 6px;' +
							'}' +
							'div.calendar_table table caption a.premonth {' +
								'left: 6px;' +
								'background-position: center -47px;' +
							'}' +
							'div.calendar_table table caption a.nextmonth {' +
								'right: 6px;' +
								'background-position: center -87px;' +
							'}' +
							'div.calendar_table thead tr {' +
								'border: 1px solid #E0E0E0;' +
							'}' +
							'div.calendar_table table th {' +
								'background: #F0F0F0;' +
								'width: 28px;' +
								'height: 26px;' +
							'}' +
							'div.calendar_table table td {' +
								'border: 1px solid #E0E0E0;' +
								'width: 28px;' +
								'height: 28px;' +
								'color: #333;' +
								'cursor: pointer;' +
								'box-shadow: 0px 1px 0px #FFF inset;' +
								'background:#F7F7F7;' +
							'}' +
							'div.calendar_table table td.premonth, div.calendar_table table td.nextmonth {' +
								'background: #EEE;' +
								'color: #A3A3A3;' +
								'box-shadow: 0px 1px 0px #EEE inset;' +
							'}' +
							'div.calendar_table table td.sunday {' +
								'color: #C94E57;' +
							'}' +
							'div.calendar_table table td.saturday {' +
								'color: #B05224;' +
							'}' +
							'div.calendar_table table td.current {' +
								'background: #737373;' +
								'color: #FFF;' +
								'box-shadow: 0px 0px 5px #333 inset;' +
							'}';

		return style;

	}

	// 绑定事件
	function bindEvent(shadowRoot,shadowRootDiv,input){



		shadowRoot.querySelector('.premonth').addEventListener('click',function(e){

			var currYear = shadowRoot.querySelector('.year').innerText - 0;
			var currMonth = shadowRoot.querySelector('.month').innerText - 0;

			showMonth(shadowRoot,currYear,currMonth-1);

			e.stopPropagation();

		},false);

		shadowRoot.querySelector('.nextmonth').addEventListener('click',function(e){

			var currYear = shadowRoot.querySelector('.year').innerText - 0;
			var currMonth = shadowRoot.querySelector('.month').innerText - 0;

			showMonth(shadowRoot,currYear,currMonth+1);

			e.stopPropagation();

		},false);

		shadowRoot.querySelector('tbody').addEventListener('click',function(e){

			var currYear = shadowRoot.querySelector('.year').innerText - 0;
			var currMonth = shadowRoot.querySelector('.month').innerText - 0;
			if(e.target.tagName.toLowerCase() === 'td'){

				var targetDate = new Date(currYear,currMonth-1,e.target.getAttribute('data-value')-0);
				input.value = targetDate.getFullYear() + '-' + 
								(targetDate.getMonth() < 9 ? '0':'') + (targetDate.getMonth()+1) + '-' +
								(targetDate.getDate() <= 9 ? '0':'') + targetDate.getDate();

				shadowRootDiv.style.display = 'none';

			}

			e.stopPropagation();

		},false);

		input.addEventListener('focus',function(e){

			shadowRootDiv.style.display = '';

		});

		input.addEventListener('click',function(e){

			e.stopPropagation();

		});

		document.body.addEventListener('click',function(){

			shadowRootDiv.style.display = 'none';

		});

	}

	// 显示指定月份
	function showMonth(shadowRoot,year,month){

		console.log(year,month);

		var today = new Date(),
			firstDay,lastDay,
			lastDayOfLastMonth,
			firstValInTable,
			weekOfFirstDay,
			rowCount,
			tempHtml='',
			originalDate;

		originalDate = today;

		if(typeof year === 'undefined'){
			year = today.getFullYear();
		}
		if(typeof month === 'undefined'){
			month = today.getMonth()+1;
		}

		firstDay = new Date(year,month-1,1);
		lastDay = new Date(year,month,0);
		lastDayOfLastMonth = new Date(year,month-1,0).getDate();

		year = firstDay.getFullYear();
		month = firstDay.getMonth()+1;

		//获取当月第一天是周几
		weekOfFirstDay = firstDay.getDay();

		//如果是周日，设为第7天
		if(weekOfFirstDay === 0){
			weekOfFirstDay = 7;
		}

		// lastDay-firstDay后+1才是一个月的天数
		// 但因为weekOfFirstDay要-1才对，所以这里不加不减
		rowCount = Math.ceil(((lastDay - firstDay)/1000/3600/24 + weekOfFirstDay)/7);

		firstValInTable = -weekOfFirstDay + 2;

		//填充日期
		for(var i=0;i<rowCount;i++){

			tempHtml += '<tr>';

				for(var j=0;j<7;j++){

					var day = firstValInTable + 7*i +j,
						showDay = day,
						weekendClass,monthClass,todayClass;

					if(month === originalDate.getMonth()+1 && day === originalDate.getDate()){
						todayClass = 'current';
					}else{
						todayClass = '';
					}

					if(j === 7-1){
						weekendClass = 'sunday';
					}else if(j === 6-1){
						weekendClass = 'saturday';
					}else{
						weekendClass = '';
					}

					if(day <= 0){
						//上月的日期
						showDay = day + lastDayOfLastMonth;
						monthClass = 'premonth';
					}else if(day > lastDay.getDate()){
						//下月的日期
						showDay = day - lastDay.getDate();
						monthClass = 'nextmonth';
					}else{
						//本月的日期
						monthClass = '';
					}

					tempHtml += '<td tabindex="0" class="'+todayClass+' '+weekendClass+' '+monthClass+'" data-value="'+day+'">'+showDay+'</td>';

				}

			tempHtml += '</tr>';

		}

		shadowRoot.querySelector('.year').innerText = year;
		shadowRoot.querySelector('.month').innerText = month;
		shadowRoot.querySelector('tbody').innerHTML = tempHtml;

	}

	// 主函数
	function shadowDatePicker(input){

		// 隐藏原输入框
		// input.style.display = 'none';

		// 创建shadowRoot
		var shadowRootDiv = document.createElement('div');
		console.log(shadowRootDiv);
		var shadowRoot = shadowRootDiv.webkitCreateShadowRoot();

		// shadowRoot.applyAuthorStyles = true;
		shadowRoot.innerHTML = getDatePickerHTML();
		shadowRoot.appendChild(getScopedStyle());

		shadowRootDiv.style.display = 'none';

		// 绑定事件
		bindEvent(shadowRoot,shadowRootDiv,input);

		// 初始化
		showMonth(shadowRoot);

		// shadowRoot.webkitPseudo = 'shadowdatepicker';


		// 写入DOM
		var inputParent = input.parentNode;
		var inputNext = input.nextSibling;

		if(inputNext){
			inputParent.insertBefore(shadowRootDiv,inputNext);
		}else{
			inputParent.appendChild(shadowRootDiv);
		}

	}

	window.shadowDatePicker = shadowDatePicker;

}(window);