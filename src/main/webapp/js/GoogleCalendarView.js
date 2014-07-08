;
(function () {

    /**
     * Component: CreateTable
     */
    (function ($) {

        brite.registerView("GoogleCalendarView", {
            parent:".GoogleScreen-content",
            emptyParent:true
        }, {
        create: function (data) {
        	var view = this;
        	view.data = data;
        	return app.render("tmpl-GoogleCalendarView");
        },

            postDisplay:function (data, config) {
                var view = this;
                showEvents.call(view);
            },

            events:{
				"click;.listCalendar":function(){
					brite.display("GoogleCalendarEvents");
				},
				"click;.action":function(e){
					var view = this;
					var $action = $(e.currentTarget);
					var next = $action.hasClass("actionNext");
					var month;
					if(next){
						month = view.currentMonth + 1;
						if(month == 12){
							view.currentYear = view.currentYear +1;
						}
					}else{
						month = view.currentMonth - 1;
						if(month == -1){
							view.currentYear = view.currentYear -1;
						}
					}
	
					showEvents.call(view,month);
				},
            }
        });
        
        function showEvents(month){
			var view = this;
			var $e = view.$el;
			showCalendar.call(view,month);
			
			var startDate = new Date();
			if ( typeof month != "undefined") {
				startDate.setMonth(month);

			}
			if ( typeof view.currentYear != "undefined") {
				startDate.setYear(view.currentYear);
			}
			startDate.setDate(1);
			startDate.setHours(0);
			startDate.setMinutes(0);
			startDate.setSeconds(0);
			
			var endDate = new Date(startDate * 1);
			endDate.setMonth(endDate.getMonth() + 1);
			var opts = {
				startDate:startDate.format("yyyy-MM-dd hh:mm:ss"),
				endDate:endDate.format("yyyy-MM-dd hh:mm:ss"),
				pageSize:100
			};
			console.log(opts);
			app.googleApi.listCalendarEvents(opts).done(function(data){
				
				for(var i = 0; i < data.result.length; i++){
					var event = data.result[i];
					var d = new Date(event.date.dateTime.value).format("yyyy-MM-dd");
					$e.find("td[data-date='"+d+"'] .events").append("<div>"+event.summary+"</div>");
				}
				
			});
			
		}
        
        function showCalendar(month){
        	var view = this;
        	var $e = view.$el;
        	var $calendarCon = $e.find(".GoogleCalendarView-content");
        	$calendarCon.empty();
        	var calendar =getCalendars.call(view,month);
        	$calendarCon.append(render("GoogleCalendarView-calendar",calendar));
        	var $tbody=$e.find(".GoogleCalendarView-calendar-table tbody");
        	for(var i = 0; i < calendar.weeks.length; i++){
        		var week = calendar.weeks[i];
        		var $tr = $(render("GoogleCalendarView-calendar-tr")); 
        		$tbody.append($tr);
        		for(var j=0; j< week.length;j++){
        			var $td = $(render("GoogleCalendarView-calendar-td",week[j]||{}));
					$tr.append($td);
        		}
        	}
        }
        function getCalendars(month){
        	var view = this;
			var calendar = {};
			var firstDateOfMonth = new Date();
			if ( typeof month != "undefined") {
				firstDateOfMonth.setMonth(month);

			}
			if ( typeof view.currentYear != "undefined") {
				firstDateOfMonth.setYear(view.currentYear);
			}
			firstDateOfMonth.setDate(1);
			firstDateOfMonth.setHours(0);
			firstDateOfMonth.setMinutes(0);
			firstDateOfMonth.setSeconds(0);
			view.currentMonth = firstDateOfMonth.getMonth();
			view.currentYear = firstDateOfMonth.getFullYear();

			var endDateOfMonth = new Date(firstDateOfMonth * 1);
			endDateOfMonth.setMonth(firstDateOfMonth.getMonth() + 1);
			endDateOfMonth.setDate(0);

			var weeks = [];
			var week = new Array(7);
			for (var i = 0; i < endDateOfMonth.getDate(); i++) {
				var date = new Date(firstDateOfMonth * 1 + i * 24 * 60 * 60 * 1000);
				var dateStr = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate();
				var dateFormatStr = date.format("yyyy-MM-dd");
				week[date.getDay()] = {
					dateLabel : dateStr,
					dateObj : date,
					dateStr : dateFormatStr
				};
				if (date.getDay() % 7 == 6) {
					weeks.push(week);
					if (endDateOfMonth.getDate() - i > 1) {
						week = new Array(7);
					}
				}
			}
			if (endDateOfMonth.getDay() % 7 != 6) {
				weeks.push(week);
			}

			calendar.year = firstDateOfMonth.getFullYear();
			calendar.month = firstDateOfMonth.getMonth();
			calendar.header = firstDateOfMonth.format("yyyy-MM");
			calendar.weeks = weeks;
			return calendar;
        }
        
        
    })(jQuery);
})();
