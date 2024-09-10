package com.service.coders.publications;

import com.service.coders.interfaces.Reportable;

public class Publication implements Reportable {
    String content;
}
enum publicationType {
    POST,
    QUESTION,
    ARTICLE,
}
