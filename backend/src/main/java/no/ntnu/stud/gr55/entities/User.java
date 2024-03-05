package no.ntnu.stud.gr55.entities;

import jakarta.persistence.*; 

@Entity
<<<<<<< HEAD
=======
@Table(name = "users")
>>>>>>> 5cf48317bf9a430f7813561d29bcfc4a0b2f5f85
public class User {
    public User(String username, String password){
        this.username = username;
        this.password = password;
    }

<<<<<<< HEAD
=======
    public User() {}

>>>>>>> 5cf48317bf9a430f7813561d29bcfc4a0b2f5f85
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    @Column()
    private String password;

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }
}
