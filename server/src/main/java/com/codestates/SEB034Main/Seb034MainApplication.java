package com.codestates.SEB034Main;

import com.codestates.SEB034Main.goal.service.GoalService;
import com.codestates.SEB034Main.member.entity.Follower;
import com.codestates.SEB034Main.member.entity.Liker;
import com.codestates.SEB034Main.member.entity.Member;
import com.codestates.SEB034Main.member.repository.FollowerRepository;
import com.codestates.SEB034Main.member.repository.LikerRepository;
import com.codestates.SEB034Main.member.repository.MemberRepository;
import com.codestates.SEB034Main.timeline.dto.PostTimelineDto;
import com.codestates.SEB034Main.timeline.service.TimelineService;
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
	public CommandLineRunner run(MemberRepository memberRepository, BCryptPasswordEncoder passwordEncoder, GoalService goalService, FollowerRepository followerRepository, TimelineService timelineService, LikerRepository likerRepository) throws Exception {
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

			Follower follower = Follower.builder()
					.goal(goalService.findVerifiedGoal(29))
					.member(member1)
					.build();
			followerRepository.save(follower);

			Follower follower2 = Follower.builder()
					.goal(goalService.findVerifiedGoal(29))
					.member(member2)
					.build();
			followerRepository.save(follower2);

			Follower follower3 = Follower.builder()
					.goal(goalService.findVerifiedGoal(30))
					.member(member1)
					.build();
			followerRepository.save(follower3);

			Follower follower4 = Follower.builder()
					.goal(goalService.findVerifiedGoal(8))
					.member(member1)
					.build();
			followerRepository.save(follower4);

			Liker liker = Liker.builder()
					.goal(goalService.findVerifiedGoal(29))
					.member(member1)
					.build();
			likerRepository.save(liker);

			Liker liker2 = Liker.builder()
					.goal(goalService.findVerifiedGoal(30))
					.member(member1)
					.build();
			likerRepository.save(liker2);

			Liker liker3 = Liker.builder()
					.goal(goalService.findVerifiedGoal(30))
					.member(member2)
					.build();
			likerRepository.save(liker3);

			PostTimelineDto postTimelineDto = new PostTimelineDto();
			postTimelineDto.setDescription("실행하면서 만들어진 타임라인 콘텐츠 입니다. 29번 골의 타임라인으로 만들어집니다.  첫번째 29번 피드입니다.");
			timelineService.createTimeline(postTimelineDto, 29);

			PostTimelineDto postTimelineDto2 = new PostTimelineDto();
			postTimelineDto2.setDescription("실행하면서 만들어진 타임라인 콘텐츠 입니다. 29번 골의 타임라인으로 만들어집니다. 두번째 29번 피드입니다.");
			timelineService.createTimeline(postTimelineDto2, 29);

			PostTimelineDto postTimelineDto3 = new PostTimelineDto();
			postTimelineDto3.setDescription("실행하면서 만들어진 타임라인 콘텐츠 입니다. 30번 골의 타임라인으로 만들어집니다. 첫번째 30번 피드입니다.");
			timelineService.createTimeline(postTimelineDto3, 30);

			PostTimelineDto postTimelineDto4 = new PostTimelineDto();
			postTimelineDto4.setDescription("실행하면서 만들어진 타임라인 콘텐츠 입니다. 8번 골의 타임라인으로 만들어집니다. 최종 후기 타임라인입니다.");
			postTimelineDto4.setFinalTimeline(1);
			timelineService.createTimeline(postTimelineDto4, 8);
		};
	}
}

