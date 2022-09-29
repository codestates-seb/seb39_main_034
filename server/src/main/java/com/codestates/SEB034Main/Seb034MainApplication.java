package com.codestates.SEB034Main;

import com.codestates.SEB034Main.member.entity.Member;
import com.codestates.SEB034Main.member.repository.MemberRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@EnableScheduling
@SpringBootApplication
public class Seb034MainApplication {

	public static void main(String[] args) {
		SpringApplication.run(Seb034MainApplication.class, args);
	}

	@Bean
	public CommandLineRunner run(MemberRepository memberRepository, BCryptPasswordEncoder passwordEncoder) throws Exception {
		return (String[] args) -> {
			Member member1 = Member.builder()
					.username("test1")
					.password(passwordEncoder.encode("1234"))
					.email("test1@test.com")
					.build();
			memberRepository.save(member1);

			Member member2 = Member.builder()
					.username("test2")
					.password(passwordEncoder.encode("1234"))
					.email("test2@test.com")
					.build();
			memberRepository.save(member2);
		};
	}
}
