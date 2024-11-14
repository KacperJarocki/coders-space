package com.service.coders.clients;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Clients implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;
  String name;
  String email;
  String password;
  ClientType client_type;
  boolean enabled;

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return enabled;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.singleton(new SimpleGrantedAuthority(client_type.name()));
  }

  @Override
  public String getPassword() {
    return password;
  }

  public void setClient_type(String type) {
    switch (type) {
      case "USER":
        this.client_type = ClientType.USER;
        break;
      case "MODERATOR":
        this.client_type = ClientType.MODERATOR;
        break;
      case "ADMIN":
        this.client_type = ClientType.ADMIN;
        break;
      default:
        this.client_type = ClientType.USER;
        break;
    }
  }
}

enum ClientType {
  USER,
  MODERATOR,
  ADMIN
}
