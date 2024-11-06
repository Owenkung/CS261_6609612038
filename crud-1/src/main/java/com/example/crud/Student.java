package com.example.crud;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "userName")
    private String userName;

    @Column(name = "type")
    private String type;

    @Column(name = "en_name")
    private String enName;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "faculty")
    private String faculty;

    public Student() {}

    public Student(String userName, String type, String enName, String email, String faculty) {
        this.userName = userName;
        this.type = type;
        this.enName = enName;
        this.email = email;
        this.faculty = faculty;
    }

    // เปลี่ยนเป็น Long
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEnName() {
        return enName;
    }

    public void setEnName(String enName) {
        this.enName = enName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }
}
