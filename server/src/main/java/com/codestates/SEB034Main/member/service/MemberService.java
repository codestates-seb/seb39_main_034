package com.codestates.SEB034Main.member.service;

import com.codestates.SEB034Main.exception.BusinessLogicException;
import com.codestates.SEB034Main.exception.ExceptionCode;
import com.codestates.SEB034Main.member.dto.PostMemberDto;
import com.codestates.SEB034Main.member.entity.Member;
import com.codestates.SEB034Main.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public Member creteMember(PostMemberDto postMemberDto) {
        if (!postMemberDto.getPassword().equals(postMemberDto.getRePassword())) {
            new BusinessLogicException(ExceptionCode.PASSWORD_NOT_MATCH);
        } else {
            Member member = Member.builder()
                    .username(postMemberDto.getUsername())
                    .email(postMemberDto.getEmail())
                    .password(passwordEncoder.encode(postMemberDto.getPassword()))
                    .build();

            return memberRepository.save(member);
        }
        return null;
    }
}
