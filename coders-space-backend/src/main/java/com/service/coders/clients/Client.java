package com.service.coders.clients;

import com.service.coders.interfaces.Followable;

import java.util.List;

public class Client implements Followable {
    String name;
    String email;
    String password;
    ClientType type;
    List<Followable> following;
}
enum ClientType {
    CLIENT,
    MODERATOR,
    ADMINISTRATOR
}
