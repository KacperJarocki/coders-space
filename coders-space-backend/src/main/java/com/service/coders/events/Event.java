package com.service.coders.events;

import com.service.coders.interfaces.Followable;
import com.service.coders.interfaces.Reportable;

public class Event implements Reportable, Followable {
    String name;
    String content;
}
