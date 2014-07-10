package com.britesnow.samplesocial.web;


import java.util.List;
import java.util.Map;

import com.britesnow.samplesocial.service.GoogleCalendarEventsService;
import com.britesnow.snow.util.Pair;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.britesnow.snow.web.rest.annotation.WebGet;
import com.britesnow.snow.web.rest.annotation.WebPost;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class GoogleCalendarEventsHandlers {
    @Inject
    private GoogleCalendarEventsService googleCalendarEventsService;


    @WebGet("/googleCalendarEvents/list")
    public Object listEvents(@WebModel Map m,@WebParam("startDate") String startDate,@WebParam("endDate") String endDate,  
                            @WebParam("pageSize") Integer pageSize, @WebParam("pageIndex") String pageIndex,
                            @WebParam("calendarId") String calendarId) throws Exception {
        Pair<String, List<Map>> pair = googleCalendarEventsService.listEvents(pageIndex, pageSize, startDate, endDate,calendarId);
        List<Map> map = pair.getSecond();
        WebResponse result = WebResponse.success(map);
        result.set("nextPageToken", pair.getFirst());
        return result;
    }
    
    @WebGet("/googleCalendarEvents/get")
    public Object getEvents(@WebModel Map m, @WebParam("id") String id,@WebParam("calendarId") String calendarId) throws Exception {
        return WebResponse.success(googleCalendarEventsService.getEvent(id,calendarId));
    }
    
    @WebPost("/googleCalendarEvents/save")
    public Object saveEvents(@WebModel Map m, @WebParam("id") String id,  @WebParam("summary") String summary, 
                            @WebParam("location") String location,@WebParam("status") String status,@WebParam("startTime") String startTime,
                            @WebParam("endTime") String endTime,@WebParam("reminders") Integer min,@WebParam("calendarId")String calendarId) throws Exception {
        
        googleCalendarEventsService.saveEvent(id, summary,location, startTime, endTime,min,calendarId);
        return WebResponse.success();
    }
    @WebPost("/googleCalendarEvents/delete")
    public Object deleteEvents(@WebModel Map m, @WebParam("id") String id,@WebParam("calendarId") String calendarId) throws Exception {
        googleCalendarEventsService.deleteEvent(id, calendarId);
        return WebResponse.success();
    }

}
