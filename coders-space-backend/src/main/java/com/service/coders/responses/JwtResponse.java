package com.service.coders.responses;

public class JwtResponse {
  private final String token;

  public JwtResponse(String jwt) {
    this.token = jwt;
  }

  public String getToken() {
    return token;
  }
}
